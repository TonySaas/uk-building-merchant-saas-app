import { ChangeEvent, DragEvent } from "react";

// File types and validation
export type FileType = "image" | "video" | "document" | "any";

export interface FileValidationOptions {
  maxSizeInMB?: number;
  allowedTypes?: string[];
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export interface UploadFile {
  id: string;
  file: File;
  preview: string;
  progress: number;
  error?: string;
  status: "idle" | "uploading" | "success" | "error";
  dimensions?: {
    width: number;
    height: number;
  };
}

// Validation functions
export const validateFileSize = (
  file: File,
  maxSizeInMB: number = 5
): boolean => {
  const fileSizeInMB = file.size / (1024 * 1024);
  return fileSizeInMB <= maxSizeInMB;
};

export const validateFileType = (
  file: File,
  allowedTypes: string[] = []
): boolean => {
  if (allowedTypes.length === 0) return true;
  return allowedTypes.some((type) => file.type.includes(type));
};

export const validateImageDimensions = async (
  file: File,
  options: {
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
  }
): Promise<{
  valid: boolean;
  dimensions?: { width: number; height: number };
  error?: string;
}> => {
  return new Promise((resolve) => {
    if (!file.type.includes("image")) {
      resolve({ valid: true });
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const { minWidth, minHeight, maxWidth, maxHeight } = options;
      const dimensions = { width: img.width, height: img.height };

      if (minWidth && img.width < minWidth) {
        resolve({
          valid: false,
          dimensions,
          error: `Image width must be at least ${minWidth}px`,
        });
        return;
      }

      if (minHeight && img.height < minHeight) {
        resolve({
          valid: false,
          dimensions,
          error: `Image height must be at least ${minHeight}px`,
        });
        return;
      }

      if (maxWidth && img.width > maxWidth) {
        resolve({
          valid: false,
          dimensions,
          error: `Image width must be at most ${maxWidth}px`,
        });
        return;
      }

      if (maxHeight && img.height > maxHeight) {
        resolve({
          valid: false,
          dimensions,
          error: `Image height must be at most ${maxHeight}px`,
        });
        return;
      }

      resolve({ valid: true, dimensions });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({ valid: false, error: "Failed to load image" });
    };

    img.src = objectUrl;
  });
};

// Helper functions
export const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

export const getFileTypeFromMime = (mimeType: string): FileType => {
  if (mimeType.includes("image")) return "image";
  if (mimeType.includes("video")) return "video";
  if (
    mimeType.includes("pdf") ||
    mimeType.includes("document") ||
    mimeType.includes("text")
  )
    return "document";
  return "any";
};

export const createFilePreview = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
};

export const formatFileSize = (sizeInBytes: number): string => {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} B`;
  } else if (sizeInBytes < 1024 * 1024) {
    return `${(sizeInBytes / 1024).toFixed(1)} KB`;
  } else {
    return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
  }
};

export const getFileExtension = (fileName: string): string => {
  return fileName.split(".").pop()?.toLowerCase() || "";
};

// Common file type groups
export const IMAGE_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];

export const VIDEO_FILE_TYPES = ["video/mp4", "video/webm", "video/ogg"];
export const DOCUMENT_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

// Mock upload function for demo purposes
export const mockUploadFile = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<{ url: string; success: boolean }> => {
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (onProgress) onProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        // Simulate occasional upload failure
        const success = Math.random() > 0.1;
        resolve({
          url: success ? URL.createObjectURL(file) : "",
          success,
        });
      }
    }, 300);
  });
};

// Handlers for drag events
export const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
};

export const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
};

export const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
};

// Process files from input or drop event
export const processFiles = async (
  files: FileList | null,
  options: FileValidationOptions = {},
  maxFiles: number = 1
): Promise<{
  valid: UploadFile[];
  invalid: { file: File; error: string }[];
}> => {
  if (!files || files.length === 0) {
    return { valid: [], invalid: [] };
  }

  const validFiles: UploadFile[] = [];
  const invalidFiles: { file: File; error: string }[] = [];
  const filesToProcess = Array.from(files).slice(0, maxFiles);

  for (const file of filesToProcess) {
    // Check file size
    if (options.maxSizeInMB && !validateFileSize(file, options.maxSizeInMB)) {
      invalidFiles.push({
        file,
        error: `File size exceeds the maximum limit of ${options.maxSizeInMB}MB`,
      });
      continue;
    }

    // Check file type
    if (options.allowedTypes && !validateFileType(file, options.allowedTypes)) {
      invalidFiles.push({
        file,
        error: `File type not allowed. Allowed types: ${options.allowedTypes.join(", ")}`,
      });
      continue;
    }

    // Check image dimensions if applicable
    if (
      file.type.includes("image") &&
      (options.minWidth ||
        options.minHeight ||
        options.maxWidth ||
        options.maxHeight)
    ) {
      const dimensionValidation = await validateImageDimensions(file, {
        minWidth: options.minWidth,
        minHeight: options.minHeight,
        maxWidth: options.maxWidth,
        maxHeight: options.maxHeight,
      });

      if (!dimensionValidation.valid) {
        invalidFiles.push({
          file,
          error: dimensionValidation.error || "Invalid image dimensions",
        });
        continue;
      }

      const preview = await createFilePreview(file);
      validFiles.push({
        id: generateUniqueId(),
        file,
        preview,
        progress: 0,
        status: "idle",
        dimensions: dimensionValidation.dimensions,
      });
    } else {
      const preview = await createFilePreview(file);
      validFiles.push({
        id: generateUniqueId(),
        file,
        preview,
        progress: 0,
        status: "idle",
      });
    }
  }

  return { valid: validFiles, invalid: invalidFiles };
};
