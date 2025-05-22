import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  AlertCircleIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  InfoIcon,
  XIcon,
  BellIcon,
  MegaphoneIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const alertBannerVariants = cva(
  "relative w-full flex items-center gap-3 rounded-lg border p-4 text-sm",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300",
        warning:
          "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
        error:
          "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300",
        success:
          "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950/50 dark:text-green-300",
        announcement:
          "border-purple-200 bg-purple-50 text-purple-800 dark:border-purple-800 dark:bg-purple-950/50 dark:text-purple-300",
      },
      position: {
        default: "relative",
        top: "sticky top-0 z-50",
        bottom: "sticky bottom-0 z-50",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "default",
    },
  }
);

export interface AlertBannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertBannerVariants> {
  title?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: React.ReactNode;
  autoClose?: number; // Time in milliseconds
}

export function AlertBanner({
  className,
  variant,
  position,
  title,
  icon,
  dismissible = false,
  onDismiss,
  action,
  autoClose,
  children,
  ...props
}: AlertBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  // Handle auto-close
  React.useEffect(() => {
    if (autoClose && !dismissed) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    if (onDismiss) {
      onDismiss();
    }
  };

  // Don't render if dismissed
  if (dismissed) {
    return null;
  }

  // Determine icon based on variant
  const getIcon = () => {
    if (icon) return icon;

    switch (variant) {
      case "info":
        return (
          <InfoIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
        );

      case "warning":
        return (
          <AlertTriangleIcon className="h-5 w-5 text-amber-500 dark:text-amber-400" />
        );

      case "error":
        return (
          <AlertCircleIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
        );

      case "success":
        return (
          <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
        );

      case "announcement":
        return (
          <MegaphoneIcon className="h-5 w-5 text-purple-500 dark:text-purple-400" />
        );

      default:
        return <BellIcon className="h-5 w-5" />;
    }
  };

  return (
    <div
      className={cn(alertBannerVariants({ variant, position }), className)}
      role="alert"
      {...props}
    >
      <div className="flex-shrink-0">{getIcon()}</div>
      <div className="flex-grow">
        {title && <div className="font-medium">{title}</div>}
        <div className={title ? "mt-1" : ""}>{children}</div>
      </div>
      <div className="flex-shrink-0 flex items-center gap-2">
        {action}
        {dismissible && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100"
            onClick={handleDismiss}
          >
            <XIcon className="h-4 w-4" />

            <span className="sr-only">Dismiss</span>
          </Button>
        )}
      </div>
    </div>
  );
}
