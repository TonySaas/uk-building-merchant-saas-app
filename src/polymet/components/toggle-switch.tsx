"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

interface ToggleSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  error?: string;
  id?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  labelPosition?: "left" | "right";
}

const ToggleSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  ToggleSwitchProps
>(
  (
    {
      checked,
      onCheckedChange,
      label,
      description,
      disabled,
      error,
      id = "toggle-switch",
      className,
      size = "md",
      labelPosition = "right",
    },
    ref
  ) => {
    const switchSizeClasses = {
      sm: "h-4 w-8",
      md: "h-6 w-11",
      lg: "h-7 w-14",
    };

    const thumbSizeClasses = {
      sm: "h-3 w-3 data-[state=checked]:translate-x-4",
      md: "h-5 w-5 data-[state=checked]:translate-x-5",
      lg: "h-6 w-6 data-[state=checked]:translate-x-7",
    };

    return (
      <div className={cn("flex flex-col space-y-1", className)}>
        <div
          className={cn(
            "flex items-center",
            labelPosition === "left"
              ? "flex-row-reverse justify-end space-x-reverse space-x-2"
              : "space-x-2"
          )}
        >
          <Switch
            ref={ref}
            id={id}
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
            className={switchSizeClasses[size]}
            data-state={checked ? "checked" : "unchecked"}
          >
            <SwitchPrimitives.Thumb className={thumbSizeClasses[size]} />
          </Switch>

          {label && (
            <div>
              <Label
                htmlFor={id}
                className={cn(
                  "font-medium",
                  disabled ? "opacity-50 cursor-not-allowed" : ""
                )}
              >
                {label}
              </Label>
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          )}
        </div>

        {error && <p className="text-xs font-medium text-red-500">{error}</p>}
      </div>
    );
  }
);
ToggleSwitch.displayName = "ToggleSwitch";

interface ToggleSwitchGroupProps {
  options: {
    id: string;
    label: string;
    description?: string;
    disabled?: boolean;
  }[];
  values: Record<string, boolean>;
  onChange: (id: string, checked: boolean) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  labelPosition?: "left" | "right";
}

const ToggleSwitchGroup = React.forwardRef<
  HTMLDivElement,
  ToggleSwitchGroupProps
>(
  (
    {
      options,
      values,
      onChange,
      className,
      size = "md",
      labelPosition = "right",
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("space-y-4", className)}>
        {options.map((option) => (
          <ToggleSwitch
            key={option.id}
            id={option.id}
            checked={values[option.id] || false}
            onCheckedChange={(checked) => onChange(option.id, checked)}
            label={option.label}
            description={option.description}
            disabled={option.disabled}
            size={size}
            labelPosition={labelPosition}
          />
        ))}
      </div>
    );
  }
);
ToggleSwitchGroup.displayName = "ToggleSwitchGroup";

export { Switch, ToggleSwitch, ToggleSwitchGroup };
