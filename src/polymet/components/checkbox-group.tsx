"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon, MinusIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    indeterminate?: boolean;
  }
>(({ className, indeterminate, checked, ...props }, ref) => {
  const innerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (innerRef.current) {
      innerRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  // Combine refs
  React.useImperativeHandle(ref, () => innerRef.current as HTMLButtonElement);

  return (
    <CheckboxPrimitive.Root
      ref={innerRef}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
      )}
      checked={checked}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        {indeterminate ? (
          <MinusIcon className="h-3 w-3" />
        ) : (
          <CheckIcon className="h-3 w-3" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

interface CheckboxOption {
  id: string;
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  values: string[];
  onChange: (values: string[]) => void;
  name?: string;
  className?: string;
  error?: string;
  disabled?: boolean;
  withDescription?: boolean;
  orientation?: "horizontal" | "vertical";
}

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      options,
      values = [],
      onChange,
      name,
      className,
      error,
      disabled = false,
      withDescription = false,
      orientation = "vertical",
    },
    ref
  ) => {
    const handleChange = (checked: boolean, value: string) => {
      if (checked) {
        onChange([...values, value]);
      } else {
        onChange(values.filter((v) => v !== value));
      }
    };

    // Calculate indeterminate state for parent checkbox
    const [selectAllChecked, setSelectAllChecked] = React.useState<
      boolean | "indeterminate"
    >(false);

    React.useEffect(() => {
      if (values.length === 0) {
        setSelectAllChecked(false);
      } else if (values.length === options.filter((o) => !o.disabled).length) {
        setSelectAllChecked(true);
      } else {
        setSelectAllChecked("indeterminate");
      }
    }, [values, options]);

    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        onChange(options.filter((o) => !o.disabled).map((o) => o.value));
      } else {
        onChange([]);
      }
    };

    return (
      <div ref={ref} className={cn("space-y-4", className)}>
        {options.length > 1 && (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`${name}-select-all`}
              checked={selectAllChecked === true}
              indeterminate={selectAllChecked === "indeterminate"}
              onCheckedChange={handleSelectAll}
              disabled={disabled}
            />

            <Label
              htmlFor={`${name}-select-all`}
              className={cn(
                "font-medium",
                disabled ? "opacity-50 cursor-not-allowed" : ""
              )}
            >
              Select All
            </Label>
          </div>
        )}

        <div
          className={cn(
            orientation === "horizontal" ? "flex flex-wrap gap-4" : "space-y-3"
          )}
        >
          {options.map((option) => (
            <div
              key={option.id}
              className={cn(
                "flex items-start",
                orientation === "horizontal" ? "min-w-[200px]" : "",
                option.disabled ? "opacity-50 cursor-not-allowed" : ""
              )}
            >
              <Checkbox
                id={option.id}
                checked={values.includes(option.value)}
                onCheckedChange={(checked) =>
                  handleChange(checked as boolean, option.value)
                }
                disabled={disabled || option.disabled}
                className="mt-1"
                name={name}
                value={option.value}
              />

              <div className="ml-2">
                <Label
                  htmlFor={option.id}
                  className={cn(
                    "font-normal",
                    option.disabled ? "opacity-50 cursor-not-allowed" : ""
                  )}
                >
                  {option.label}
                </Label>
                {withDescription && option.description && (
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {error && <p className="text-xs font-medium text-red-500">{error}</p>}
      </div>
    );
  }
);
CheckboxGroup.displayName = "CheckboxGroup";

export { Checkbox, CheckboxGroup };
