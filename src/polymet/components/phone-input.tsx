import React, { forwardRef, useState } from "react";
import { InputBase, InputBaseProps } from "@/polymet/components/input-base";
import { PhoneIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PhoneInputProps
  extends Omit<InputBaseProps, "type" | "startIcon"> {
  defaultCountryCode?: string;
  showCountryCode?: boolean;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
}

// A simplified list of country codes
const countryCodes = [
  { code: "+1", country: "US" },
  { code: "+44", country: "UK" },
  { code: "+49", country: "DE" },
  { code: "+33", country: "FR" },
  { code: "+61", country: "AU" },
  { code: "+86", country: "CN" },
  { code: "+91", country: "IN" },
  { code: "+81", country: "JP" },
  { code: "+7", country: "RU" },
  { code: "+55", country: "BR" },
];

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      defaultCountryCode = "+1",
      showCountryCode = true,
      validateOnBlur = true,
      validateOnChange = false,
      error,
      onBlur,
      onChange,
      className,
      ...props
    },
    ref
  ) => {
    const [countryCode, setCountryCode] = useState(defaultCountryCode);
    const [showDropdown, setShowDropdown] = useState(false);
    const [validationError, setValidationError] = useState<string | undefined>(
      undefined
    );

    // Simple phone validation - checks for minimum digits after country code
    const validatePhone = (phone: string): boolean => {
      if (!phone) return true; // Empty is not invalid, just incomplete
      // Remove common formatting characters
      const digitsOnly = phone.replace(/[-()\s]/g, "");
      // Check if we have at least 7 digits (very basic check)
      return digitsOnly.length >= 7;
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);

      if (validateOnBlur && e.target.value) {
        const isValid = validatePhone(e.target.value);
        setValidationError(
          isValid ? undefined : "Please enter a valid phone number"
        );
      }

      // Close dropdown when input loses focus
      setTimeout(() => {
        setShowDropdown(false);
      }, 200);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);

      if (validateOnChange && e.target.value) {
        const isValid = validatePhone(e.target.value);
        setValidationError(
          isValid ? undefined : "Please enter a valid phone number"
        );
      } else if (validateOnChange && !e.target.value) {
        setValidationError(undefined);
      }
    };

    const selectCountryCode = (code: string) => {
      setCountryCode(code);
      setShowDropdown(false);
    };

    // Use provided error or validation error
    const displayError = error || validationError;

    const countryCodeSelector = showCountryCode ? (
      <div className="absolute left-0 top-0 h-full flex items-center">
        <div
          className="flex items-center h-full px-3 border-r border-input cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span className="text-sm mr-1">{countryCode}</span>
          <ChevronDownIcon className="h-3 w-3 text-muted-foreground" />
        </div>

        {showDropdown && (
          <div className="absolute top-full left-0 mt-1 w-32 max-h-48 overflow-y-auto z-50 bg-background border border-input rounded-md shadow-md">
            {countryCodes.map((item) => (
              <div
                key={item.code}
                className="px-3 py-2 hover:bg-accent cursor-pointer text-sm flex items-center"
                onClick={() => selectCountryCode(item.code)}
              >
                <span className="mr-2">{item.code}</span>
                <span className="text-muted-foreground">{item.country}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    ) : null;

    return (
      <InputBase
        ref={ref}
        type="tel"
        startIcon={showCountryCode ? null : <PhoneIcon className="h-4 w-4" />}
        error={displayError}
        onBlur={handleBlur}
        onChange={handleChange}
        className={cn(showCountryCode ? "pl-16" : "", className)}
        {...props}
      >
        {countryCodeSelector}
      </InputBase>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
