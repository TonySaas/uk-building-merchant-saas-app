import React, {
  useState,
  useRef,
  useCallback,
  ChangeEvent,
  DragEvent,
} from "react";
import { ImageIcon, UploadIcon, XIcon, AlertCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

export interface ImageUploaderProps {
  onUpload?: (file: File, url: string) => void;
  onError?: (error: string) => void;
  maxSizeInMB?: number;
  allowedTypes?: string[];
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  className?: string;
  disabled?: boolean;
  defaultImage?: string;
  label?: string;
  description?: string;
}

export function ImageUploader({
  onUpload,
  onError,
  maxSizeInMB = 5,
  allowedTypes = IMAGE_FILE_TYPES,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  className,
  disabled = false,
  defaultImage,
  label = "Upload Image",
  description = "Drag and drop an image here, or click to select",
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadFile, setUploadFile] = useState<UploadFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

      const { valid, invalid } = await processFiles(
        e.dataTransfer.files,
        validationOptions
      );

      if (invalid.length > 0) {
        setError(invalid[0].error);
        if (onError) onError(invalid[0].error);
        return;
      }

      if (valid.length > 0) {
        setError(null);
        setUploadFile(valid[0]);
        handleUpload(valid[0]);
      }
    },
    [disabled, validationOptions, onError]
  );

  const handleFileChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      const { valid, invalid } = await processFiles(
        e.target.files,
        validationOptions
      );

      if (invalid.length > 0) {
        setError(invalid[0].error);
        if (onError) onError(invalid[0].error);
        return;
      }

      if (valid.length > 0) {
        setError(null);
        setUploadFile(valid[0]);
        handleUpload(valid[0]);
      }

      // Reset the input value so the same file can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [disabled, validationOptions, onError]
  );

  const handleUpload = useCallback(
    async (file: UploadFile) => {
      setUploadFile((prev) => (prev ? { ...prev, status: "uploading" } : null));

      try {
        const result = await mockUploadFile(file.file, (progress) => {
          setUploadFile((prev) => (prev ? { ...prev, progress } : null));
        });

        if (result.success) {
          setUploadFile((prev) =>
            prev ? { ...prev, status: "success", progress: 100 } : null
          );
          if (onUpload) onUpload(file.file, result.url);
        } else {
          setUploadFile((prev) =>
            prev ? { ...prev, status: "error", error: "Upload failed" } : null
          );
          setError("Upload failed. Please try again.");
          if (onError) onError("Upload failed. Please try again.");
        }
      } catch (err) {
        setUploadFile((prev) =>
          prev ? { ...prev, status: "error", error: "Upload failed" } : null
        );
        setError("Upload failed. Please try again.");
        if (onError) onError("Upload failed. Please try again.");
      }
    },
    [onUpload, onError]
  );

  const handleRemoveImage = useCallback(() => {
    setUploadFile(null);
    setError(null);
  }, []);

  const handleButtonClick = useCallback(() => {
    if (disabled) return;
    fileInputRef.current?.click();
  }, [disabled]);

  const renderContent = () => {
    if (uploadFile) {
      return (
        <div className="relative w-full h-full">
          <img
            src={uploadFile.preview}
            alt="Preview"
            className="w-full h-full object-contain rounded-md"
          />

          {uploadFile.status !== "uploading" && (
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              aria-label="Remove image"
            >
              <XIcon className="h-4 w-4" />
            </button>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-2">
            <UploadProgress
              progress={uploadFile.progress}
              status={uploadFile.status}
              error={uploadFile.error}
              size="sm"
            />
          </div>
        </div>
      );
    }

    if (defaultImage) {
      return (
        <div className="relative w-full h-full">
          <img
            src={defaultImage}
            alt="Default"
            className="w-full h-full object-contain rounded-md"
          />

          <button
            type="button"
            onClick={handleButtonClick}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white opacity-0 hover:opacity-100 transition-opacity rounded-md"
          >
            <UploadIcon className="h-8 w-8 mb-2" />

            <span>Replace Image</span>
          </button>
        </div>
      );
    }

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
        } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
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
        onClick={disabled ? undefined : handleButtonClick}
      >
        <div className="aspect-square w-full">
          {renderContent()}
          {isDragging && (
            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center rounded-md">
              <div className="bg-background p-4 rounded-md shadow-lg">
                <p className="font-medium">Drop image here</p>
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

      <input
        ref={fileInputRef}
        type="file"
        accept={allowedTypes.join(",")}
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
    </div>
  );
}
