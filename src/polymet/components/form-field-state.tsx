import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { StateValidation } from "@/polymet/components/state-managed-input";

// Define the shape of field state
export interface FieldState {
  value: any;
  isFocused: boolean;
  isTouched: boolean;
  isDirty: boolean;
  isValidated: boolean;
  validationState: StateValidation;
}

// Define the shape of the form state
export interface FormState {
  isValid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitCount: number;
}

// Define the context shape
interface FormFieldStateContextType {
  // Field management
  registerField: (name: string, initialValue?: any) => void;
  unregisterField: (name: string) => void;
  getFieldState: (name: string) => FieldState | undefined;
  setFieldValue: (name: string, value: any) => void;
  setFieldState: (name: string, state: Partial<FieldState>) => void;
  validateField: (name: string) => boolean;

  // Form management
  formState: FormState;
  validateForm: () => boolean;
  resetForm: (values?: Record<string, any>) => void;
  submitForm: (
    onSubmit: (values: Record<string, any>) => void | Promise<void>
  ) => Promise<void>;

  // Values access
  getValues: () => Record<string, any>;
  getErrors: () => Record<string, string | undefined>;
}

// Create context with a default value
const FormFieldStateContext = createContext<
  FormFieldStateContextType | undefined
>(undefined);

// Provider props
interface FormFieldStateProviderProps {
  children: ReactNode;
  initialValues?: Record<string, any>;
  onValuesChange?: (values: Record<string, any>) => void;
}

