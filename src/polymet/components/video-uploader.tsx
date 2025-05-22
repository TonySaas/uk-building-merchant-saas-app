import React, {
  useState,
  useRef,
  useCallback,
  ChangeEvent,
  DragEvent,
} from "react";
import {
  VideoIcon,
  UploadIcon,
  XIcon,
  PlayIcon,
  PauseIcon,
  AlertCircleIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
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
  VIDEO_FILE_TYPES,
} from "@/polymet/components/upload-utils";

export interface VideoUploaderProps {
  onUpload?: (file: File, url: string) => void;
  onError?: (error: string) => void;
  maxSizeInMB?: number;
  allowedTypes?: string[];
  maxDurationInSeconds?: number;
  className?: string;
  disabled?: boolean;
  defaultVideo?: string;
  label?: string;
  description?: string;
}

export function VideoUploader({
  onUpload,
  onError,
  maxSizeInMB = 100,
  allowedTypes = VIDEO_FILE_TYPES,
  maxDurationInSeconds,
  className,
  disabled = false,
  defaultVideo,
  label = "Upload Video",
  description = "Drag and drop a video here, or click to select",
}: VideoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadFile, setUploadFile] = useState<UploadFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressIntervalRef = useRef<number | null>(null);

  const validationOptions: FileValidationOptions = {
    maxSizeInMB,
    allowedTypes,
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

  const validateVideoDuration = (video: HTMLVideoElement): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!maxDurationInSeconds) {
        resolve(true);
        return;
      }

      const handleMetadata = () => {
        video.removeEventListener("loadedmetadata", handleMetadata);
        const isValid = video.duration <= maxDurationInSeconds;
        resolve(isValid);
      };

      video.addEventListener("loadedmetadata", handleMetadata);
    });
  };

  const handleUpload = useCallback(
    async (file: UploadFile) => {
      setUploadFile((prev) => (prev ? { ...prev, status: "uploading" } : null));

      // Check video duration if maxDurationInSeconds is set
      if (maxDurationInSeconds) {
        const video = document.createElement("video");
        video.preload = "metadata";
        video.src = file.preview;

        const isValidDuration = await validateVideoDuration(video);
        if (!isValidDuration) {
          setUploadFile((prev) =>
            prev
              ? {
                  ...prev,
                  status: "error",
                  error: `Video duration exceeds the maximum limit of ${maxDurationInSeconds} seconds`,
                }
              : null
          );
          setError(
            `Video duration exceeds the maximum limit of ${maxDurationInSeconds} seconds`
          );
          if (onError)
            onError(
              `Video duration exceeds the maximum limit of ${maxDurationInSeconds} seconds`
            );
          return;
        }
      }

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
    [maxDurationInSeconds, onUpload, onError]
  );

  const handleRemoveVideo = useCallback(() => {
    setUploadFile(null);
    setError(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (progressIntervalRef.current) {
      window.clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const handleButtonClick = useCallback(() => {
    if (disabled) return;
    fileInputRef.current?.click();
  }, [disabled]);

  const togglePlayPause = useCallback(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    } else {
      videoRef.current.play();
      progressIntervalRef.current = window.setInterval(() => {
        if (videoRef.current) {
          setCurrentTime(videoRef.current.currentTime);
        }
      }, 100) as unknown as number;
    }

    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleVideoTimeUpdate = useCallback(() => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  }, []);

  const handleVideoLoadedMetadata = useCallback(() => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  }, []);

  const handleVideoEnded = useCallback(() => {
    setIsPlaying(false);
    if (progressIntervalRef.current) {
      window.clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const handleSliderChange = useCallback((value: number[]) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = value[0];
    setCurrentTime(value[0]);
  }, []);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const renderVideoPlayer = () => {
    const videoUrl = uploadFile?.preview || defaultVideo;

    if (!videoUrl) return null;

    return (
      <div className="relative w-full">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full rounded-md"
          onTimeUpdate={handleVideoTimeUpdate}
          onLoadedMetadata={handleVideoLoadedMetadata}
          onEnded={handleVideoEnded}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <button
            type="button"
            onClick={togglePlayPause}
            className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {isPlaying ? (
              <PauseIcon className="h-6 w-6" />
            ) : (
              <PlayIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/50">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={togglePlayPause}
              className="text-white"
            >
              {isPlaying ? (
                <PauseIcon className="h-4 w-4" />
              ) : (
                <PlayIcon className="h-4 w-4" />
              )}
            </button>

            <span className="text-white text-xs">
              {formatTime(currentTime)}
            </span>

            <Slider
              value={[currentTime]}
              min={0}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSliderChange}
              className="flex-1"
            />

            <span className="text-white text-xs">{formatTime(duration)}</span>
          </div>
        </div>

        {uploadFile?.status === "uploading" && (
          <div className="absolute top-0 left-0 right-0 p-2">
            <UploadProgress
              progress={uploadFile.progress}
              status={uploadFile.status}
              size="sm"
            />
          </div>
        )}

        {uploadFile?.status !== "uploading" && (
          <button
            type="button"
            onClick={handleRemoveVideo}
            className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            aria-label="Remove video"
          >
            <XIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  };

  const renderContent = () => {
    if (uploadFile || defaultVideo) {
      return renderVideoPlayer();
    }

    return (
      <div
        className="flex flex-col items-center justify-center text-center p-6"
        onClick={handleButtonClick}
      >
        <VideoIcon className="h-10 w-10 mb-4 text-muted-foreground" />

        <h3 className="text-lg font-medium mb-1">{label}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <p className="text-xs text-muted-foreground">
          {allowedTypes.map((type) => type.replace("video/", "")).join(", ")}{" "}
          formats, up to {maxSizeInMB}MB
        </p>
        {maxDurationInSeconds && (
          <p className="text-xs text-muted-foreground mt-1">
            Maximum duration: {Math.floor(maxDurationInSeconds / 60)}:
            {(maxDurationInSeconds % 60).toString().padStart(2, "0")}
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

  // Clean up interval on unmount
  React.useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        window.clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

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
        onClick={
          disabled || uploadFile || defaultVideo ? undefined : handleButtonClick
        }
      >
        <div className="w-full">
          {renderContent()}
          {isDragging && (
            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center rounded-md">
              <div className="bg-background p-4 rounded-md shadow-lg">
                <p className="font-medium">Drop video here</p>
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
