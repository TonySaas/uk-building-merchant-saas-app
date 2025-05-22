import { useState, useEffect } from "react";

export interface ValidationRule<T> {
  validate: (value: T) => boolean;
  message: string;
}

export interface FieldValidation<T> {
  value: T;
  rules: ValidationRule<T>[];
  touched: boolean;
  error: string | null;
}

export interface UseFormValidationOptions {
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  validateOnMount?: boolean;
}

export function useOfferFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validationRules: Record<keyof T, ValidationRule<any>[]>,
  options: UseFormValidationOptions = {}
) {
  const {
    validateOnChange = false,
    validateOnBlur = true,
    validateOnMount = false,
  } = options;

  // Initialize field validation state
  const initializeValidationState = () => {
    const validationState: Record<string, FieldValidation<any>> = {};

    for (const field in initialValues) {
      validationState[field] = {
        value: initialValues[field],
        rules: validationRules[field] || [],
        touched: false,
        error: null,
      };
    }

    return validationState;
  };

  const [values, setValues] = useState<T>(initialValues);
  const [validationState, setValidationState] = useState(
    initializeValidationState
  );
  const [isDirty, setIsDirty] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  // Validate a single field
  const validateField = (fieldName: keyof T, value: any): string | null => {
    const rules = validationRules[fieldName] || [];

    for (const rule of rules) {
      if (!rule.validate(value)) {
        return rule.message;
      }
    }

    return null;
  };

  // Validate all fields
  const validateAllFields = () => {
    const newValidationState = { ...validationState };
    let formIsValid = true;

    for (const fieldName in values) {
      const error = validateField(fieldName, values[fieldName]);
      newValidationState[fieldName] = {
        ...newValidationState[fieldName],
        error,
        touched: true,
      };

      if (error) {
        formIsValid = false;
      }
    }

    setValidationState(newValidationState);
    setIsValid(formIsValid);

    return formIsValid;
  };

  // Handle field change
  const handleChange = (fieldName: keyof T, value: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));

    setIsDirty(true);

    // Update validation state
    setValidationState((prevState) => ({
      ...prevState,
      [fieldName]: {
        ...prevState[fieldName],
        value,
        touched: true,
        error: validateOnChange
          ? validateField(fieldName, value)
          : prevState[fieldName].error,
      },
    }));
  };

  // Handle field blur
  const handleBlur = (fieldName: keyof T) => {
    if (validateOnBlur) {
      setValidationState((prevState) => ({
        ...prevState,
        [fieldName]: {
          ...prevState[fieldName],
          touched: true,
          error: validateField(fieldName, values[fieldName]),
        },
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (
    onSubmit: (values: T) => Promise<void> | void,
    onError?: (errors: Record<string, string>) => void
  ) => {
    setIsSubmitting(true);
    setSubmitCount((prev) => prev + 1);

    const isValid = validateAllFields();

    if (isValid) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error("Form submission error:", error);
      }
    } else if (onError) {
      const errors: Record<string, string> = {};

      for (const field in validationState) {
        if (validationState[field].error) {
          errors[field] = validationState[field].error!;
        }
      }

      onError(errors);
    }

    setIsSubmitting(false);
  };

  // Reset the form
  const resetForm = () => {
    setValues(initialValues);
    setValidationState(initializeValidationState());
    setIsDirty(false);
    setIsValid(true);
  };

  // Validate on mount if enabled
  useEffect(() => {
    if (validateOnMount) {
      validateAllFields();
    }
  }, []);

  // Update isValid state whenever validation state changes
  useEffect(() => {
    const formIsValid = Object.values(validationState).every(
      (field) => !field.error
    );
    setIsValid(formIsValid);
  }, [validationState]);

  return {
    values,
    errors: Object.fromEntries(
      Object.entries(validationState).map(([key, field]) => [key, field.error])
    ),
    touched: Object.fromEntries(
      Object.entries(validationState).map(([key, field]) => [
        key,
        field.touched,
      ])
    ),
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    validateField,
    validateAllFields,
    isDirty,
    isValid,
    isSubmitting,
    submitCount,
  };
}

// Common validation rules
export const offerValidationRules = {
  required: (message = "This field is required"): ValidationRule<any> => ({
    validate: (value) => {
      if (value === null || value === undefined) return false;
      if (typeof value === "string") return value.trim() !== "";
      if (Array.isArray(value)) return value.length > 0;
      return true;
    },
    message,
  }),

  minLength: (
    min: number,
    message = `Must be at least ${min} characters`
  ): ValidationRule<string> => ({
    validate: (value) => value.length >= min,
    message,
  }),

  maxLength: (
    max: number,
    message = `Cannot exceed ${max} characters`
  ): ValidationRule<string> => ({
    validate: (value) => value.length <= max,
    message,
  }),

  minValue: (
    min: number,
    message = `Must be at least ${min}`
  ): ValidationRule<number> => ({
    validate: (value) => value >= min,
    message,
  }),

  maxValue: (
    max: number,
    message = `Cannot exceed ${max}`
  ): ValidationRule<number> => ({
    validate: (value) => value <= max,
    message,
  }),

  pattern: (
    regex: RegExp,
    message = "Invalid format"
  ): ValidationRule<string> => ({
    validate: (value) => regex.test(value),
    message,
  }),

  email: (message = "Invalid email address"): ValidationRule<string> => ({
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message,
  }),

  url: (message = "Invalid URL"): ValidationRule<string> => ({
    validate: (value) =>
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value),
    message,
  }),

  numeric: (message = "Must be a number"): ValidationRule<string> => ({
    validate: (value) => !isNaN(parseFloat(value)) && isFinite(Number(value)),
    message,
  }),

  integer: (
    message = "Must be an integer"
  ): ValidationRule<string | number> => ({
    validate: (value) => Number.isInteger(Number(value)),
    message,
  }),

  dateRange: (
    message = "Invalid date range"
  ): ValidationRule<{ from?: Date; to?: Date }> => ({
    validate: (value) => {
      if (!value.from || !value.to) return false;
      return new Date(value.from) < new Date(value.to);
    },
    message,
  }),

  priceComparison: (
    message = "Discounted price must be less than original price"
  ): ValidationRule<{ original: number; discounted: number }> => ({
    validate: (value) => {
      if (!value.original || !value.discounted) return true;
      return (
        parseFloat(value.discounted.toString()) <
        parseFloat(value.original.toString())
      );
    },
    message,
  }),
};

// Example usage for offer form validation
export const createOfferValidationRules = {
  title: [
    offerValidationRules.required("Offer title is required"),
    offerValidationRules.minLength(5, "Title must be at least 5 characters"),
    offerValidationRules.maxLength(100, "Title cannot exceed 100 characters"),
  ],

  description: [
    offerValidationRules.required("Description is required"),
    offerValidationRules.minLength(
      20,
      "Description must be at least 20 characters"
    ),
  ],

  category: [offerValidationRules.required("Category is required")],

  originalPrice: [
    offerValidationRules.required("Original price is required"),
    offerValidationRules.numeric("Price must be a number"),
    offerValidationRules.minValue(0.01, "Price must be greater than zero"),
  ],

  discountedPrice: [
    offerValidationRules.required("Discounted price is required"),
    offerValidationRules.numeric("Price must be a number"),
    offerValidationRules.minValue(0.01, "Price must be greater than zero"),
  ],

  dateRange: [
    offerValidationRules.required("Date range is required"),
    offerValidationRules.dateRange("End date must be after start date"),
  ],

  mainImage: [offerValidationRules.required("Main product image is required")],

  targetOrganizations: [
    offerValidationRules.required("Select at least one organization"),
  ],

  targetCategories: [
    offerValidationRules.required("Select at least one category"),
  ],
};