// Provider component
export const FormFieldStateProvider: React.FC<FormFieldStateProviderProps> = ({
  children,
  initialValues = {},
  onValuesChange,
}) => {
  // Store field states in a ref to avoid re-renders
  const [fields, setFields] = useState<Record<string, FieldState>>({});

  // Form state
  const [formState, setFormState] = useState<FormState>({
    isValid: true,
    isDirty: false,
    isTouched: false,
    isSubmitting: false,
    isSubmitted: false,
    submitCount: 0,
  });

  // Register a new field
  const registerField = useCallback(
    (name: string, initialValue?: any) => {
      const value = name in initialValues ? initialValues[name] : initialValue;

      setFields((prev) => ({
        ...prev,
        [name]: {
          value,
          isFocused: false,
          isTouched: false,
          isDirty: false,
          isValidated: false,
          validationState: { isValid: true },
        },
      }));
    },
    [initialValues]
  );

  // Unregister a field
  const unregisterField = useCallback((name: string) => {
    setFields((prev) => {
      const newFields = { ...prev };
      delete newFields[name];
      return newFields;
    });
  }, []);

  // Get a field's state
  const getFieldState = useCallback(
    (name: string) => {
      return fields[name];
    },
    [fields]
  );

  // Set a field's value
  const setFieldValue = useCallback(
    (name: string, value: any) => {
      setFields((prev) => {
        if (!prev[name]) return prev;

        const newFields = {
          ...prev,
          [name]: {
            ...prev[name],
            value,
            isDirty: true,
          },
        };

        return newFields;
      });

      // Update form dirty state
      setFormState((prev) => ({
        ...prev,
        isDirty: true,
      }));

      // Notify parent of value changes
      if (onValuesChange) {
        const newValues = Object.entries(fields).reduce(
          (acc, [fieldName, fieldState]) => {
            acc[fieldName] = fieldName === name ? value : fieldState.value;
            return acc;
          },
          {} as Record<string, any>
        );

        onValuesChange(newValues);
      }
    },
    [fields, onValuesChange]
  );

  // Set a field's state
  const setFieldState = useCallback(
    (name: string, state: Partial<FieldState>) => {
      setFields((prev) => {
        if (!prev[name]) return prev;

        return {
          ...prev,
          [name]: {
            ...prev[name],
            ...state,
          },
        };
      });

      // Update form touched state if field is touched
      if (state.isTouched) {
        setFormState((prev) => ({
          ...prev,
          isTouched: true,
        }));
      }

      // Update form validity
      if (state.validationState) {
        updateFormValidity();
      }
    },
    []
  );

  // Validate a specific field
  const validateField = useCallback(
    (name: string) => {
      const field = fields[name];
      if (!field) return true;

      // Field validation would happen here, but we're just returning the current state
      // since actual validation happens in the StateTrackedInput component
      return field.validationState.isValid;
    },
    [fields]
  );

  // Update form validity based on all fields
  const updateFormValidity = useCallback(() => {
    const isValid = Object.values(fields).every(
      (field) => !field.isValidated || field.validationState.isValid
    );

    setFormState((prev) => ({
      ...prev,
      isValid,
    }));

    return isValid;
  }, [fields]);

  // Validate the entire form
  const validateForm = useCallback(() => {
    // Mark all fields as validated
    setFields((prev) => {
      const newFields = { ...prev };

      Object.keys(newFields).forEach((name) => {
        newFields[name] = {
          ...newFields[name],
          isValidated: true,
        };
      });

      return newFields;
    });

    return updateFormValidity();
  }, [updateFormValidity]);

  // Reset the form
  const resetForm = useCallback(
    (values?: Record<string, any>) => {
      setFields((prev) => {
        const newFields = { ...prev };

        Object.keys(newFields).forEach((name) => {
          newFields[name] = {
            ...newFields[name],
            value: values?.[name] ?? initialValues[name] ?? "",
            isTouched: false,
            isDirty: false,
            isValidated: false,
            validationState: { isValid: true },
          };
        });

        return newFields;
      });

      setFormState({
        isValid: true,
        isDirty: false,
        isTouched: false,
        isSubmitting: false,
        isSubmitted: false,
        submitCount: 0,
      });
    },
    [initialValues]
  );

  // Submit the form
  const submitForm = useCallback(
    async (onSubmit: (values: Record<string, any>) => void | Promise<void>) => {
      // Set submitting state
      setFormState((prev) => ({
        ...prev,
        isSubmitting: true,
      }));

      // Validate all fields
      const isValid = validateForm();

      if (isValid) {
        try {
          // Get all values
          const values = getValues();

          // Call the submit handler
          await onSubmit(values);

          // Update form state
          setFormState((prev) => ({
            ...prev,
            isSubmitting: false,
            isSubmitted: true,
            submitCount: prev.submitCount + 1,
          }));
        } catch (error) {
          console.error("Form submission error:", error);

          // Update form state
          setFormState((prev) => ({
            ...prev,
            isSubmitting: false,
          }));
        }
      } else {
        // Update form state
        setFormState((prev) => ({
          ...prev,
          isSubmitting: false,
        }));
      }
    },
    [validateForm]
  );

  // Get all form values
  const getValues = useCallback(() => {
    return Object.entries(fields).reduce(
      (acc, [name, field]) => {
        acc[name] = field.value;
        return acc;
      },
      {} as Record<string, any>
    );
  }, [fields]);

  // Get all form errors
  const getErrors = useCallback(() => {
    return Object.entries(fields).reduce(
      (acc, [name, field]) => {
        if (field.isValidated && !field.validationState.isValid) {
          acc[name] = field.validationState.message;
        }
        return acc;
      },
      {} as Record<string, string | undefined>
    );
  }, [fields]);

  const contextValue: FormFieldStateContextType = {
    registerField,
    unregisterField,
    getFieldState,
    setFieldValue,
    setFieldState,
    validateField,
    formState,
    validateForm,
    resetForm,
    submitForm,
    getValues,
    getErrors,
  };

  return (
    <FormFieldStateContext.Provider value={contextValue}>
      {children}
    </FormFieldStateContext.Provider>
  );
};

// Custom hook to use the form field state context
export const useFormFieldState = () => {
  const context = useContext(FormFieldStateContext);

  if (context === undefined) {
    throw new Error(
      "useFormFieldState must be used within a FormFieldStateProvider"
    );
  }

  return context;
};

// Field component that connects to the form state
interface FormFieldProps {
  name: string;
  children: (props: {
    value: any;
    onChange: (value: any) => void;
    onStateChange: (state: Partial<FieldState>) => void;
  }) => ReactNode;
  initialValue?: any;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  children,
  initialValue,
}) => {
  const {
    registerField,
    unregisterField,
    getFieldState,
    setFieldValue,
    setFieldState,
  } = useFormFieldState();

  // Register field on mount
  React.useEffect(() => {
    registerField(name, initialValue);

    return () => {
      unregisterField(name);
    };
  }, [name, initialValue, registerField, unregisterField]);

  // Get field state
  const fieldState = getFieldState(name);

  // If field is not registered yet, render nothing
  if (!fieldState) return null;

  // Handle value change
  const handleChange = (value: any) => {
    setFieldValue(name, value);
  };

  // Handle state change
  const handleStateChange = (state: Partial<FieldState>) => {
    setFieldState(name, state);
  };

  return (
    <>
      {children({
        value: fieldState.value,
        onChange: handleChange,
        onStateChange: handleStateChange,
      })}
    </>
  );
};
