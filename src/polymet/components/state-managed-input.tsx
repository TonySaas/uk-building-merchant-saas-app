import React, { useState, useCallback, forwardRef } from "react";
import { TextInput, TextInputProps } from "@/polymet/components/text-input";

export interface StateValidation {
  isValid: boolean;
  message?: string;
}

export interface StateManagerOptions {
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnMount?: boolean;
  touchOnChange?: boolean;
}

export interface StateTracking {
  isFocused: boolean;
  isTouched: boolean;
  isDirty: boolean;
  isValidated: boolean;
  validationState: StateValidation;
}

export interface StateTrackedInputProps extends Omit<TextInputProps, "error"> {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  validator?: (value: string) => StateValidation;
  stateOptions?: StateManagerOptions;
  onStateChange?: (state: StateTracking) => void;
}

export const StateTrackedInput = forwardRef<
  HTMLInputElement,
  StateTrackedInputProps
>(
  (
    {
      value,
      onChange,
      required = false,
      validator,
      stateOptions = {
        validateOnChange: false,
        validateOnBlur: true,
        validateOnMount: false,
        touchOnChange: false,
      },
      onStateChange,
      ...props
    },
    ref
  ) => {
    // Internal component state
    const [isFocused, setIsFocused] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [isValidated, setIsValidated] = useState(false);
    const [validationState, setValidationState] = useState<StateValidation>({
      isValid: true,
    });

    // Validation function
    const validate = useCallback(
      (currentValue: string): StateValidation => {
        // Required field validation
        if (required && !currentValue.trim()) {
          return { isValid: false, message: "This field is required" };
        }

        // Custom validator if provided
        if (validator) {
          return validator(currentValue);
        }

        return { isValid: true };
      },
      [required, validator]
    );

    // Run validation on mount if configured
    React.useEffect(() => {
      if (stateOptions.validateOnMount) {
        const result = validate(value || "");
        setValidationState(result);
        setIsValidated(true);
      }
    }, []);

    // Notify parent of state changes
    React.useEffect(() => {
      if (onStateChange) {
        onStateChange({
          isFocused,
          isTouched,
          isDirty,
          isValidated,
          validationState,
        });
      }
    }, [
      isFocused,
      isTouched,
      isDirty,
      isValidated,
      validationState,
      onStateChange,
    ]);

    // Derived state
    const showError = isValidated && !validationState.isValid;
    const errorMessage = showError ? validationState.message : undefined;

    // Event handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      onChange(newValue);
      setIsDirty(true);

      if (stateOptions.touchOnChange) {
        setIsTouched(true);
      }

      if (stateOptions.validateOnChange) {
        const result = validate(newValue);
        setValidationState(result);
        setIsValidated(true);
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setIsTouched(true);

      if (stateOptions.validateOnBlur) {
        const result = validate(value || "");
        setValidationState(result);
        setIsValidated(true);
      }

      props.onBlur?.(e);
    };

    return (
      <TextInput
        ref={ref}
        {...props}
        value={value || ""}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={errorMessage}
        required={required}
        success={isValidated && validationState.isValid && isDirty}
      />
    );
  }
);

StateTrackedInput.displayName = "StateTrackedInput";

export default StateTrackedInput;
