import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  BellIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  InfoIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const popupVariants = cva(
  "fixed z-50 flex flex-col shadow-lg rounded-lg border overflow-hidden max-w-sm w-full animate-in fade-in-0 zoom-in-95",
  {
    variants: {
      position: {
        "top-right": "top-4 right-4",
        "top-left": "top-4 left-4",
        "bottom-right": "bottom-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "top-center": "top-4 left-1/2 -translate-x-1/2",
        "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
      },
      variant: {
        default: "bg-background text-foreground",
        success:
          "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950/50 dark:text-green-300",
        error:
          "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300",
        warning:
          "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
        info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300",
      },
    },
    defaultVariants: {
      position: "bottom-right",
      variant: "default",
    },
  }
);

export interface PopupNotificationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof popupVariants> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export function PopupNotification({
  className,
  position,
  variant,
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
  duration = 0, // 0 means no auto-close
  onClose,
  showCloseButton = true,
  ...props
}: PopupNotificationProps) {
  const [visible, setVisible] = useState(true);

  // Handle auto-close
  useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300); // Wait for exit animation
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

      default:
        return <BellIcon className="h-5 w-5" />;
    }
  };

  if (!visible) return null;

  return (
    <Card
      className={cn(
        popupVariants({ position, variant }),
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        className
      )}
      {...props}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">{getIcon()}</div>
          <div className="flex-1">
            <div className="font-medium leading-none tracking-tight">
              {title}
            </div>
            {description && (
              <div className="mt-1 text-sm opacity-90">{description}</div>
            )}
          </div>
          {showCloseButton && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-md opacity-70 transition-opacity hover:opacity-100"
              onClick={handleClose}
            >
              <XIcon className="h-3 w-3" />

              <span className="sr-only">Close</span>
            </Button>
          )}
        </div>
      </CardContent>

      {(primaryAction || secondaryAction) && (
        <CardFooter className="flex gap-2 p-4 pt-0 justify-end">
          {secondaryAction && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                secondaryAction.onClick();
                handleClose();
              }}
            >
              {secondaryAction.label}
            </Button>
          )}
          {primaryAction && (
            <Button
              size="sm"
              onClick={() => {
                primaryAction.onClick();
                handleClose();
              }}
            >
              {primaryAction.label}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
