import React, { forwardRef, useState, useEffect } from "react";
import { InputBase, InputBaseProps } from "@/polymet/components/input-base";
import { PlusIcon, MinusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NumberInputProps extends Omit<InputBaseProps, "type"> {
  min?: number;
  max?: number;
  step?: number;
  allowDecimals?: boolean;
  showControls?: boolean;
  controlsPosition?: "right" | "both-sides";
  value?: number | string;
  defaultValue?: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (value: number) => void;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      min,
      max,
      step = 1,
      allowDecimals = true,
      showControls = true,
      controlsPosition = "right",
      value,
      defaultValue,
      onChange,
      onValueChange,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<string>(
      value !== undefined
        ? value.toString()
        : defaultValue !== undefined
          ? defaultValue.toString()
          : ""
    );

    // Update internal value when controlled value changes
    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value.toString());
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;

      // Handle empty input
      if (newValue === "") {
        setInternalValue("");
        onChange?.(e);
        onValueChange?.(0);
        return;
      }

      // Allow only numbers and a single decimal point if decimals are allowed
      const regex = allowDecimals ? /^-?\d*\.?\d*$/ : /^-?\d*$/;
      if (!regex.test(newValue)) {
        return;
      }

      setInternalValue(newValue);
      onChange?.(e);

      const numericValue = parseFloat(newValue);
      if (!isNaN(numericValue)) {
        onValueChange?.(numericValue);
      }
    };

    const increment = () => {
      if (disabled) return;

      const currentValue = internalValue === "" ? 0 : parseFloat(internalValue);
      if (isNaN(currentValue)) return;

      let newValue = currentValue + step;
      if (max !== undefined && newValue > max) {
        newValue = max;
      }

      setInternalValue(newValue.toString());
      onValueChange?.(newValue);

      // Create a synthetic event for onChange
      const syntheticEvent = {
        target: { value: newValue.toString() },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);
    };

    const decrement = () => {
      if (disabled) return;

      const currentValue = internalValue === "" ? 0 : parseFloat(internalValue);
      if (isNaN(currentValue)) return;

      let newValue = currentValue - step;
      if (min !== undefined && newValue < min) {
        newValue = min;
      }

      setInternalValue(newValue.toString());
      onValueChange?.(newValue);

      // Create a synthetic event for onChange
      const syntheticEvent = {
        target: { value: newValue.toString() },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);
    };

    const renderControls = () => {
      if (!showControls) return null;

      const buttonClasses =
        "flex items-center justify-center h-full w-8 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors";
      const disabledClasses = "opacity-50 cursor-not-allowed";

      const incrementDisabled =
        max !== undefined && parseFloat(internalValue || "0") >= max;
      const decrementDisabled =
        min !== undefined && parseFloat(internalValue || "0") <= min;

      if (controlsPosition === "right") {
        return (
          <div className="absolute right-0 top-0 h-full flex flex-col border-l border-input">
            <button
              type="button"
              className={cn(
                buttonClasses,
                "rounded-tr-md border-b border-input",
                incrementDisabled || disabled ? disabledClasses : ""
              )}
              onClick={increment}
              disabled={incrementDisabled || disabled}
              tabIndex={-1}
            >
              <PlusIcon className="h-3 w-3" />
            </button>
            <button
              type="button"
              className={cn(
                buttonClasses,
                "rounded-br-md",
                decrementDisabled || disabled ? disabledClasses : ""
              )}
              onClick={decrement}
              disabled={decrementDisabled || disabled}
              tabIndex={-1}
            >
              <MinusIcon className="h-3 w-3" />
            </button>
          </div>
        );
      }

      return (
        <>
          <button
            type="button"
            className={cn(
              "absolute left-0 top-0 h-full w-8 flex items-center justify-center rounded-l-md border-r border-input",
              "text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
              decrementDisabled || disabled ? disabledClasses : ""
            )}
            onClick={decrement}
            disabled={decrementDisabled || disabled}
            tabIndex={-1}
          >
            <MinusIcon className="h-3 w-3" />
          </button>
          <button
            type="button"
            className={cn(
              "absolute right-0 top-0 h-full w-8 flex items-center justify-center rounded-r-md border-l border-input",
              "text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
              incrementDisabled || disabled ? disabledClasses : ""
            )}
            onClick={increment}
            disabled={incrementDisabled || disabled}
            tabIndex={-1}
          >
            <PlusIcon className="h-3 w-3" />
          </button>
        </>
      );
    };

    return (
      <InputBase
        ref={ref}
        type="text"
        inputMode="decimal"
        value={internalValue}
        onChange={handleChange}
        className={cn(
          showControls && controlsPosition === "right" ? "pr-8" : "",
          showControls && controlsPosition === "both-sides" ? "px-10" : "",
          className
        )}
        disabled={disabled}
        {...props}
        endIcon={null} // We'll handle our own end content
      >
        {renderControls()}
      </InputBase>
    );
  }
);

NumberInput.displayName = "NumberInput";

export { NumberInput };
