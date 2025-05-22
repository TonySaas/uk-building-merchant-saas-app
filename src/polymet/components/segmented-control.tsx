"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface SegmentedControlOption {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  variant?: "default" | "outline" | "ghost";
}

const SegmentedControl = React.forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(
  (
    {
      options,
      value,
      onChange,
      className,
      disabled = false,
      size = "md",
      fullWidth = false,
      variant = "default",
    },
    ref
  ) => {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = React.useState({
      width: 0,
      height: 0,
      left: 0,
    });

    const selectedIndex = React.useMemo(() => {
      return options.findIndex((option) => option.value === value);
    }, [options, value]);

    React.useEffect(() => {
      if (containerRef.current && selectedIndex !== -1) {
        const selectedElement = containerRef.current.children[
          selectedIndex
        ] as HTMLElement;
        if (selectedElement) {
          setDimensions({
            width: selectedElement.offsetWidth,
            height: selectedElement.offsetHeight,
            left: selectedElement.offsetLeft,
          });
        }
      }
    }, [selectedIndex, options, value]);

    // Update dimensions on window resize
    React.useEffect(() => {
      const handleResize = () => {
        if (containerRef.current && selectedIndex !== -1) {
          const selectedElement = containerRef.current.children[
            selectedIndex
          ] as HTMLElement;
          if (selectedElement) {
            setDimensions({
              width: selectedElement.offsetWidth,
              height: selectedElement.offsetHeight,
              left: selectedElement.offsetLeft,
            });
          }
        }
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [selectedIndex]);

    const sizeClasses = {
      sm: "text-xs h-8",
      md: "text-sm h-10",
      lg: "text-base h-12",
    };

    const variantClasses = {
      default: "bg-muted border border-border",
      outline: "bg-background border border-input",
      ghost: "bg-transparent",
    };

    const handleOptionClick = (
      optionValue: string,
      optionDisabled: boolean = false
    ) => {
      if (!disabled && !optionDisabled && optionValue !== value) {
        onChange(optionValue);
      }
    };

    return (
      <div
        ref={ref}
        className={cn("relative", fullWidth ? "w-full" : "w-fit", className)}
      >
        <div
          ref={containerRef}
          className={cn(
            "relative flex rounded-md overflow-hidden",
            variantClasses[variant],
            fullWidth ? "w-full" : "w-fit",
            disabled ? "opacity-50 cursor-not-allowed" : ""
          )}
        >
          {/* Selected background */}
          {selectedIndex !== -1 && (
            <motion.div
              className="absolute top-0 rounded-md bg-background shadow-sm border border-input"
              initial={false}
              animate={{
                width: dimensions.width,
                height: dimensions.height,
                left: dimensions.left,
              }}
              transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
            />
          )}

          {/* Options */}
          {options.map((option, index) => (
            <button
              key={option.value}
              type="button"
              className={cn(
                "relative z-10 flex items-center justify-center gap-2 px-4 py-2 transition-colors",
                sizeClasses[size],
                fullWidth ? "flex-1" : "",
                value === option.value
                  ? "text-foreground font-medium"
                  : "text-muted-foreground",
                hoveredIndex === index && value !== option.value
                  ? "bg-muted/50"
                  : "",
                option.disabled || disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              )}
              onClick={() => handleOptionClick(option.value, option.disabled)}
              onMouseEnter={() =>
                !option.disabled && !disabled && setHoveredIndex(index)
              }
              onMouseLeave={() => setHoveredIndex(null)}
              disabled={option.disabled || disabled}
            >
              {option.icon && <span className="h-4 w-4">{option.icon}</span>}
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  }
);
SegmentedControl.displayName = "SegmentedControl";

export { SegmentedControl };
