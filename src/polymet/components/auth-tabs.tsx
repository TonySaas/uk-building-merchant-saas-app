import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { TextInput } from "@/polymet/components/text-input";
import { PasswordInput } from "@/polymet/components/password-input";
import { Checkbox } from "@/polymet/components/checkbox-group";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  GoogleLogo,
  AppleLogo,
  MicrosoftLogo,
  GithubLogo,
} from "@/polymet/components/auth-social-logos";
import AuthRegistrationCard from "@/polymet/components/auth-registration-card";

interface AuthTabsProps {
  onLogin?: (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => void;
  onRegister?: (data: any) => void;
  loginLoading?: boolean;
  registerLoading?: boolean;
  defaultTab?: "login" | "register";
}

export default function AuthTabs({
  onLogin,
  onRegister,
  loginLoading = false,
  registerLoading = false,
  defaultTab = "login",
}: AuthTabsProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin) {
      onLogin({ email, password, rememberMe });
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <Tabs
        defaultValue={defaultTab}
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "login" | "register")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        {/* Login Tab */}
        <TabsContent value="login">
          <form onSubmit={handleLogin}>
            <CardHeader className="space-y-1 pt-6">
              <h2 className="text-2xl font-semibold">Welcome back</h2>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to access your account
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <TextInput
                label="Email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                  />

                  <Label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none"
                  >
                    Remember me
                  </Label>
                </div>
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm"
                  type="button"
                >
                  Forgot password?
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={loginLoading}>
                {loginLoading ? "Signing in..." : "Sign in"}
              </Button>

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <span className="relative bg-background px-2 text-xs text-muted-foreground">
                  OR CONTINUE WITH
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <Button variant="outline" size="icon" type="button">
                  <GoogleLogo />
                </Button>
                <Button variant="outline" size="icon" type="button">
                  <AppleLogo />
                </Button>
                <Button variant="outline" size="icon" type="button">
                  <MicrosoftLogo />
                </Button>
                <Button variant="outline" size="icon" type="button">
                  <GithubLogo />
                </Button>
              </div>
            </CardFooter>
          </form>
        </TabsContent>

        {/* Register Tab */}
        <TabsContent value="register">
          <AuthRegistrationCard
            onSubmit={onRegister}
            loading={registerLoading}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
