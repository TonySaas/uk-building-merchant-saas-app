import React, { useState } from "react";
import {
  FormFieldStateProvider,
  FormField,
} from "@/polymet/components/form-field-state";
import StateTrackedInput from "@/polymet/components/state-managed-input";
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
import { CheckCircleIcon, AlertCircleIcon, InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Validation functions
const validators = {
  // Basic required field validation
  required: (value: string) => {
    return value.trim()
      ? { isValid: true }
      : { isValid: false, message: "This field is required" };
  },

  // Email validation
  email: (value: string) => {
    if (!value.trim()) return { isValid: false, message: "Email is required" };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value)
      ? { isValid: true }
      : { isValid: false, message: "Please enter a valid email address" };
  },

  // Password validation
  password: (value: string) => {
    if (!value) return { isValid: false, message: "Password is required" };
    if (value.length < 8)
      return {
        isValid: false,
        message: "Password must be at least 8 characters",
      };

    // Check for complexity (at least one number and one letter)
    const hasNumber = /\d/.test(value);
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (!hasNumber || !hasLetter) {
      return {
        isValid: false,
        message: "Password must contain both letters and numbers",
      };
    }

    if (!hasSpecial) {
      return {
        isValid: true,
        message: "Strong passwords also include special characters",
      };
    }

    return { isValid: true };
  },

  // Phone number validation
  phone: (value: string) => {
    if (!value.trim()) return { isValid: true }; // Optional field

    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(value.replace(/[-()\s]/g, ""))
      ? { isValid: true }
      : { isValid: false, message: "Please enter a valid phone number" };
  },

  // URL validation
  url: (value: string) => {
    if (!value.trim()) return { isValid: true }; // Optional field

    try {
      new URL(value.startsWith("http") ? value : `https://${value}`);
      return { isValid: true };
    } catch {
      return { isValid: false, message: "Please enter a valid URL" };
    }
  },

  // Minimum length validation
  minLength: (length: number) => (value: string) => {
    if (!value.trim()) return { isValid: true }; // Optional field

    return value.length >= length
      ? { isValid: true }
      : { isValid: false, message: `Must be at least ${length} characters` };
  },

  // Maximum length validation
  maxLength: (length: number) => (value: string) => {
    return value.length <= length
      ? { isValid: true }
      : {
          isValid: false,
          message: `Must be no more than ${length} characters`,
        };
  },

  // Match pattern validation
  pattern: (regex: RegExp, message: string) => (value: string) => {
    if (!value.trim()) return { isValid: true }; // Optional field

    return regex.test(value) ? { isValid: true } : { isValid: false, message };
  },

  // Combine multiple validators
  compose: (
    ...validators: Array<
      (value: string) => { isValid: boolean; message?: string }
    >
  ) => {
    return (value: string) => {
      for (const validator of validators) {
        const result = validator(value);
        if (!result.isValid) {
          return result;
        }
      }
      return { isValid: true };
    };
  },
};

// Form submission result display
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
        <pre
          className={`mt-2 text-sm p-2 rounded ${
            status === "success"
              ? "text-green-700 dark:text-green-300"
              : "text-red-700 dark:text-red-300"
          }`}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};

// Login Form
const LoginForm = ({
  onSubmit,
}: {
  onSubmit: (values: Record<string, any>) => Promise<void>;
}) => {
  return (
    <FormFieldStateProvider>
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField name="email">
            {({ value, onChange, onStateChange }) => (
              <StateTrackedInput
                label="Email Address"
                placeholder="name@example.com"
                value={value || ""}
                onChange={onChange}
                validator={validators.email}
                stateOptions={{
                  validateOnBlur: true,
                  touchOnChange: true,
                }}
                onStateChange={onStateChange}
              />
            )}
          </FormField>

          <FormField name="password">
            {({ value, onChange, onStateChange }) => (
              <StateTrackedInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={value || ""}
                onChange={onChange}
                validator={validators.password}
                stateOptions={{
                  validateOnBlur: true,
                }}
                onStateChange={onStateChange}
              />
            )}
          </FormField>
        </CardContent>
        <CardFooter>
          <SubmitButton onSubmit={onSubmit} label="Sign In" />
        </CardFooter>
      </Card>
    </FormFieldStateProvider>
  );
};

