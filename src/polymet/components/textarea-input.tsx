import React, { forwardRef, useState, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { AlertCircleIcon, CheckCircleIcon } from "lucide-react";

export interface TextareaInputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  floatingLabel?: boolean;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  helperTextClassName?: string;
  rows?: number;
  maxLength?: number;
  showCharacterCount?: boolean;
}

const TextareaInput = forwardRef<HTMLTextAreaElement, TextareaInputProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      floatingLabel = true,
      className,
      containerClassName,
      labelClassName,
      helperTextClassName,
      disabled,
      required,
      id,
      rows = 4,
      maxLength,
      showCharacterCount = false,
      onChange,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [filled, setFilled] = useState(!!value || !!defaultValue);
    const [charCount, setCharCount] = useState(
      (value?.toString() || defaultValue?.toString() || "").length
    );

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setFocused(false);
      setFilled(!!e.target.value);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFilled(!!e.target.value);
      setCharCount(e.target.value.length);
      onChange?.(e);
    };

    const inputId =
      id || `textarea-${label?.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <div className={cn("relative w-full", containerClassName)}>
        {label && floatingLabel && (
          <label
            htmlFor={inputId}
            className={cn(
              "absolute left-3 transition-all duration-200 pointer-events-none",
              focused || filled
                ? "-top-2 text-xs px-1 bg-background z-10"
                : "top-3 text-sm",
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
          <textarea
            id={inputId}
            ref={ref}
            disabled={disabled}
            required={required}
            rows={rows}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            className={cn(
              "w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background",
              "placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "resize-y",
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

          {(error || success) && (
            <div className="absolute right-3 top-3">
              {error && <AlertCircleIcon className="h-5 w-5 text-red-500" />}
              {success && !error && (
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between mt-1">
          {(helperText || error) && (
            <div
              className={cn(
                "text-xs",
                error ? "text-red-500" : "text-muted-foreground",
                helperTextClassName
              )}
            >
              {error || helperText}
            </div>
          )}

          {showCharacterCount && maxLength && (
            <div
              className={cn(
                "text-xs ml-auto text-muted-foreground",
                charCount >= maxLength ? "text-red-500" : ""
              )}
            >
              {charCount}/{maxLength}
            </div>
          )}
        </div>
      </div>
    );
  }
);

TextareaInput.displayName = "TextareaInput";

export { TextareaInput };
