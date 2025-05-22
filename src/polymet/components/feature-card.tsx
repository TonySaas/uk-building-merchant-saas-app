import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import CardBase from "@/polymet/components/card-base";

export interface FeatureCardProps {
  className?: string;
  title: string;
  description: string;
  icon?: ReactNode;
  image?: string;
  actionLabel?: string;
  onAction?: () => void;
  learnMoreLabel?: string;
  onLearnMore?: () => void;
  size?: "small" | "medium" | "large";
  variant?: "default" | "centered" | "horizontal" | "minimal";
  color?: "default" | "primary" | "accent" | "muted";
  iconBackground?: boolean;
  bordered?: boolean;
}

export default function FeatureCard({
  className,
  title,
  description,
  icon,
  image,
  actionLabel,
  onAction,
  learnMoreLabel = "Learn more",
  onLearnMore,
  size = "medium",
  variant = "default",
  color = "default",
  iconBackground = true,
  bordered = true,
}: FeatureCardProps) {
  // Size-based styles
  const sizeStyles = {
    small: {
      card: "max-w-[280px]",
      icon: "h-8 w-8",
      iconContainer: "h-12 w-12",
      title: "text-base font-semibold",
      description: "text-xs",
      image: "h-32",
    },
    medium: {
      card: "max-w-[350px]",
      icon: "h-10 w-10",
      iconContainer: "h-16 w-16",
      title: "text-lg font-semibold",
      description: "text-sm",
      image: "h-40",
    },
    large: {
      card: "max-w-[420px]",
      icon: "h-12 w-12",
      iconContainer: "h-20 w-20",
      title: "text-xl font-semibold",
      description: "text-base",
      image: "h-48",
    },
  };

  // Color-based styles
  const colorStyles = {
    default: {
      icon: "text-foreground",
      background: "bg-secondary",
      title: "text-foreground",
    },
    primary: {
      icon: "text-primary",
      background: "bg-primary/10",
      title: "text-primary",
    },
    accent: {
      icon: "text-blue-500 dark:text-blue-400",
      background: "bg-blue-100 dark:bg-blue-900/30",
      title: "text-blue-700 dark:text-blue-400",
    },
    muted: {
      icon: "text-muted-foreground",
      background: "bg-muted",
      title: "text-muted-foreground",
    },
  };

  const renderIcon = () => {
    if (!icon) return null;

    return iconBackground ? (
      <div
        className={cn(
          "flex items-center justify-center rounded-lg mb-4",
          colorStyles[color].background,
          sizeStyles[size].iconContainer,
          variant === "horizontal" ? "mr-4 mb-0" : ""
        )}
      >
        <div className={cn(colorStyles[color].icon, sizeStyles[size].icon)}>
          {icon}
        </div>
      </div>
    ) : (
      <div
        className={cn(
          "mb-4",
          colorStyles[color].icon,
          sizeStyles[size].icon,
          variant === "horizontal" ? "mr-4 mb-0" : ""
        )}
      >
        {icon}
      </div>
    );
  };

  return (
    <CardBase
      className={cn(
        sizeStyles[size].card,
        variant === "minimal" && "shadow-none",
        !bordered && "border-0",
        className
      )}
      elevation={variant === "minimal" ? "none" : "low"}
    >
      {/* Image at the top if present and not horizontal variant */}
      {image && variant !== "horizontal" && (
        <div
          className={cn(
            "w-full bg-muted rounded-t-md overflow-hidden",
            sizeStyles[size].image
          )}
        >
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Content section */}
      <div
        className={cn(
          "flex",
          variant === "horizontal" ? "flex-row items-start" : "flex-col",
          variant === "centered" && "items-center text-center"
        )}
      >
        {/* Icon */}
        {renderIcon()}

        <div className={variant === "horizontal" ? "flex-1" : ""}>
          {/* Title */}
          <h3
            className={cn(
              sizeStyles[size].title,
              variant === "centered" && "text-center",
              colorStyles[color].title
            )}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className={cn(
              "mt-2 text-muted-foreground",
              sizeStyles[size].description,
              variant === "centered" && "text-center"
            )}
          >
            {description}
          </p>

          {/* Action buttons */}
          {(onAction || onLearnMore) && (
            <div
              className={cn(
                "mt-4 flex",
                variant === "centered" && "justify-center",
                variant === "horizontal" && "mt-2"
              )}
            >
              {onAction && (
                <Button
                  onClick={onAction}
                  size={size === "small" ? "sm" : "default"}
                >
                  {actionLabel || "Get Started"}
                </Button>
              )}
              {onLearnMore && (
                <Button
                  variant="link"
                  onClick={onLearnMore}
                  size={size === "small" ? "sm" : "default"}
                  className={onAction ? "ml-2" : ""}
                >
                  {learnMoreLabel}
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Image on the right if horizontal variant */}
        {image && variant === "horizontal" && (
          <div
            className={cn(
              "ml-4 bg-muted rounded-md overflow-hidden flex-shrink-0",
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
      </div>
    </CardBase>
  );
}
