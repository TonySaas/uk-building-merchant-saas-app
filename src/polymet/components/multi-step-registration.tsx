import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TextInput } from "@/polymet/components/text-input";
import { EmailInput } from "@/polymet/components/email-input";
import { PasswordInput } from "@/polymet/components/password-input";
import { Checkbox } from "@/polymet/components/checkbox-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OrganizationSelector from "@/polymet/components/organization-selector";
import { ORGANIZATIONS } from "@/polymet/data/organization-data";
import { Progress } from "@/components/ui/progress";
import { CheckIcon, ArrowRightIcon, ArrowLeftIcon } from "lucide-react";

interface MultiStepRegistrationProps {
  onSubmit?: (data: any) => void;
  loading?: boolean;
}

type UserRole = "supplier" | "merchant" | "consumer" | "";

export default function MultiStepRegistration({
  onSubmit,
  loading = false,
}: MultiStepRegistrationProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "" as UserRole,
    organizationId: "",
    companyName: "",
    jobTitle: "",
    phone: "",
    website: "",
    acceptTerms: false,
    acceptMarketing: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.firstName.trim())
        newErrors.firstName = "First name is required";
      if (!formData.lastName.trim())
        newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    } else if (currentStep === 2) {
      if (!formData.role) newErrors.role = "Please select a role";
      if (!formData.organizationId)
        newErrors.organizationId = "Please select an organization";
    } else if (currentStep === 3) {
      if (formData.role === "supplier" || formData.role === "merchant") {
        if (!formData.companyName.trim())
          newErrors.companyName = "Company name is required";
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
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateStep(step) && onSubmit) {
      onSubmit(formData);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Personal Information";
      case 2:
        return "Organization & Role";
      case 3:
        return "Account Setup";
      case 4:
        return "Registration Complete";
      default:
        return "";
    }
  };

  const progressPercentage = ((step - 1) / 3) * 100;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">{getStepTitle()}</CardTitle>
        <Progress value={progressPercentage} className="h-2" />
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  error={errors.firstName}
                  required
                />

                <TextInput
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  error={errors.lastName}
                  required
                />
              </div>
              <EmailInput
                label="Email Address"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                error={errors.email}
                required
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role">I am a</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => updateFormData("role", value)}
                >
                  <SelectTrigger
                    id="role"
                    className={errors.role ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supplier">Supplier</SelectItem>
                    <SelectItem value="merchant">Merchant</SelectItem>
                    <SelectItem value="consumer">Consumer</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.role}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Organization Affiliation</Label>
                <OrganizationSelector
                  organizations={ORGANIZATIONS}
                  onSelect={(org) => updateFormData("organizationId", org.id)}
                />

                {errors.organizationId && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.organizationId}
                  </p>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              {(formData.role === "supplier" ||
                formData.role === "merchant") && (
                <div className="space-y-4">
                  <TextInput
                    label="Company Name"
                    value={formData.companyName}
                    onChange={(e) =>
                      updateFormData("companyName", e.target.value)
                    }
                    error={errors.companyName}
                    required={
                      formData.role === "supplier" ||
                      formData.role === "merchant"
                    }
                  />

                  <TextInput
                    label="Job Title"
                    value={formData.jobTitle}
                    onChange={(e) => updateFormData("jobTitle", e.target.value)}
                  />
                </div>
              )}

              <PasswordInput
                label="Password"
                value={formData.password}
                onChange={(e) => updateFormData("password", e.target.value)}
                error={errors.password}
                strengthIndicator
                required
              />

              <PasswordInput
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  updateFormData("confirmPassword", e.target.value)
                }
                error={errors.confirmPassword}
                required
              />

              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) =>
                      updateFormData("acceptTerms", !!checked)
                    }
                  />

                  <Label
                    htmlFor="terms"
                    className={`text-sm ${errors.acceptTerms ? "text-destructive" : ""}`}
                  >
                    I accept the{" "}
                    <a
                      href="#"
                      className="text-primary underline hover:text-primary/90"
                    >
                      terms and conditions
                    </a>
                  </Label>
                </div>
                {errors.acceptTerms && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.acceptTerms}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="marketing"
                  checked={formData.acceptMarketing}
                  onCheckedChange={(checked) =>
                    updateFormData("acceptMarketing", !!checked)
                  }
                />

                <Label htmlFor="marketing" className="text-sm">
                  I would like to receive marketing communications
                </Label>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto bg-primary/10 rounded-full p-3 w-16 h-16 flex items-center justify-center">
                <CheckIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">
                Registration Successful!
              </h3>
              <p className="text-muted-foreground">
                Your account has been created successfully. You can now sign in
                with your credentials.
              </p>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 && step < 4 && (
          <Button type="button" variant="outline" onClick={handleBack}>
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}
        {step === 1 && <div />}

        {step < 3 && (
          <Button type="button" onClick={handleNext}>
            Next
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        )}

        {step === 3 && (
          <Button type="submit" onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        )}

        {step === 4 && (
          <Button type="button" className="w-full">
            Sign In
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
