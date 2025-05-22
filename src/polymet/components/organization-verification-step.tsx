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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  MailIcon,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface OrganizationVerificationStepProps {
  organizationName?: string;
  organizationLogo?: string;
  email?: string;
  onVerify?: (verificationCode: string) => void;
  onBack?: () => void;
  onComplete?: () => void;
  loading?: boolean;
}

export default function OrganizationVerificationStep({
  organizationName = "BuildConnect",
  organizationLogo,
  email = "",
  onVerify,
  onBack,
  onComplete,
  loading = false,
}: OrganizationVerificationStepProps) {
  const [step, setStep] = useState<"email" | "code" | "complete">("email");
  const [verificationEmail, setVerificationEmail] = useState(email);
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationEmail) {
      setError("Please enter your email address");
      return;
    }

    setError("");
    setStep("code");
    // In a real app, this would trigger sending the verification code
  };

  const handleVerify = () => {
    if (verificationCode.length !== 6) {
      setError("Please enter a valid verification code");
      return;
    }

    setError("");
    if (onVerify) {
      onVerify(verificationCode);
    }

    // For demo purposes, we'll just move to the complete step
    setStep("complete");
  };

  const handleResendCode = () => {
    setIsResending(true);
    // Simulate API call to resend code
    setTimeout(() => {
      setIsResending(false);
    }, 1500);
  };

  const getProgressValue = () => {
    switch (step) {
      case "email":
        return 33;
      case "code":
        return 66;
      case "complete":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Organization Verification</CardTitle>
          {organizationLogo && (
            <img
              src={organizationLogo}
              alt={organizationName}
              className="h-8 w-auto"
            />
          )}
        </div>
        <Progress value={getProgressValue()} className="h-2" />
      </CardHeader>
      <CardContent>
        {step === "email" && (
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg flex items-start space-x-3">
              <div className="bg-primary/10 rounded-full p-2">
                <MailIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">
                  Verify your organization affiliation
                </h3>
                <p className="text-sm text-muted-foreground">
                  To confirm your affiliation with {organizationName}, we'll
                  send a verification code to your organization email address.
                </p>
              </div>
            </div>

            <form onSubmit={handleEmailSubmit}>
              <EmailInput
                label="Organization Email Address"
                value={verificationEmail}
                onChange={(e) => setVerificationEmail(e.target.value)}
                placeholder="name@organization.com"
                error={error}
                required
              />
            </form>
          </div>
        )}

        {step === "code" && (
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-center">
                We've sent a 6-digit verification code to{" "}
                <strong>{verificationEmail}</strong>
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="verification-code">Enter verification code</Label>
              <div className="flex justify-center py-4">
                <InputOTP
                  maxLength={6}
                  value={verificationCode}
                  onChange={setVerificationCode}
                  render={({ slots }) => (
                    <InputOTPGroup>
                      {slots.map((slot, index) => (
                        <InputOTPSlot key={index} {...slot} />
                      ))}
                    </InputOTPGroup>
                  )}
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            <div className="text-center">
              <Button
                variant="link"
                size="sm"
                onClick={handleResendCode}
                disabled={isResending}
              >
                {isResending ? "Sending..." : "Didn't receive a code? Resend"}
              </Button>
            </div>
          </div>
        )}

        {step === "complete" && (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto bg-green-100 dark:bg-green-900/30 rounded-full p-3 w-16 h-16 flex items-center justify-center">
              <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold">Verification Successful!</h3>
            <p className="text-muted-foreground">
              Your affiliation with {organizationName} has been verified
              successfully.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step !== "complete" && (
          <Button type="button" variant="outline" onClick={onBack}>
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}

        {step === "email" && (
          <Button type="submit" onClick={handleEmailSubmit}>
            Send Code
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        )}

        {step === "code" && (
          <Button type="button" onClick={handleVerify} disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </Button>
        )}

        {step === "complete" && (
          <Button type="button" className="w-full" onClick={onComplete}>
            Continue
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
