import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Check, Eye, EyeOff } from "lucide-react";
import { EmailInput } from "@/polymet/components/email-input";
import { PasswordInput } from "@/polymet/components/password-input";

interface FormValidatorProps {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => Promise<void>;
  title?: string;
  submitButtonText?: string;
  loading?: boolean;
  maxErrorRetries?: number;
}

type FormFieldType =
  | "text"
  | "email"
  | "password"
  | "checkbox"
  | "checkbox-group";

interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  value: any;
  minLength?: number;
  maxLength?: number;
  minItems?: number;
  maxItems?: number;
  options?: {
    id: string;
    label: string;
    value: string;
    description?: string;
    disabled?: boolean;
  }[];
}

export default function FormValidator({
  fields,
  onSubmit,
  title = "Form",
  submitButtonText = "Submit",
  loading = false,
  maxErrorRetries = 3,
}: FormValidatorProps) {
  const [formData, setFormData] = useState<Record<string, any>>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: field.value }), {})
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitCount, setSubmitCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const validateField = (field: FormField, value: any): string => {
    if (
      field.required &&
      (value === "" ||
        value === false ||
        (Array.isArray(value) && value.length === 0))
    ) {
      return `${field.label} is required`;
    }

    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address";
      }
    }

    if (field.type === "password" && value && field.minLength) {
      if (value.length < field.minLength) {
        return `Password must be at least ${field.minLength} characters`;
      }
    }

    if (
      field.type === "checkbox-group" &&
      field.minItems &&
      Array.isArray(value)
    ) {
      if (value.length < field.minItems) {
        return `Please select at least ${field.minItems} options`;
      }
    }

    if (
      field.type === "checkbox-group" &&
      field.maxItems &&
      Array.isArray(value)
    ) {
      if (value.length > field.maxItems) {
        return `Please select no more than ${field.maxItems} options`;
      }
    }

    return "";
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    fields.forEach((field) => {
      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Clear error when field is changed
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (field: FormField) => {
    const error = validateField(field, formData[field.name]);
    if (error) {
      setErrors((prev) => ({ ...prev, [field.name]: error }));
    }
  };

  const handleCheckboxGroupChange = (
    fieldName: string,
    itemValue: string,
    checked: boolean
  ) => {
    const currentValues = Array.isArray(formData[fieldName])
      ? [...formData[fieldName]]
      : [];

    if (checked) {
      if (!currentValues.includes(itemValue)) {
        handleChange(fieldName, [...currentValues, itemValue]);
      }
    } else {
      handleChange(
        fieldName,
        currentValues.filter((v) => v !== itemValue)
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitting) return;

    const isValid = validateForm();
    if (!isValid) {
      // Mark all fields as touched to show errors
      const allTouched = fields.reduce(
        (acc, field) => ({ ...acc, [field.name]: true }),
        {}
      );
      setTouched(allTouched);
      return;
    }

    if (submitCount >= maxErrorRetries) {
      setErrors({
        form: `Maximum submission attempts (${maxErrorRetries}) reached. Please try again later.`,
      });
      return;
    }

    setSubmitting(true);
    setSubmitCount((prev) => prev + 1);

    try {
      await onSubmit(formData);
      // Reset submit count on success
      setSubmitCount(0);
    } catch (error) {
      console.error("Form submission error:", error);
      setErrors({
        form: "An error occurred while submitting the form. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const hasError = !!errors[field.name] && touched[field.name];

    switch (field.type) {
      case "text":
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            <Input
              id={field.name}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              onBlur={() => handleBlur(field)}
              className={hasError ? "border-destructive" : ""}
              disabled={submitting || loading}
            />

            {hasError && (
              <p className="text-destructive text-sm flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />

                {errors[field.name]}
              </p>
            )}
          </div>
        );

      case "email":
        return (
          <div className="space-y-2" key={field.name}>
            <EmailInput
              label={field.label + (field.required ? "*" : "")}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              onBlur={() => handleBlur(field)}
              error={hasError ? errors[field.name] : undefined}
              disabled={submitting || loading}
              required={field.required}
              validateOnBlur
            />
          </div>
        );

      case "password":
        return (
          <div className="space-y-2" key={field.name}>
            <PasswordInput
              label={field.label + (field.required ? "*" : "")}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              onBlur={() => handleBlur(field)}
              error={hasError ? errors[field.name] : undefined}
              disabled={submitting || loading}
              required={field.required}
              strengthIndicator
            />
          </div>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2" key={field.name}>
            <Checkbox
              id={field.name}
              checked={!!formData[field.name]}
              onCheckedChange={(checked) => handleChange(field.name, !!checked)}
              disabled={submitting || loading}
            />

            <Label htmlFor={field.name} className="text-sm font-normal">
              {field.label}
              {field.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            {hasError && (
              <p className="text-destructive text-sm flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />

                {errors[field.name]}
              </p>
            )}
          </div>
        );

      case "checkbox-group":
        return (
          <div className="space-y-2" key={field.name}>
            <Label>
              {field.label}
              {field.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Label>
            <div className="space-y-2">
              {field.options?.map((option) => (
                <div key={option.id} className="flex items-start space-x-2">
                  <Checkbox
                    id={`${field.name}-${option.id}`}
                    checked={
                      Array.isArray(formData[field.name]) &&
                      formData[field.name].includes(option.value)
                    }
                    onCheckedChange={(checked) =>
                      handleCheckboxGroupChange(
                        field.name,
                        option.value,
                        !!checked
                      )
                    }
                    disabled={submitting || loading || option.disabled}
                  />

                  <div>
                    <Label
                      htmlFor={`${field.name}-${option.id}`}
                      className="text-sm font-normal"
                    >
                      {option.label}
                    </Label>
                    {option.description && (
                      <p className="text-xs text-muted-foreground">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {hasError && (
              <p className="text-destructive text-sm flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />

                {errors[field.name]}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {fields.map(renderField)}

          {errors.form && (
            <div className="bg-destructive/10 p-3 rounded-md border border-destructive/20">
              <p className="text-destructive text-sm flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />

                {errors.form}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={submitting || loading}>
            {loading || submitting ? "Processing..." : submitButtonText}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
