import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface CardBaseProps {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  interactive?: boolean;
  elevation?: "none" | "low" | "medium" | "high";
  padding?: "none" | "small" | "medium" | "large";
  border?: boolean;
  rounded?: "none" | "small" | "medium" | "large" | "full";
  width?: "auto" | "full" | "fixed";
  fixedWidth?: string;
  height?: "auto" | "full" | "fixed";
  fixedHeight?: string;
}

export default function CardBase({
  className,
  children,
  onClick,
  interactive = false,
  elevation = "low",
  padding = "medium",
  border = true,
  rounded = "medium",
  width = "full",
  fixedWidth,
  height = "auto",
  fixedHeight,
}: CardBaseProps) {
  // Elevation styles
  const elevationStyles = {
    none: "",
    low: "shadow-sm",
    medium: "shadow-md",
    high: "shadow-lg",
  };

  // Padding styles
  const paddingStyles = {
    none: "p-0",
    small: "p-2",
    medium: "p-4",
    large: "p-6",
  };

  // Rounded styles
  const roundedStyles = {
    none: "rounded-none",
    small: "rounded-sm",
    medium: "rounded-md",
    large: "rounded-lg",
    full: "rounded-full",
  };

  // Width styles
  const widthStyles = {
    auto: "w-auto",
    full: "w-full",
    fixed: fixedWidth ? fixedWidth : "w-80",
  };

  // Height styles
  const heightStyles = {
    auto: "h-auto",
    full: "h-full",
    fixed: fixedHeight ? fixedHeight : "h-80",
  };

  return (
    <div
      className={cn(
        "bg-card text-card-foreground",
        border && "border border-border",
        elevationStyles[elevation],
        paddingStyles[padding],
        roundedStyles[rounded],
        widthStyles[width],
        heightStyles[height],
        interactive &&
          "transition-all duration-200 hover:shadow-md active:shadow-sm active:scale-[0.99]",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
