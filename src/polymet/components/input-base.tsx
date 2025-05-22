import React, { useState, forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import {
  EyeIcon,
  EyeOffIcon,
  AlertCircleIcon,
  CheckCircleIcon,
} from "lucide-react";

export interface InputBaseProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  floatingLabel?: boolean;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  helperTextClassName?: string;
  children?: React.ReactNode;
}

const InputBase = forwardRef<HTMLInputElement, InputBaseProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      startIcon,
      endIcon,
      floatingLabel = true,
      className,
      containerClassName,
      labelClassName,
      helperTextClassName,
      disabled,
      required,
      id,
      children,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [filled, setFilled] = useState(!!props.value || !!props.defaultValue);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      setFilled(!!e.target.value);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilled(!!e.target.value);
      props.onChange?.(e);
    };

    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <div className={cn("relative w-full", containerClassName)}>
        {label && floatingLabel && (
          <label
            htmlFor={inputId}
            className={cn(
              "absolute left-3 transition-all duration-200 pointer-events-none",
              focused || filled
                ? "-top-2 text-xs px-1 bg-background z-10"
                : "top-1/2 -translate-y-1/2 text-sm",
              focused
                ? "text-blue-600 dark:text-blue-400"
                : "text-muted-foreground",
              error ? "text-red-500" : "",
              success ? "text-green-500" : "",
              disabled ? "text-muted-foreground opacity-60" : "",
              labelClassName
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {label && !floatingLabel && (
          <label
            htmlFor={inputId}
            className={cn(
              "block mb-2 text-sm font-medium",
              error ? "text-red-500" : "",
              success ? "text-green-500" : "",
              disabled ? "text-muted-foreground opacity-60" : "",
              labelClassName
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {startIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            required={required}
            className={cn(
              "w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background",
              "placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              startIcon ? "pl-10" : "",
              endIcon || error || success ? "pr-10" : "",
              error ? "border-red-500 focus-visible:ring-red-500" : "",
              success ? "border-green-500 focus-visible:ring-green-500" : "",
              focused && !error && !success
                ? "border-blue-600 dark:border-blue-400"
                : "",
              className
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />

          {(error || success) && !endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {error && <AlertCircleIcon className="h-5 w-5 text-red-500" />}
              {success && !error && (
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
              )}
            </div>
          )}

          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {endIcon}
            </div>
          )}

          {children}
        </div>

        {(helperText || error) && (
          <div
            className={cn(
              "mt-1 text-xs",
              error ? "text-red-500" : "text-muted-foreground",
              helperTextClassName
            )}
          >
            {error || helperText}
          </div>
        )}
      </div>
    );
  }
);

InputBase.displayName = "InputBase";

export { InputBase };
