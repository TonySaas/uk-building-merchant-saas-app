import React, { useState } from "react";
import { TextInput } from "@/polymet/components/text-input";
import { EmailInput } from "@/polymet/components/email-input";
import { PasswordInput } from "@/polymet/components/password-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/polymet/components/checkbox-group";
import { Label } from "@/components/ui/label";

interface RegistrationFormProps {
  onSubmit?: (data: any) => void;
  loading?: boolean;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    acceptTerms?: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when field is edited
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    // Special validation for confirm password
    if (
      name === "confirmPassword" ||
      (name === "password" && formData.confirmPassword)
    ) {
      if (name === "confirmPassword" && value !== formData.password) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      } else if (name === "password" && value !== formData.confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
      acceptTerms?: string;
    } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm() && onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          required
        />

        <TextInput
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          required
        />
      </div>

      <EmailInput
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />

      <PasswordInput
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        strengthIndicator
        required
      />

      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        required
      />

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          name="acceptTerms"
          checked={formData.acceptTerms}
          onCheckedChange={(checked) => {
            setFormData((prev) => ({ ...prev, acceptTerms: !!checked }));
            if (errors.acceptTerms) {
              setErrors((prev) => ({ ...prev, acceptTerms: undefined }));
            }
          }}
        />

        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor="terms"
            className={`text-sm ${
              errors.acceptTerms ? "text-destructive" : ""
            }`}
          >
            I accept the{" "}
            <a
              href="#"
              className="text-primary underline hover:text-primary/90"
            >
              terms and conditions
            </a>
          </Label>
          {errors.acceptTerms && (
            <p className="text-xs text-destructive">{errors.acceptTerms}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
};

export default RegistrationForm;
