"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & {
    orientation?: "horizontal" | "vertical";
  }
>(({ className, orientation = "vertical", ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn(
        "grid gap-2",
        orientation === "horizontal"
          ? "grid-flow-col auto-cols-max"
          : "grid-flow-row",
        className
      )}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <div className="h-2.5 w-2.5 rounded-full bg-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

interface RadioOption {
  id: string;
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

interface RadioGroupWithLabelProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
  error?: string;
  disabled?: boolean;
  withDescription?: boolean;
}

const RadioGroupWithLabel = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupWithLabelProps
>(
  (
    {
      options,
      value,
      onChange,
      name,
      orientation = "vertical",
      className,
      error,
      disabled = false,
      withDescription = false,
    },
    ref
  ) => {
    const handleChange = (val: string) => {
      if (onChange) {
        onChange(val);
      }
    };

    return (
      <div className={cn("space-y-3", className)}>
        <RadioGroup
          ref={ref}
          value={value}
          onValueChange={handleChange}
          name={name}
          orientation={orientation}
          className={cn(
            "mt-2",
            orientation === "horizontal" ? "space-x-6" : "space-y-3"
          )}
          disabled={disabled}
        >
          {options.map((option) => (
            <div
              key={option.id}
              className={cn(
                "flex items-start",
                orientation === "horizontal"
                  ? "flex-col space-y-2"
                  : "space-x-2",
                option.disabled ? "opacity-50 cursor-not-allowed" : ""
              )}
            >
              <div
                className={cn(
                  "flex items-center",
                  orientation === "horizontal" ? "flex-row space-x-2" : ""
                )}
              >
                <RadioGroupItem
                  value={option.value}
                  id={option.id}
                  disabled={disabled || option.disabled}
                  className="mt-1"
                />

                <Label
                  htmlFor={option.id}
                  className={cn(
                    "font-normal",
                    option.disabled ? "opacity-50 cursor-not-allowed" : ""
                  )}
                >
                  {option.label}
                </Label>
              </div>
              {withDescription && option.description && (
                <div
                  className={cn(
                    "text-sm text-muted-foreground",
                    orientation === "horizontal" ? "pl-6" : "pl-6"
                  )}
                >
                  {option.description}
                </div>
              )}
            </div>
          ))}
        </RadioGroup>
        {error && <p className="text-xs font-medium text-red-500">{error}</p>}
      </div>
    );
  }
);
RadioGroupWithLabel.displayName = "RadioGroupWithLabel";

export { RadioGroup, RadioGroupItem, RadioGroupWithLabel };
