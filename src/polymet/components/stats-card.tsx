import { cn } from "@/lib/utils";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  HelpCircleIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import { ReactNode } from "react";
import CardBase from "@/polymet/components/card-base";

export interface StatsCardProps {
  className?: string;
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive?: boolean;
    label?: string;
  };
  footer?: ReactNode;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  variant?: "default" | "outline" | "filled";
  loading?: boolean;
  tooltip?: string;
  color?: "default" | "primary" | "success" | "warning" | "danger" | "info";
}

export default function StatsCard({
  className,
  title,
  value,
  description,
  icon,
  trend,
  footer,
  onClick,
  size = "medium",
  variant = "default",
  loading = false,
  tooltip,
  color = "default",
}: StatsCardProps) {
  // Size-based styles
  const sizeStyles = {
    small: {
      card: "p-3",
      title: "text-xs",
      value: "text-xl",
      description: "text-xs",
      trend: "text-xs",
    },
    medium: {
      card: "p-4",
      title: "text-sm",
      value: "text-2xl",
      description: "text-sm",
      trend: "text-sm",
    },
    large: {
      card: "p-5",
      title: "text-base",
      value: "text-3xl",
      description: "text-base",
      trend: "text-base",
    },
  };

  // Variant-based styles
  const variantStyles = {
    default: "",
    outline: "border-2",
    filled: "bg-secondary",
  };

  // Color-based styles
  const colorStyles = {
    default: {
      border: "border-border",
      icon: "text-muted-foreground",
      title: "text-muted-foreground",
    },
    primary: {
      border: "border-primary",
      icon: "text-primary",
      title: "text-primary",
    },
    success: {
      border: "border-green-500 dark:border-green-600",
      icon: "text-green-500 dark:text-green-400",
      title: "text-green-600 dark:text-green-400",
    },
    warning: {
      border: "border-yellow-500 dark:border-yellow-600",
      icon: "text-yellow-500 dark:text-yellow-400",
      title: "text-yellow-600 dark:text-yellow-400",
    },
    danger: {
      border: "border-red-500 dark:border-red-600",
      icon: "text-red-500 dark:text-red-400",
      title: "text-red-600 dark:text-red-400",
    },
    info: {
      border: "border-blue-500 dark:border-blue-600",
      icon: "text-blue-500 dark:text-blue-400",
      title: "text-blue-600 dark:text-blue-400",
    },
  };

  // Format trend value
  const formatTrendValue = (value: number) => {
    return value > 0 ? `+${value}%` : `${value}%`;
  };

  return (
    <CardBase
      className={cn(
        sizeStyles[size].card,
        variant === "outline" && colorStyles[color].border,
        variantStyles[variant],
        className
      )}
      onClick={onClick}
      interactive={!!onClick}
      elevation={variant === "filled" ? "none" : "low"}
      padding="none"
    >
      <div className="flex items-start">
        {/* Icon */}
        {icon && (
          <div
            className={cn(
              "mr-3 p-2 rounded-md bg-secondary/80",
              colorStyles[color].icon
            )}
          >
            {icon}
          </div>
        )}

        <div className="flex-1">
          {/* Title and tooltip */}
          <div className="flex items-center justify-between mb-1">
            <h3
              className={cn(
                sizeStyles[size].title,
                "font-medium",
                colorStyles[color].title
              )}
            >
              {title}
            </h3>
            {tooltip && (
              <div className="relative group">
                <HelpCircleIcon className="h-4 w-4 text-muted-foreground cursor-help" />

                <div className="absolute right-0 w-48 p-2 bg-popover text-popover-foreground text-xs rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-50">
                  {tooltip}
                </div>
              </div>
            )}
          </div>

          {/* Value */}
          {loading ? (
            <div
              className={cn(
                "h-8 bg-muted animate-pulse rounded",
                sizeStyles[size].value
              )}
            />
          ) : (
            <div
              className={cn("font-bold tracking-tight", sizeStyles[size].value)}
            >
              {value}
            </div>
          )}

          {/* Description */}
          {description && (
            <p
              className={cn(
                "text-muted-foreground mt-1",
                sizeStyles[size].description
              )}
            >
              {description}
            </p>
          )}

          {/* Trend */}
          {trend && (
            <div
              className={cn(
                "flex items-center mt-2",
                sizeStyles[size].trend,
                trend.isPositive
                  ? "text-green-500 dark:text-green-400"
                  : "text-red-500 dark:text-red-400"
              )}
            >
              {trend.isPositive ? (
                <>
                  <TrendingUpIcon className="h-4 w-4 mr-1" />

                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                </>
              ) : (
                <>
                  <TrendingDownIcon className="h-4 w-4 mr-1" />

                  <ArrowDownIcon className="h-3 w-3 mr-1" />
                </>
              )}
              <span>{formatTrendValue(trend.value)}</span>
              {trend.label && (
                <span className="text-muted-foreground ml-1">
                  {trend.label}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      {footer && (
        <div className="mt-4 pt-3 border-t border-border">{footer}</div>
      )}
    </CardBase>
  );
}
