import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircleIcon, CheckCircleIcon, XIcon } from "lucide-react";

interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "password" | "textarea";
  placeholder?: string;
  required?: boolean;
  validation?: (value: string) => string | null;
}

interface ErrorResistantFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => Promise<void>;
  title?: string;
  submitLabel?: string;
  maxErrorRetries?: number;
}

export default function ErrorResistantForm({
  fields,
  onSubmit,
  title = "Form",
  submitLabel = "Submit",
  maxErrorRetries = 3,
}: ErrorResistantFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [errorRetries, setErrorRetries] = useState(0);
  const [errorDismissed, setErrorDismissed] = useState(false);

  // Initialize form data
  useEffect(() => {
    const initialData: Record<string, string> = {};
    fields.forEach((field) => {
      initialData[field.id] = "";
    });
    setFormData(initialData);
  }, [fields]);

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear error when field is changed
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }

    // Mark as touched
    setTouched((prev) => ({ ...prev, [id]: true }));
  };

  const validateField = (field: FormField, value: string): string | null => {
    // Required validation
    if (field.required && !value.trim()) {
      return `${field.label} is required`;
    }

    // Email validation
    if (field.type === "email" && value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address";
      }
    }

    // Custom validation
    if (field.validation && value.trim()) {
      return field.validation(value);
    }

    return null;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    fields.forEach((field) => {
      const value = formData[field.id] || "";
      const error = validateField(field, value);

      if (error) {
        newErrors[field.id] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleBlur = (field: FormField) => {
    setTouched((prev) => ({ ...prev, [field.id]: true }));

    const value = formData[field.id] || "";
    const error = validateField(field, value);

    if (error) {
      setErrors((prev) => ({ ...prev, [field.id]: error }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field.id];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    fields.forEach((field) => {
      allTouched[field.id] = true;
    });
    setTouched(allTouched);

    // Validate form
    const isValid = validateForm();

    if (isValid) {
      setIsSubmitting(true);
      setFormError(null);

      try {
        await onSubmit(formData);
        setFormSuccess(true);
        setErrorRetries(0); // Reset error retries on success

        // Reset form after success
        setTimeout(() => {
          setFormSuccess(false);

          // Clear form data
          const clearedData: Record<string, string> = {};
          fields.forEach((field) => {
            clearedData[field.id] = "";
          });
          setFormData(clearedData);
          setTouched({});
        }, 3000);
      } catch (error) {
        // Increment error retries
        const newRetryCount = errorRetries + 1;
        setErrorRetries(newRetryCount);

        if (newRetryCount >= maxErrorRetries) {
          setFormError(
            "Maximum retry attempts reached. Please try again later or contact support."
          );
        } else {
          setFormError(
            `An error occurred. Retry attempt ${newRetryCount}/${maxErrorRetries}`
          );
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const dismissError = () => {
    setFormError(null);
    setErrorDismissed(true);
  };

  const renderField = (field: FormField) => {
    const hasError = touched[field.id] && errors[field.id];

    return (
      <div key={field.id} className="space-y-2">
        <Label
          htmlFor={field.id}
          className={
            field.required
              ? "after:content-['*'] after:ml-0.5 after:text-red-500"
              : ""
          }
        >
          {field.label}
        </Label>

        {field.type === "textarea" ? (
          <Textarea
            id={field.id}
            placeholder={field.placeholder}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            onBlur={() => handleBlur(field)}
            className={hasError ? "border-red-500" : ""}
          />
        ) : (
          <Input
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            onBlur={() => handleBlur(field)}
            className={hasError ? "border-red-500" : ""}
          />
        )}

        {hasError && <p className="text-sm text-red-500">{errors[field.id]}</p>}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {formError && !errorDismissed && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
              <AlertCircleIcon className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />

              <div className="flex-grow">{formError}</div>
              <button
                type="button"
                onClick={dismissError}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          )}

          {formSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
              <CheckCircleIcon className="h-5 w-5 mr-2 flex-shrink-0" />

              <span>Form submitted successfully!</span>
            </div>
          )}

          {fields.map(renderField)}
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            disabled={
              isSubmitting ||
              (errorRetries >= maxErrorRetries && !errorDismissed)
            }
            className="w-full"
          >
            {isSubmitting ? "Submitting..." : submitLabel}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
