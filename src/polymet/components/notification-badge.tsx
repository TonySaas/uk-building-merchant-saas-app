import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "text-foreground border border-input",
        success: "bg-green-500 text-white dark:bg-green-600",
        warning: "bg-amber-500 text-white dark:bg-amber-600",
        info: "bg-blue-500 text-white dark:bg-blue-600",
      },
      size: {
        default: "h-5 min-w-5 px-2",
        sm: "h-4 min-w-4 px-1.5",
        lg: "h-6 min-w-6 px-2.5",
        icon: "h-5 w-5 p-0",
      },
      position: {
        default: "relative",
        topRight: "absolute -top-1 -right-1",
        topLeft: "absolute -top-1 -left-1",
        bottomRight: "absolute -bottom-1 -right-1",
        bottomLeft: "absolute -bottom-1 -left-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      position: "default",
    },
  }
);

export interface NotificationBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  count?: number;
  maxCount?: number;
  dot?: boolean;
  pulse?: boolean;
}

export function NotificationBadge({
  className,
  variant,
  size,
  position,
  count,
  maxCount = 99,
  dot = false,
  pulse = false,
  ...props
}: NotificationBadgeProps) {
  const displayCount =
    count !== undefined && count > maxCount ? `${maxCount}+` : count;

  return (
    <span
      className={cn(
        badgeVariants({ variant, size, position }),
        pulse && "animate-pulse",
        dot && "flex h-2 w-2 rounded-full p-0 min-w-0",
        className
      )}
      {...props}
    >
      {!dot && displayCount !== undefined && displayCount}
    </span>
  );
}
