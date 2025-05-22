import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  AlertCircleIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  InfoIcon,
  XIcon,
  ShieldIcon,
  LockIcon,
  WifiOffIcon,
  ServerCrashIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fullPageAlertVariants = cva(
  "fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity",
  {
    variants: {
      variant: {
        default: "bg-background/80",
        error: "bg-red-950/90 text-red-50",
        warning: "bg-amber-950/90 text-amber-50",
        success: "bg-green-950/90 text-green-50",
        info: "bg-blue-950/90 text-blue-50",
        maintenance: "bg-purple-950/90 text-purple-50",
        security: "bg-slate-950/90 text-slate-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface FullPageAlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fullPageAlertVariants> {
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
  dismissible?: boolean;
  onDismiss?: () => void;
  autoClose?: number; // Time in milliseconds
  type?: "error" | "warning" | "success" | "info" | "maintenance" | "security";
}

export function FullPageAlert({
  className,
  variant,
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
  dismissible = false,
  onDismiss,
  autoClose,
  type,
  children,
  ...props
}: FullPageAlertProps) {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(0);

  // Use type to set variant if provided
  const alertVariant = type || variant;

  // Fade in effect
  useEffect(() => {
    const timer = setTimeout(() => setOpacity(1), 10);
    return () => clearTimeout(timer);
  }, []);

  // Handle auto-close
  useEffect(() => {
    if (autoClose && autoClose > 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose]);

  const handleDismiss = () => {
    setOpacity(0);
    setTimeout(() => {
      setVisible(false);
      if (onDismiss) onDismiss();
    }, 300); // Wait for fade out animation
  };

  // Get icon based on variant/type
  const getIcon = () => {
    if (icon) return icon;

    switch (alertVariant) {
      case "error":
        return <AlertCircleIcon className="h-12 w-12 text-red-200" />;

      case "warning":
        return <AlertTriangleIcon className="h-12 w-12 text-amber-200" />;

      case "success":
        return <CheckCircleIcon className="h-12 w-12 text-green-200" />;

      case "info":
        return <InfoIcon className="h-12 w-12 text-blue-200" />;

      case "maintenance":
        return <ServerCrashIcon className="h-12 w-12 text-purple-200" />;

      case "security":
        return <ShieldIcon className="h-12 w-12 text-slate-200" />;

      default:
        return <AlertCircleIcon className="h-12 w-12" />;
    }
  };

  if (!visible) return null;

  return (
    <div
      className={cn(
        fullPageAlertVariants({ variant: alertVariant as any }),
        "transition-opacity duration-300",
        className
      )}
      style={{ opacity }}
      {...props}
    >
      <div className="relative max-w-lg w-full bg-background dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        {dismissible && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8 rounded-md opacity-70 transition-opacity hover:opacity-100"
            onClick={handleDismiss}
          >
            <XIcon className="h-4 w-4" />

            <span className="sr-only">Close</span>
          </Button>
        )}

        <div className="p-6">
          <div className="flex flex-col items-center text-center">
            <div
              className={cn(
                "p-3 rounded-full mb-4",
                alertVariant === "error" &&
                  "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
                alertVariant === "warning" &&
                  "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
                alertVariant === "success" &&
                  "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
                alertVariant === "info" &&
                  "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
                alertVariant === "maintenance" &&
                  "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
                alertVariant === "security" &&
                  "bg-slate-100 text-slate-600 dark:bg-slate-900/30 dark:text-slate-400"
              )}
            >
              {getIcon()}
            </div>

            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>

            {description && (
              <p className="mt-2 text-muted-foreground">{description}</p>
            )}

            {children && <div className="mt-4">{children}</div>}

            {(primaryAction || secondaryAction) && (
              <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full sm:w-auto">
                {secondaryAction && (
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={secondaryAction.onClick}
                  >
                    {secondaryAction.label}
                  </Button>
                )}
                {primaryAction && (
                  <Button
                    className={cn(
                      "w-full sm:w-auto",
                      alertVariant === "error" &&
                        "bg-red-600 hover:bg-red-700 text-white",
                      alertVariant === "warning" &&
                        "bg-amber-600 hover:bg-amber-700 text-white",
                      alertVariant === "success" &&
                        "bg-green-600 hover:bg-green-700 text-white",
                      alertVariant === "info" &&
                        "bg-blue-600 hover:bg-blue-700 text-white",
                      alertVariant === "maintenance" &&
                        "bg-purple-600 hover:bg-purple-700 text-white",
                      alertVariant === "security" &&
                        "bg-slate-600 hover:bg-slate-700 text-white"
                    )}
                    onClick={primaryAction.onClick}
                  >
                    {primaryAction.label}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
