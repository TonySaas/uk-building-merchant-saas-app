import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  InfoIcon,
  XIcon,
  Loader2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        success:
          "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950/50 dark:text-green-300",
        error:
          "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300",
        warning:
          "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
        info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300",
        loading:
          "border-gray-200 bg-gray-50 text-gray-800 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ToastNotificationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  duration?: number;
  onClose?: () => void;
  swipeToClose?: boolean;
}

export function ToastNotification({
  className,
  variant,
  title,
  description,
  icon,
  action,
  duration = 5000,
  onClose,
  swipeToClose = true,
  ...props
}: ToastNotificationProps) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  // Handle auto-close with progress
  useEffect(() => {
    if (!duration || duration <= 0) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = endTime - now;

      if (remaining <= 0) {
        clearInterval(timer);
        handleClose();
      } else {
        setProgress((remaining / duration) * 100);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [duration]);

  // Handle close
  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300); // Wait for exit animation
  };

  // Touch handlers for swipe to dismiss
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!swipeToClose) return;
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!swipeToClose) return;
    setTouchEnd(e.targetTouches[0].clientX);

    const diff = touchStart - e.targetTouches[0].clientX;
    if (diff > 0) {
      // Only allow swipe left
      setTranslateX(-diff);
    }
  };

  const handleTouchEnd = () => {
    if (!swipeToClose) return;
    if (touchStart - touchEnd > 100) {
      // Swipe threshold
      handleClose();
    } else {
      setTranslateX(0); // Reset position
    }
  };

  // Get icon based on variant
  const getIcon = () => {
    if (icon) return icon;

    switch (variant) {
      case "success":
        return (
          <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
        );

      case "error":
        return (
          <XCircleIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
        );

      case "warning":
        return (
          <AlertCircleIcon className="h-5 w-5 text-amber-500 dark:text-amber-400" />
        );

      case "info":
        return (
          <InfoIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
        );

      case "loading":
        return (
          <Loader2Icon className="h-5 w-5 animate-spin text-gray-500 dark:text-gray-400" />
        );

      default:
        return null;
    }
  };

  if (!visible) return null;

  return (
    <div
      className={cn(
        toastVariants({ variant }),
        "animate-in fade-in slide-in-from-top-1",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:slide-out-to-right-1",
        className
      )}
      style={{ transform: `translateX(${translateX}px)` }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      {...props}
    >
      <div className="flex items-start gap-3 w-full">
        {getIcon() && <div className="flex-shrink-0">{getIcon()}</div>}
        <div className="flex-1">
          {title && (
            <div className="font-medium leading-none tracking-tight">
              {title}
            </div>
          )}
          {description && (
            <div className={cn("text-sm opacity-90", title && "mt-1")}>
              {description}
            </div>
          )}
          {action && <div className="mt-2">{action}</div>}
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1 h-6 w-6 rounded-md opacity-70 transition-opacity hover:opacity-100"
        onClick={handleClose}
      >
        <XIcon className="h-3 w-3" />

        <span className="sr-only">Close</span>
      </Button>

      {duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-background/20">
          <div
            className="h-full bg-foreground/20 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
