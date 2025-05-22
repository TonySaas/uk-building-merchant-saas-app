import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import AuthTabs from "@/polymet/components/auth-tabs";
import MultiStepRegistration from "@/polymet/components/multi-step-registration";
import RoleBasedRegistrationForm from "@/polymet/components/role-based-registration-form";
import OrganizationVerificationStep from "@/polymet/components/organization-verification-step";
import { ORGANIZATIONS } from "@/polymet/data/organization-data";

export default function LoginPage() {
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registrationType, setRegistrationType] = useState<
    "standard" | "multi-step" | "role-based" | "verification"
  >("standard");

  const handleLogin = (data: any) => {
    setLoginLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Login submitted:", data);
      setLoginLoading(false);
    }, 1500);
  };

  const handleRegister = (data: any) => {
    setRegisterLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Registration submitted:", data);
      setRegisterLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="auth" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="auth">Login / Register</TabsTrigger>
          <TabsTrigger value="demo">Registration Flows</TabsTrigger>
        </TabsList>

        <TabsContent value="auth">
          <AuthTabs
            onLogin={handleLogin}
            onRegister={handleRegister}
            loginLoading={loginLoading}
            registerLoading={registerLoading}
          />

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              Need help?{" "}
              <Link to="#" className="text-primary hover:underline">
                Contact support
              </Link>
            </p>
          </div>
        </TabsContent>

        <TabsContent value="demo">
          <Card className="mb-6">
            <div className="p-4 bg-muted/50 rounded-t-lg">
              <h3 className="font-medium">Registration Flow Demos</h3>
              <p className="text-sm text-muted-foreground">
                Explore different registration flows for the BuildConnect
                platform
              </p>
            </div>
            <div className="p-4 grid grid-cols-2 gap-2">
              <button
                className={`p-3 rounded-lg text-sm text-left transition-all ${
                  registrationType === "standard"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
                onClick={() => setRegistrationType("standard")}
              >
                Standard Registration
              </button>
              <button
                className={`p-3 rounded-lg text-sm text-left transition-all ${
                  registrationType === "multi-step"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
                onClick={() => setRegistrationType("multi-step")}
              >
                Multi-step Registration
              </button>
              <button
                className={`p-3 rounded-lg text-sm text-left transition-all ${
                  registrationType === "role-based"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
                onClick={() => setRegistrationType("role-based")}
              >
                Role-based Registration
              </button>
              <button
                className={`p-3 rounded-lg text-sm text-left transition-all ${
                  registrationType === "verification"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
                onClick={() => setRegistrationType("verification")}
              >
                Organization Verification
              </button>
            </div>
          </Card>

          {registrationType === "standard" && (
            <Card>
              <AuthTabs
                defaultTab="register"
                onRegister={handleRegister}
                registerLoading={registerLoading}
              />
            </Card>
          )}

          {registrationType === "multi-step" && (
            <MultiStepRegistration
              onSubmit={handleRegister}
              loading={registerLoading}
            />
          )}

          {registrationType === "role-based" && (
            <RoleBasedRegistrationForm
              onSubmit={handleRegister}
              loading={registerLoading}
            />
          )}

          {registrationType === "verification" && (
            <OrganizationVerificationStep
              organizationName={ORGANIZATIONS[0].name}
              organizationLogo={ORGANIZATIONS[0].logo}
              onVerify={(code) => console.log("Verification code:", code)}
              onBack={() => setRegistrationType("standard")}
              onComplete={() => setRegistrationType("standard")}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
