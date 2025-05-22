import React, { useState, useCallback } from "react";
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
import { AlertCircleIcon, CheckCircleIcon } from "lucide-react";
import FormErrorHandler from "@/polymet/components/form-error-handler";

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "checkbox";
  required?: boolean;
  minLength?: number;
  pattern?: RegExp;
  patternMessage?: string;
  value: string | boolean;
}

interface StableFormValidatorProps {
  fields: FormField[];
  onSubmit: (values: Record<string, any>) => void;
  submitButtonText?: string;
  title?: string;
}

export default function StableFormValidator({
  fields,
  onSubmit,
  submitButtonText = "Submit",
  title = "Form",
}: StableFormValidatorProps) {
  const [formValues, setFormValues] = useState<Record<string, any>>(() => {
    const initialValues: Record<string, any> = {};
    fields.forEach((field) => {
      initialValues[field.name] = field.value;
    });
    return initialValues;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);

  // Handle input changes
  const handleChange = useCallback(
    (name: string, value: any) => {
      setFormValues((prev) => ({ ...prev, [name]: value }));

      // Mark field as touched
      setTouched((prev) => ({ ...prev, [name]: true }));

      // Clear error when field is changed
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors]
  );

  // Validate a single field
  const validateField = useCallback(
    (field: FormField): string | null => {
      const value = formValues[field.name];

      // Required validation
      if (
        field.required &&
        ((field.type === "checkbox" && !value) ||
          (field.type !== "checkbox" && (!value || value.trim() === "")))
      ) {
        return `${field.label} is required`;
      }

      // Skip other validations if field is empty and not required
      if (
        !field.required &&
        (!value || (typeof value === "string" && value.trim() === ""))
      ) {
        return null;
      }

      // Type-specific validations
      if (field.type === "email" && typeof value === "string") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return `Please enter a valid email address`;
        }
      }

      // Min length validation
      if (
        field.minLength &&
        typeof value === "string" &&
        value.length < field.minLength
      ) {
        return `${field.label} must be at least ${field.minLength} characters`;
      }

      // Pattern validation
      if (
        field.pattern &&
        typeof value === "string" &&
        !field.pattern.test(value)
      ) {
        return field.patternMessage || `${field.label} format is invalid`;
      }

      return null;
    },
    [formValues]
  );

  // Validate all fields
  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    fields.forEach((field) => {
      const error = validateField(field);
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [fields, validateField]);

  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Mark all fields as touched
      const allTouched: Record<string, boolean> = {};
      fields.forEach((field) => {
        allTouched[field.name] = true;
      });
      setTouched(allTouched);

      // Validate form
      const isValid = validateForm();

      if (isValid) {
        setIsSubmitting(true);
        setFormError(null);

        try {
          // Submit form
          onSubmit(formValues);
          setFormSuccess(true);

          // Reset form after 3 seconds
          setTimeout(() => {
            setFormSuccess(false);
          }, 3000);
        } catch (error) {
          setFormError(
            "An error occurred while submitting the form. Please try again."
          );
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [fields, formValues, onSubmit, validateForm]
  );

  // Handle blur event for field validation
  const handleBlur = useCallback(
    (field: FormField) => {
      setTouched((prev) => ({ ...prev, [field.name]: true }));

      const error = validateField(field);
      if (error) {
        setErrors((prev) => ({ ...prev, [field.name]: error }));
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field.name];
          return newErrors;
        });
      }
    },
    [validateField]
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {formError && (
            <FormErrorHandler
              errorMessage={formError}
              onDismiss={() => setFormError(null)}
              onRetry={() =>
                handleSubmit({ preventDefault: () => {} } as React.FormEvent)
              }
            />
          )}

          {formSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
              <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />

              <span>Form submitted successfully!</span>
            </div>
          )}

          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              {field.type === "checkbox" ? (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={field.name}
                    checked={!!formValues[field.name]}
                    onCheckedChange={(checked) =>
                      handleChange(field.name, checked)
                    }
                  />

                  <Label
                    htmlFor={field.name}
                    className={
                      field.required
                        ? "after:content-['*'] after:ml-0.5 after:text-red-500"
                        : ""
                    }
                  >
                    {field.label}
                  </Label>
                </div>
              ) : (
                <>
                  <Label
                    htmlFor={field.name}
                    className={
                      field.required
                        ? "after:content-['*'] after:ml-0.5 after:text-red-500"
                        : ""
                    }
                  >
                    {field.label}
                  </Label>
                  <Input
                    id={field.name}
                    type={field.type}
                    value={formValues[field.name] as string}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    onBlur={() => handleBlur(field)}
                    className={
                      touched[field.name] && errors[field.name]
                        ? "border-red-500"
                        : ""
                    }
                  />
                </>
              )}

              {touched[field.name] && errors[field.name] && (
                <p className="text-sm text-red-500">{errors[field.name]}</p>
              )}
            </div>
          ))}
        </CardContent>

        <CardFooter>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting..." : submitButtonText}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
