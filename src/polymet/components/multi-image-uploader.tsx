import React, {
  useState,
  useRef,
  useCallback,
  ChangeEvent,
  DragEvent,
} from "react";
import {
  ImageIcon,
  UploadIcon,
  XIcon,
  PlusIcon,
  AlertCircleIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UploadProgress } from "@/polymet/components/upload-progress";
import {
  UploadFile,
  FileValidationOptions,
  processFiles,
  handleDragOver,
  handleDragEnter,
  handleDragLeave,
  mockUploadFile,
  formatFileSize,
  IMAGE_FILE_TYPES,
} from "@/polymet/components/upload-utils";

export interface MultiImageUploaderProps {
  onUpload?: (files: { file: File; url: string }[]) => void;
  onError?: (error: string) => void;
  maxSizeInMB?: number;
  allowedTypes?: string[];
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  maxFiles?: number;
  className?: string;
  disabled?: boolean;
  defaultImages?: string[];
  label?: string;
  description?: string;
}

export function MultiImageUploader({
  onUpload,
  onError,
  maxSizeInMB = 5,
  allowedTypes = IMAGE_FILE_TYPES,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  maxFiles = 10,
  className,
  disabled = false,
  defaultImages = [],
  label = "Upload Images",
  description = "Drag and drop images here, or click to select",
}: MultiImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize with default images if provided
  React.useEffect(() => {
    if (defaultImages.length > 0 && uploadFiles.length === 0) {
      const defaultFileObjects = defaultImages.map((url, index) => ({
        id: `default-${index}`,
        file: new File([], `default-${index}.jpg`),
        preview: url,
        progress: 100,
        status: "success" as const,
      }));
      setUploadFiles(defaultFileObjects);
    }
  }, [defaultImages, uploadFiles.length]);

  const validationOptions: FileValidationOptions = {
    maxSizeInMB,
    allowedTypes,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
  };

  const handleDrop = useCallback(
    async (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      const remainingSlots = maxFiles - uploadFiles.length;
      if (remainingSlots <= 0) {
        setError(`Maximum of ${maxFiles} images allowed`);
        if (onError) onError(`Maximum of ${maxFiles} images allowed`);
        return;
      }

      const { valid, invalid } = await processFiles(
        e.dataTransfer.files,
        validationOptions,
        remainingSlots
      );

      if (invalid.length > 0) {
        setError(invalid[0].error);
        if (onError) onError(invalid[0].error);
      }

      if (valid.length > 0) {
        setError(null);
        const newFiles = [...uploadFiles, ...valid];
        setUploadFiles(newFiles);

        // Start uploading the new files
        valid.forEach((file) => handleUpload(file));
      }
    },
    [disabled, maxFiles, uploadFiles, validationOptions, onError]
  );

  const handleFileChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      const remainingSlots = maxFiles - uploadFiles.length;
      if (remainingSlots <= 0) {
        setError(`Maximum of ${maxFiles} images allowed`);
        if (onError) onError(`Maximum of ${maxFiles} images allowed`);
        return;
      }

      const { valid, invalid } = await processFiles(
        e.target.files,
        validationOptions,
        remainingSlots
      );

      if (invalid.length > 0) {
        setError(invalid[0].error);
        if (onError) onError(invalid[0].error);
      }

      if (valid.length > 0) {
        setError(null);
        const newFiles = [...uploadFiles, ...valid];
        setUploadFiles(newFiles);

        // Start uploading the new files
        valid.forEach((file) => handleUpload(file));
      }

      // Reset the input value so the same file can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [disabled, maxFiles, uploadFiles, validationOptions, onError]
  );

  const handleUpload = useCallback(
    async (file: UploadFile) => {
      setUploadFiles((prev) =>
        prev.map((f) => (f.id === file.id ? { ...f, status: "uploading" } : f))
      );

      try {
        const result = await mockUploadFile(file.file, (progress) => {
          setUploadFiles((prev) =>
            prev.map((f) => (f.id === file.id ? { ...f, progress } : f))
          );
        });

        if (result.success) {
          setUploadFiles((prev) =>
            prev.map((f) =>
              f.id === file.id ? { ...f, status: "success", progress: 100 } : f
            )
          );

          // Notify parent component of all successfully uploaded files
          if (onUpload) {
            const successFiles = uploadFiles
              .filter((f) => f.status === "success" || f.id === file.id)
              .map((f) => ({
                file: f.file,
                url: f.id === file.id ? result.url : f.preview,
              }));
            onUpload(successFiles);
          }
        } else {
          setUploadFiles((prev) =>
            prev.map((f) =>
              f.id === file.id
                ? { ...f, status: "error", error: "Upload failed" }
                : f
            )
          );
          if (onError) onError(`Failed to upload ${file.file.name}`);
        }
      } catch (err) {
        setUploadFiles((prev) =>
          prev.map((f) =>
            f.id === file.id
              ? { ...f, status: "error", error: "Upload failed" }
              : f
          )
        );
        if (onError) onError(`Failed to upload ${file.file.name}`);
      }
    },
    [uploadFiles, onUpload, onError]
  );

  const handleRemoveImage = useCallback((id: string) => {
    setUploadFiles((prev) => prev.filter((file) => file.id !== id));
    setError(null);
  }, []);

  const handleButtonClick = useCallback(() => {
    if (disabled) return;
    if (uploadFiles.length >= maxFiles) {
      setError(`Maximum of ${maxFiles} images allowed`);
      if (onError) onError(`Maximum of ${maxFiles} images allowed`);
      return;
    }
    fileInputRef.current?.click();
  }, [disabled, uploadFiles.length, maxFiles, onError]);

  const renderGallery = () => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2">
        {uploadFiles.map((file) => (
          <div key={file.id} className="relative aspect-square">
            <img
              src={file.preview}
              alt={file.file.name}
              className="w-full h-full object-cover rounded-md"
            />

            {file.status !== "uploading" && (
              <button
                type="button"
                onClick={() => handleRemoveImage(file.id)}
                className="absolute top-1 right-1 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                aria-label="Remove image"
              >
                <XIcon className="h-3 w-3" />
              </button>
            )}
            {file.status === "uploading" && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-md">
                <div className="w-3/4">
                  <UploadProgress
                    progress={file.progress}
                    status={file.status}
                    size="sm"
                    showPercentage={false}
                  />
                </div>
              </div>
            )}
            {file.status === "error" && (
              <div className="absolute inset-0 bg-red-500/30 flex items-center justify-center rounded-md">
                <AlertCircleIcon className="h-6 w-6 text-white" />
              </div>
            )}
          </div>
        ))}

        {uploadFiles.length < maxFiles && (
          <button
            type="button"
            onClick={handleButtonClick}
            disabled={disabled}
            className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-md hover:border-primary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlusIcon className="h-8 w-8 text-muted-foreground" />

            <span className="text-xs text-muted-foreground mt-1">
              Add Image
            </span>
          </button>
        )}
      </div>
    );
  };

  const renderEmptyState = () => {
    return (
      <div
        className="flex flex-col items-center justify-center text-center p-6"
        onClick={handleButtonClick}
      >
        <ImageIcon className="h-10 w-10 mb-4 text-muted-foreground" />

        <h3 className="text-lg font-medium mb-1">{label}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <p className="text-xs text-muted-foreground">
          {allowedTypes.map((type) => type.replace("image/", "")).join(", ")}{" "}
          formats, up to {maxSizeInMB}MB
        </p>
        {(minWidth || minHeight || maxWidth || maxHeight) && (
          <p className="text-xs text-muted-foreground mt-1">
            {minWidth && minHeight && `Min: ${minWidth}×${minHeight}px`}
            {maxWidth && maxHeight && (minWidth || minHeight) && ", "}
            {maxWidth && maxHeight && `Max: ${maxWidth}×${maxHeight}px`}
          </p>
        )}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-4"
          disabled={disabled}
        >
          <UploadIcon className="h-4 w-4 mr-2" />
          Browse Files
        </Button>
      </div>
    );
  };

  return (
    <div className={className}>
      <Card
        className={`relative overflow-hidden transition-all duration-200 ${
          isDragging ? "border-primary border-2" : ""
        } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
        onDragOver={handleDragOver}
        onDragEnter={(e) => {
          handleDragEnter(e);
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={(e) => {
          handleDragLeave(e);
          if (!disabled) setIsDragging(false);
        }}
        onDrop={handleDrop}
      >
        <div className="min-h-[200px]">
          {uploadFiles.length > 0 ? renderGallery() : renderEmptyState()}
          {isDragging && (
            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center rounded-md">
              <div className="bg-background p-4 rounded-md shadow-lg">
                <p className="font-medium">Drop images here</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {error && (
        <div className="flex items-center mt-2 text-destructive text-sm">
          <AlertCircleIcon className="h-4 w-4 mr-1 flex-shrink-0" />

          <span>{error}</span>
        </div>
      )}

      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-muted-foreground">
          {uploadFiles.length} of {maxFiles} images
        </p>
        {uploadFiles.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleButtonClick}
            disabled={disabled || uploadFiles.length >= maxFiles}
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add More
          </Button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={allowedTypes.join(",")}
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
        multiple
      />
    </div>
  );
}
