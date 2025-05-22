import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircleIcon, CheckCircleIcon, InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Validation utility functions
const validators = {
  required: (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value
        ? { valid: true }
        : { valid: false, message: "This field is required" };
    }
    return value.trim()
      ? { valid: true }
      : { valid: false, message: "This field is required" };
  },

  email: (value: string) => {
    if (!value.trim()) return { valid: false, message: "Email is required" };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value)
      ? { valid: true }
      : { valid: false, message: "Please enter a valid email address" };
  },

  password: (value: string) => {
    if (!value) return { valid: false, message: "Password is required" };
    if (value.length < 8)
      return {
        valid: false,
        message: "Password must be at least 8 characters",
      };

    const hasNumber = /\d/.test(value);
    const hasLetter = /[a-zA-Z]/.test(value);

    if (!hasNumber || !hasLetter) {
      return {
        valid: false,
        message: "Password must contain both letters and numbers",
      };
    }

    return { valid: true };
  },

  matchPassword: (value: string, passwordValue: string) => {
    if (!value)
      return { valid: false, message: "Please confirm your password" };
    return value === passwordValue
      ? { valid: true }
      : { valid: false, message: "Passwords do not match" };
  },
};

// Form result display component
const FormResult = ({
  status,
  data,
}: {
  status: "success" | "error" | null;
  data?: any;
}) => {
  if (!status) return null;

  return (
    <div
      className={`mt-4 p-4 rounded-md ${
        status === "success"
          ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900"
          : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900"
      }`}
    >
      <div className="flex items-center gap-2">
        {status === "success" ? (
          <CheckCircleIcon className="h-5 w-5 text-green-500" />
        ) : (
          <AlertCircleIcon className="h-5 w-5 text-red-500" />
        )}
        <h3
          className={`font-medium ${
            status === "success"
              ? "text-green-800 dark:text-green-400"
              : "text-red-800 dark:text-red-400"
          }`}
        >
          {status === "success"
            ? "Form Submitted Successfully"
            : "Form Submission Failed"}
        </h3>
      </div>
      {data && (
        <pre className="mt-2 text-sm p-2 rounded bg-slate-100 dark:bg-slate-800 overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};

// Form field component
interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  validate?: (
    value: any,
    formValues?: any
  ) => { valid: boolean; message?: string };
  value: any;
  onChange: (value: any) => void;
  error?: string;
  disabled?: boolean;
}

const FormField = ({
  id,
  label,
  type,
  placeholder,
  required,
  value,
  onChange,
  error,
  disabled,
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      {type === "checkbox" ? (
        <div className="flex items-center space-x-2">
          <Checkbox
            id={id}
            checked={!!value}
            onCheckedChange={onChange}
            disabled={disabled}
          />

          <Label
            htmlFor={id}
            className={
              required
                ? "after:content-['*'] after:ml-0.5 after:text-red-500"
                : ""
            }
          >
            {label}
          </Label>
        </div>
      ) : (
        <>
          <Label
            htmlFor={id}
            className={
              required
                ? "after:content-['*'] after:ml-0.5 after:text-red-500"
                : ""
            }
          >
            {label}
          </Label>
          <Input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={error ? "border-red-500" : ""}
            disabled={disabled}
          />
        </>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

// Login form component
const LoginForm = ({
  onSubmit,
}: {
  onSubmit: (values: Record<string, any>) => Promise<void>;
}) => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [errorDismissed, setErrorDismissed] = useState(false);

  const updateField = (field: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Clear error when field is changed
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate email
    const emailResult = validators.email(formValues.email);
    if (!emailResult.valid) {
      newErrors.email = emailResult.message || "Invalid email";
    }

    // Validate password
    const passwordResult = validators.password(formValues.password);
    if (!passwordResult.valid) {
      newErrors.password = passwordResult.message || "Invalid password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      email: true,
      password: true,
      rememberMe: true,
    });

    // Validate form
    const isValid = validateForm();

    if (isValid) {
      setIsSubmitting(true);

      try {
        await onSubmit(formValues);
        // Reset error count on successful submission
        setErrorCount(0);
        setErrorDismissed(false);
      } catch (error) {
        // Increment error count
        setErrorCount((prev) => prev + 1);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Determine if we should show error prevention message
  const showErrorPrevention = errorCount >= 3 && !errorDismissed;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {showErrorPrevention && (
            <Alert variant="destructive">
              <AlertCircleIcon className="h-4 w-4" />

              <AlertTitle>Submission Error</AlertTitle>
              <AlertDescription>
                Multiple submission errors detected. Please check your form data
                or try again later.
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => setErrorDismissed(true)}
                >
                  Dismiss
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <FormField
            id="email"
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            required
            value={formValues.email}
            onChange={(value) => updateField("email", value)}
            error={touched.email ? errors.email : undefined}
          />

          <FormField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
            value={formValues.password}
            onChange={(value) => updateField("password", value)}
            error={touched.password ? errors.password : undefined}
          />

          <FormField
            id="rememberMe"
            label="Remember me"
            type="checkbox"
            value={formValues.rememberMe}
            onChange={(value) => updateField("rememberMe", value)}
          />
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || (errorCount >= 5 && !errorDismissed)}
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

// Registration form component
const RegistrationForm = ({
  onSubmit,
}: {
  onSubmit: (values: Record<string, any>) => Promise<void>;
}) => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [errorDismissed, setErrorDismissed] = useState(false);

  const updateField = (field: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Clear error when field is changed
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Special handling for password/confirmPassword
    if (field === "password" && touched.confirmPassword) {
      validateField("confirmPassword", formValues.confirmPassword);
    }
  };

  const validateField = (field: string, value: any) => {
    let error = null;

    switch (field) {
      case "firstName":
      case "lastName":
        error = validators.required(value).valid
          ? null
          : "This field is required";
        break;
      case "email":
        const emailResult = validators.email(value);
        error = emailResult.valid ? null : emailResult.message;
        break;
      case "password":
        const passwordResult = validators.password(value);
        error = passwordResult.valid ? null : passwordResult.message;
        break;
      case "confirmPassword":
        const confirmResult = validators.matchPassword(
          value,
          formValues.password
        );
        error = confirmResult.valid ? null : confirmResult.message;
        break;
      case "agreeTerms":
        error = value ? null : "You must agree to the terms and conditions";
        break;
    }

    if (error) {
      setErrors((prev) => ({ ...prev, [field]: error || "" }));
      return false;
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
      return true;
    }
  };

  const validateForm = () => {
    const fields = Object.keys(formValues) as Array<keyof typeof formValues>;
    let isValid = true;

    fields.forEach((field) => {
      const fieldIsValid = validateField(field, formValues[field]);
      if (!fieldIsValid) isValid = false;
    });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    Object.keys(formValues).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    // Validate form
    const isValid = validateForm();

    if (isValid) {
      setIsSubmitting(true);

      try {
        await onSubmit(formValues);
        // Reset error count on successful submission
        setErrorCount(0);
        setErrorDismissed(false);
      } catch (error) {
        // Increment error count
        setErrorCount((prev) => prev + 1);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Determine if we should show error prevention message
  const showErrorPrevention = errorCount >= 3 && !errorDismissed;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
          Fill out the form below to create your account
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {showErrorPrevention && (
            <Alert variant="destructive">
              <AlertCircleIcon className="h-4 w-4" />

              <AlertTitle>Submission Error</AlertTitle>
              <AlertDescription>
                Multiple submission errors detected. Please check your form data
                or try again later.
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => setErrorDismissed(true)}
                >
                  Dismiss
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-2 gap-4">
            <FormField
              id="firstName"
              label="First Name"
              type="text"
              placeholder="John"
              required
              value={formValues.firstName}
              onChange={(value) => updateField("firstName", value)}
              error={touched.firstName ? errors.firstName : undefined}
            />

            <FormField
              id="lastName"
              label="Last Name"
              type="text"
              placeholder="Doe"
              required
              value={formValues.lastName}
              onChange={(value) => updateField("lastName", value)}
              error={touched.lastName ? errors.lastName : undefined}
            />
          </div>

          <FormField
            id="email"
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            required
            value={formValues.email}
            onChange={(value) => updateField("email", value)}
            error={touched.email ? errors.email : undefined}
          />

          <FormField
            id="password"
            label="Password"
            type="password"
            placeholder="Create a secure password"
            required
            value={formValues.password}
            onChange={(value) => updateField("password", value)}
            error={touched.password ? errors.password : undefined}
          />

          <FormField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            required
            value={formValues.confirmPassword}
            onChange={(value) => updateField("confirmPassword", value)}
            error={touched.confirmPassword ? errors.confirmPassword : undefined}
          />

          <FormField
            id="agreeTerms"
            label="I agree to the terms and conditions"
            type="checkbox"
            required
            value={formValues.agreeTerms}
            onChange={(value) => updateField("agreeTerms", value)}
            error={touched.agreeTerms ? errors.agreeTerms : undefined}
          />
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || (errorCount >= 5 && !errorDismissed)}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

// Main component
export default function FormValidationSolution() {
  const [activeTab, setActiveTab] = useState("login");
  const [formResult, setFormResult] = useState<{
    status: "success" | "error" | null;
    data?: any;
  }>({
    status: null,
  });

  const handleSubmit = async (values: Record<string, any>) => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.3) {
          // 70% success rate
          setFormResult({
            status: "success",
            data: values,
          });
          resolve();
        } else {
          setFormResult({
            status: "error",
            data: { message: "Server error: Could not process your request" },
          });
          reject(new Error("Server error"));
        }
      }, 1000);
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">
        Form Validation Solution
      </h2>

      <Alert className="mb-6">
        <InfoIcon className="h-4 w-4" />

        <AlertTitle>Error-Resistant Forms</AlertTitle>
        <AlertDescription>
          These forms implement error prevention mechanisms to avoid validation
          loops.
        </AlertDescription>
      </Alert>

      <Tabs
        defaultValue="login"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <LoginForm onSubmit={handleSubmit} />
        </TabsContent>

        <TabsContent value="register">
          <RegistrationForm onSubmit={handleSubmit} />
        </TabsContent>
      </Tabs>

      <FormResult status={formResult.status} data={formResult.data} />
    </div>
  );
}