// Registration Form
const RegistrationForm = ({
  onSubmit,
}: {
  onSubmit: (values: Record<string, any>) => Promise<void>;
}) => {
  return (
    <FormFieldStateProvider>
      <Card>
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            Fill out the form below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField name="firstName">
              {({ value, onChange, onStateChange }) => (
                <StateTrackedInput
                  label="First Name"
                  placeholder="John"
                  value={value || ""}
                  onChange={onChange}
                  validator={validators.required}
                  stateOptions={{
                    validateOnBlur: true,
                  }}
                  onStateChange={onStateChange}
                />
              )}
            </FormField>

            <FormField name="lastName">
              {({ value, onChange, onStateChange }) => (
                <StateTrackedInput
                  label="Last Name"
                  placeholder="Doe"
                  value={value || ""}
                  onChange={onChange}
                  validator={validators.required}
                  stateOptions={{
                    validateOnBlur: true,
                  }}
                  onStateChange={onStateChange}
                />
              )}
            </FormField>
          </div>

          <FormField name="email">
            {({ value, onChange, onStateChange }) => (
              <StateTrackedInput
                label="Email Address"
                placeholder="name@example.com"
                value={value || ""}
                onChange={onChange}
                validator={validators.email}
                stateOptions={{
                  validateOnBlur: true,
                  touchOnChange: true,
                }}
                onStateChange={onStateChange}
              />
            )}
          </FormField>

          <FormField name="phone">
            {({ value, onChange, onStateChange }) => (
              <StateTrackedInput
                label="Phone Number (optional)"
                placeholder="+1 (555) 123-4567"
                value={value || ""}
                onChange={onChange}
                validator={validators.phone}
                stateOptions={{
                  validateOnBlur: true,
                }}
                onStateChange={onStateChange}
              />
            )}
          </FormField>

          <FormField name="password">
            {({ value, onChange, onStateChange }) => (
              <StateTrackedInput
                label="Password"
                type="password"
                placeholder="Create a secure password"
                value={value || ""}
                onChange={onChange}
                validator={validators.password}
                stateOptions={{
                  validateOnBlur: true,
                  validateOnChange: true,
                }}
                onStateChange={onStateChange}
              />
            )}
          </FormField>

          <FormField name="confirmPassword">
            {({ value, onChange, onStateChange }) => (
              <StateTrackedInput
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={value || ""}
                onChange={onChange}
                validator={(confirmValue) => {
                  if (!confirmValue)
                    return {
                      isValid: false,
                      message: "Please confirm your password",
                    };

                  // Get the password field value
                  const passwordField = document.querySelector(
                    'input[type="password"]'
                  ) as HTMLInputElement;
                  const password = passwordField?.value || "";

                  return confirmValue === password
                    ? { isValid: true }
                    : { isValid: false, message: "Passwords do not match" };
                }}
                stateOptions={{
                  validateOnBlur: true,
                  validateOnChange: true,
                }}
                onStateChange={onStateChange}
              />
            )}
          </FormField>
        </CardContent>
        <CardFooter>
          <SubmitButton onSubmit={onSubmit} label="Create Account" />
        </CardFooter>
      </Card>
    </FormFieldStateProvider>
  );
};

// Profile Form
const ProfileForm = ({
  onSubmit,
}: {
  onSubmit: (values: Record<string, any>) => Promise<void>;
}) => {
  return (
    <FormFieldStateProvider
      initialValues={{
        displayName: "John Doe",
        bio: "Software developer with 5+ years of experience",
        website: "johndoe.com",
        twitter: "@johndoe",
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField name="displayName">
            {({ value, onChange, onStateChange }) => (
              <StateTrackedInput
                label="Display Name"
                placeholder="How you want to be known"
                value={value || ""}
                onChange={onChange}
                validator={validators.compose(
                  validators.required,
                  validators.minLength(2),
                  validators.maxLength(50)
                )}
                stateOptions={{
                  validateOnBlur: true,
                }}
                onStateChange={onStateChange}
              />
            )}
          </FormField>

          <FormField name="bio">
            {({ value, onChange, onStateChange }) => (
              <StateTrackedInput
                label="Bio"
                placeholder="Tell us about yourself"
                value={value || ""}
                onChange={onChange}
                validator={validators.maxLength(160)}
                stateOptions={{
                  validateOnBlur: true,
                }}
                onStateChange={onStateChange}
                helperText="Maximum 160 characters"
              />
            )}
          </FormField>

          <FormField name="website">
            {({ value, onChange, onStateChange }) => (
              <StateTrackedInput
                label="Website (optional)"
                placeholder="yourwebsite.com"
                value={value || ""}
                onChange={onChange}
                validator={validators.url}
                stateOptions={{
                  validateOnBlur: true,
                }}
                onStateChange={onStateChange}
              />
            )}
          </FormField>

          <FormField name="twitter">
            {({ value, onChange, onStateChange }) => (
              <StateTrackedInput
                label="Twitter Handle (optional)"
                placeholder="@username"
                value={value || ""}
                onChange={onChange}
                validator={validators.pattern(
                  /^@?[a-zA-Z0-9_]{1,15}$/,
                  "Please enter a valid Twitter handle"
                )}
                stateOptions={{
                  validateOnBlur: true,
                }}
                onStateChange={onStateChange}
              />
            )}
          </FormField>
        </CardContent>
        <CardFooter>
          <SubmitButton onSubmit={onSubmit} label="Save Changes" />
        </CardFooter>
      </Card>
    </FormFieldStateProvider>
  );
};

// Submit button component
const SubmitButton = ({
  onSubmit,
  label,
}: {
  onSubmit: (values: Record<string, any>) => Promise<void>;
  label: string;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      // Get form values
      const form = e.currentTarget.closest("form");
      if (!form) return;

      const formData = new FormData(form);
      const values: Record<string, any> = {};

      formData.forEach((value, key) => {
        values[key] = value;
      });

      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button
      type="submit"
      onClick={handleSubmit}
      disabled={isSubmitting}
      className="w-full"
    >
      {isSubmitting ? "Processing..." : label}
    </Button>
  );
};

// Main component
export default function FormValidationExample() {
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
        if (Math.random() > 0.2) {
          // 80% success rate
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
        Form Validation Examples
      </h2>

      <Alert className="mb-6">
        <InfoIcon className="h-4 w-4" />

        <AlertTitle>Form State Management</AlertTitle>
        <AlertDescription>
          These forms demonstrate different validation patterns and state
          management techniques.
        </AlertDescription>
      </Alert>

      <Tabs
        defaultValue="login"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <form>
            <LoginForm onSubmit={handleSubmit} />
          </form>
        </TabsContent>

        <TabsContent value="register">
          <form>
            <RegistrationForm onSubmit={handleSubmit} />
          </form>
        </TabsContent>

        <TabsContent value="profile">
          <form>
            <ProfileForm onSubmit={handleSubmit} />
          </form>
        </TabsContent>
      </Tabs>

      <FormResult status={formResult.status} data={formResult.data} />
    </div>
  );
}
