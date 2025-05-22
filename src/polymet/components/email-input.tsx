import React, { forwardRef, useState } from "react";
import { InputBase, InputBaseProps } from "@/polymet/components/input-base";
import { MailIcon } from "lucide-react";

export interface EmailInputProps extends Omit<InputBaseProps, "type"> {
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
}

const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  (
    {
      validateOnBlur = true,
      validateOnChange = false,
      error,
      onBlur,
      onChange,
      startIcon = <MailIcon className="h-4 w-4" />,

      ...props
    },
    ref
  ) => {
    const [validationError, setValidationError] = useState<string | undefined>(
      undefined
    );

    // Simple email validation regex
    const validateEmail = (email: string): boolean => {
      if (!email) return true; // Empty is not invalid, just incomplete
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);

      if (validateOnBlur && e.target.value) {
        const isValid = validateEmail(e.target.value);
        setValidationError(
          isValid ? undefined : "Please enter a valid email address"
        );
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);

      if (validateOnChange && e.target.value) {
        const isValid = validateEmail(e.target.value);
        setValidationError(
          isValid ? undefined : "Please enter a valid email address"
        );
      } else if (validateOnChange && !e.target.value) {
        setValidationError(undefined);
      }
    };

    // Use provided error or validation error
    const displayError = error || validationError;

    return (
      <InputBase
        ref={ref}
        type="email"
        startIcon={startIcon}
        error={displayError}
        onBlur={handleBlur}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

EmailInput.displayName = "EmailInput";

export { EmailInput };
