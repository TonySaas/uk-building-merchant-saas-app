import React from "react";
import { CheckCircleIcon, XCircleIcon, AlertCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface UploadProgressProps {
  progress: number;
  status: "idle" | "uploading" | "success" | "error";
  error?: string;
  showPercentage?: boolean;
  showIcon?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function UploadProgress({
  progress,
  status,
  error,
  showPercentage = true,
  showIcon = true,
  className,
  size = "md",
}: UploadProgressProps) {
  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const iconSizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={cn("w-full space-y-1", className)}>
      <div className="flex items-center justify-between">
        {showPercentage && status === "uploading" && (
          <span className={cn("text-muted-foreground", textSizeClasses[size])}>
            {Math.round(progress)}%
          </span>
        )}

        {status === "error" && error && (
          <span className={cn("text-destructive", textSizeClasses[size])}>
            {error}
          </span>
        )}

        {showIcon && (
          <div className="ml-auto flex items-center">
            {status === "uploading" && (
              <span
                className={cn(
                  "text-muted-foreground animate-pulse",
                  textSizeClasses[size]
                )}
              >
                Uploading...
              </span>
            )}

            {status === "success" && (
              <CheckCircleIcon
                className={cn("text-green-500", iconSizeClasses[size])}
              />
            )}

            {status === "error" && (
              <XCircleIcon
                className={cn("text-destructive", iconSizeClasses[size])}
              />
            )}

            {status === "idle" && (
              <AlertCircleIcon
                className={cn("text-muted-foreground", iconSizeClasses[size])}
              />
            )}
          </div>
        )}
      </div>

      <div
        className={cn(
          "w-full bg-muted rounded-full overflow-hidden",
          sizeClasses[size]
        )}
      >
        <div
          className={cn(
            "h-full transition-all duration-300 ease-in-out rounded-full",
            {
              "bg-primary": status === "uploading",
              "bg-green-500": status === "success",
              "bg-destructive": status === "error",
              "bg-muted-foreground": status === "idle",
            }
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
