import React, { forwardRef, useState, useId } from "react";
import { InputBase, InputBaseProps } from "@/polymet/components/input-base";

export interface TextInputAccessibleProps extends InputBaseProps {
  // Additional accessibility props
  ariaDescribedBy?: string;
  ariaErrorMessage?: string;
  ariaLabel?: string;
}

const TextInputAccessible = forwardRef<
  HTMLInputElement,
  TextInputAccessibleProps
>(
  (
    {
      type = "text",
      id: propId,
      label,
      error,
      helperText,
      required,
      disabled,
      ariaDescribedBy,
      ariaErrorMessage,
      ariaLabel,
      ...props
    },
    ref
  ) => {
    // Generate unique IDs for accessibility if not provided
    const uniqueId = useId();
    const id = propId || `text-input-${uniqueId}`;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;

    // Determine which element describes the input
    const describedBy = error
      ? ariaErrorMessage || errorId
      : helperText
        ? ariaDescribedBy || helperId
        : undefined;

    return (
      <div className="w-full">
        <InputBase
          ref={ref}
          type={type}
          id={id}
          label={label}
          error={error}
          helperText={helperText}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          aria-required={required || undefined}
          aria-disabled={disabled || undefined}
          aria-label={ariaLabel}
          {...props}
        />

        {/* Hidden elements for screen readers if needed */}
        {!helperText && !error && describedBy && (
          <div id={describedBy} className="sr-only">
            {ariaDescribedBy ? ariaDescribedBy : `Input field for ${label}`}
          </div>
        )}
      </div>
    );
  }
);

TextInputAccessible.displayName = "TextInputAccessible";

export { TextInputAccessible };
