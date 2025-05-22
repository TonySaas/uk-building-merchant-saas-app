import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import CardBase from "@/polymet/components/card-base";

export interface ActionOption {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  disabled?: boolean;
}

export interface ActionCardProps {
  className?: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  image?: string;
  primaryAction?: ActionOption;
  secondaryAction?: ActionOption;
  actions?: ActionOption[];
  size?: "small" | "medium" | "large";
  layout?: "vertical" | "horizontal";
  accent?: boolean;
  accentColor?:
    | "default"
    | "primary"
    | "blue"
    | "green"
    | "red"
    | "orange"
    | "purple";
}

export default function ActionCard({
  className,
  title,
  description,
  icon,
  image,
  primaryAction,
  secondaryAction,
  actions = [],
  size = "medium",
  layout = "vertical",
  accent = false,
  accentColor = "primary",
}: ActionCardProps) {
  // Size-based styles
  const sizeStyles = {
    small: {
      card: "max-w-[280px]",
      icon: "h-8 w-8",
      title: "text-base font-semibold",
      description: "text-xs",
      image: "h-32",
      buttonSize: "sm" as const,
    },
    medium: {
      card: "max-w-[350px]",
      icon: "h-10 w-10",
      title: "text-lg font-semibold",
      description: "text-sm",
      image: "h-40",
      buttonSize: "default" as const,
    },
    large: {
      card: "max-w-[420px]",
      icon: "h-12 w-12",
      title: "text-xl font-semibold",
      description: "text-base",
      image: "h-48",
      buttonSize: "default" as const,
    },
  };

  // Accent color styles
  const accentStyles = {
    default: "border-l-gray-400 dark:border-l-gray-600",
    primary: "border-l-primary",
    blue: "border-l-blue-500",
    green: "border-l-green-500",
    red: "border-l-red-500",
    orange: "border-l-orange-500",
    purple: "border-l-purple-500",
  };

  return (
    <CardBase
      className={cn(
        sizeStyles[size].card,
        accent && "border-l-4",
        accent && accentStyles[accentColor],
        className
      )}
      padding="none"
    >
      {/* Image at the top if present and vertical layout */}
      {image && layout === "vertical" && (
        <div
          className={cn(
            "w-full bg-muted rounded-t-md overflow-hidden",
            sizeStyles[size].image
          )}
        >
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      <div
        className={cn(
          "p-4",
          layout === "horizontal" && "flex items-start gap-4"
        )}
      >
        {/* Icon */}
        {icon && (
          <div
            className={cn(
              "text-primary mb-4",
              sizeStyles[size].icon,
              layout === "horizontal" && "mb-0 flex-shrink-0"
            )}
          >
            {icon}
          </div>
        )}

        {/* Image if horizontal layout */}
        {image && layout === "horizontal" && (
          <div
            className={cn(
              "bg-muted rounded-md overflow-hidden flex-shrink-0",
              size === "small" ? "w-20 h-20" : "w-24 h-24",
              size === "large" && "w-32 h-32"
            )}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className={layout === "horizontal" ? "flex-1" : ""}>
          {/* Title */}
          <h3 className={sizeStyles[size].title}>{title}</h3>

          {/* Description */}
          {description && (
            <p
              className={cn(
                "mt-2 text-muted-foreground",
                sizeStyles[size].description
              )}
            >
              {description}
            </p>
          )}

          {/* Primary and Secondary Actions */}
          {(primaryAction || secondaryAction) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {primaryAction && (
                <Button
                  onClick={primaryAction.onClick}
                  variant={primaryAction.variant || "default"}
                  size={sizeStyles[size].buttonSize}
                  disabled={primaryAction.disabled}
                >
                  {primaryAction.icon && (
                    <span className="mr-2">{primaryAction.icon}</span>
                  )}
                  {primaryAction.label}
                </Button>
              )}

              {secondaryAction && (
                <Button
                  onClick={secondaryAction.onClick}
                  variant={secondaryAction.variant || "outline"}
                  size={sizeStyles[size].buttonSize}
                  disabled={secondaryAction.disabled}
                >
                  {secondaryAction.icon && (
                    <span className="mr-2">{secondaryAction.icon}</span>
                  )}
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          )}

          {/* Additional Actions */}
          {actions.length > 0 && (
            <div
              className={cn(
                "flex flex-wrap gap-2",
                primaryAction || secondaryAction ? "mt-2" : "mt-4"
              )}
            >
              {actions.map((action, index) => (
                <Button
                  key={index}
                  onClick={action.onClick}
                  variant={action.variant || "ghost"}
                  size={sizeStyles[size].buttonSize}
                  disabled={action.disabled}
                >
                  {action.icon && <span className="mr-2">{action.icon}</span>}
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </CardBase>
  );
}
