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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BuildingIcon, UserIcon, ShoppingCartIcon } from "lucide-react";

interface RoleBasedRegistrationFormProps {
  onSubmit?: (data: any) => void;
  loading?: boolean;
}

type UserRole = "supplier" | "merchant" | "consumer" | "";

export default function RoleBasedRegistrationForm({
  onSubmit,
  loading = false,
}: RoleBasedRegistrationFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "" as UserRole,
    companyName: "",
    jobTitle: "",
    companySize: "",
    industry: "",
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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.role) newErrors.role = "Please select a role";

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Create your account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label>I am a</Label>
            <div className="grid grid-cols-3 gap-4">
              <div
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  formData.role === "supplier"
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/50"
                }`}
                onClick={() => updateFormData("role", "supplier")}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="bg-primary/10 rounded-full p-2">
                    <BuildingIcon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium">Supplier</h3>
                  <p className="text-xs text-muted-foreground">
                    Sell products to merchants
                  </p>
                </div>
              </div>

              <div
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  formData.role === "merchant"
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/50"
                }`}
                onClick={() => updateFormData("role", "merchant")}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="bg-primary/10 rounded-full p-2">
                    <ShoppingCartIcon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium">Merchant</h3>
                  <p className="text-xs text-muted-foreground">
                    Sell to consumers
                  </p>
                </div>
              </div>

              <div
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  formData.role === "consumer"
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/50"
                }`}
                onClick={() => updateFormData("role", "consumer")}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="bg-primary/10 rounded-full p-2">
                    <UserIcon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium">Consumer</h3>
                  <p className="text-xs text-muted-foreground">
                    Find special offers
                  </p>
                </div>
              </div>
            </div>
            {errors.role && (
              <p className="text-sm font-medium text-destructive">
                {errors.role}
              </p>
            )}
          </div>

          <Separator />

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

          {(formData.role === "supplier" || formData.role === "merchant") && (
            <div className="space-y-4">
              <TextInput
                label="Company Name"
                value={formData.companyName}
                onChange={(e) => updateFormData("companyName", e.target.value)}
                error={errors.companyName}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <TextInput
                  label="Job Title"
                  value={formData.jobTitle}
                  onChange={(e) => updateFormData("jobTitle", e.target.value)}
                />

                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select
                    value={formData.companySize}
                    onValueChange={(value) =>
                      updateFormData("companySize", value)
                    }
                  >
                    <SelectTrigger id="companySize">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="501+">501+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {formData.role === "supplier" && (
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) => updateFormData("industry", value)}
                  >
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tools">Tools & Equipment</SelectItem>
                      <SelectItem value="building-materials">
                        Building Materials
                      </SelectItem>
                      <SelectItem value="plumbing">
                        Plumbing & Heating
                      </SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="timber">Timber & Joinery</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
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
          </div>

          <div className="space-y-2">
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
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="w-full"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </CardFooter>
    </Card>
  );
}
