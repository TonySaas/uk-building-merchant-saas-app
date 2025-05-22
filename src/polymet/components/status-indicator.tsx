import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  ClockIcon,
  AlertTriangleIcon,
  CircleIcon,
} from "lucide-react";

const statusIndicatorVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        approved:
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        rejected:
          "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        pending:
          "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
        info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        warning:
          "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
        neutral:
          "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
      },
      size: {
        sm: "text-xs px-1.5 py-0.5",
        default: "text-xs",
        lg: "text-sm px-2.5 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusIndicatorVariants> {
  status?: "approved" | "rejected" | "pending" | "info" | "warning" | "neutral";
  showIcon?: boolean;
  pulse?: boolean;
  label?: string;
}

export function StatusIndicator({
  className,
  variant,
  size,
  status,
  showIcon = true,
  pulse = false,
  label,
  children,
  ...props
}: StatusIndicatorProps) {
  // Use status as variant if provided
  const finalVariant = status || (variant as string);

  // Determine which icon to show based on status/variant
  const getIcon = () => {
    switch (finalVariant) {
      case "approved":
        return <CheckCircleIcon className="h-3 w-3" />;

      case "rejected":
        return <XCircleIcon className="h-3 w-3" />;

      case "pending":
        return <ClockIcon className="h-3 w-3" />;

      case "info":
        return <AlertCircleIcon className="h-3 w-3" />;

      case "warning":
        return <AlertTriangleIcon className="h-3 w-3" />;

      default:
        return <CircleIcon className="h-3 w-3" />;
    }
  };

  return (
    <span
      className={cn(
        statusIndicatorVariants({ variant: finalVariant as any, size }),
        pulse && "animate-pulse",
        className
      )}
      {...props}
    >
      {showIcon && getIcon()}
      {label || children}
    </span>
  );
}
