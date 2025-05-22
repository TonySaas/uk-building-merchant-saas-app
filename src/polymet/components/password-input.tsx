import React, { forwardRef, useState } from "react";
import { InputBase, InputBaseProps } from "@/polymet/components/input-base";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export interface PasswordInputProps
  extends Omit<InputBaseProps, "type" | "endIcon"> {
  showToggle?: boolean;
  strengthIndicator?: boolean;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showToggle = true, strengthIndicator = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState<number>(0);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      props.onChange?.(e);

      if (strengthIndicator) {
        const password = e.target.value;
        calculatePasswordStrength(password);
      }
    };

    const calculatePasswordStrength = (password: string) => {
      // Simple password strength calculation
      let score = 0;

      if (!password) {
        setStrength(0);
        return;
      }

      // Length check
      if (password.length >= 8) score += 1;
      if (password.length >= 12) score += 1;

      // Complexity checks
      if (/[A-Z]/.test(password)) score += 1; // Has uppercase
      if (/[a-z]/.test(password)) score += 1; // Has lowercase
      if (/[0-9]/.test(password)) score += 1; // Has number
      if (/[^A-Za-z0-9]/.test(password)) score += 1; // Has special char

      // Normalize to 0-4 range
      score = Math.min(4, score);
      setStrength(score);
    };

    const getStrengthLabel = () => {
      if (strength === 0) return "No password";
      if (strength === 1) return "Very weak";
      if (strength === 2) return "Weak";
      if (strength === 3) return "Medium";
      return "Strong";
    };

    const getStrengthColor = () => {
      if (strength === 0) return "bg-gray-200 dark:bg-gray-700";
      if (strength === 1) return "bg-red-500";
      if (strength === 2) return "bg-orange-500";
      if (strength === 3) return "bg-yellow-500";
      return "bg-green-500";
    };

    const passwordToggleIcon = showToggle ? (
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="flex items-center justify-center focus:outline-none"
        tabIndex={-1}
      >
        {showPassword ? (
          <EyeOffIcon className="h-4 w-4" />
        ) : (
          <EyeIcon className="h-4 w-4" />
        )}
      </button>
    ) : null;

    return (
      <div className="space-y-1">
        <InputBase
          ref={ref}
          type={showPassword ? "text" : "password"}
          endIcon={passwordToggleIcon}
          onChange={handleChange}
          {...props}
        />

        {strengthIndicator && props.value && (
          <div className="mt-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">
                Password strength:{" "}
                <span className="font-medium">{getStrengthLabel()}</span>
              </span>
            </div>
            <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                style={{ width: `${(strength / 4) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
