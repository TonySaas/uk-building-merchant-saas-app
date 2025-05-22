import React from "react";
import { Link } from "react-router-dom";
import AuthTabs from "@/polymet/components/auth-tabs";
import { ORGANIZATIONS } from "@/polymet/data/organization-data";
import { ShieldCheckIcon } from "lucide-react";

export default function RegisterPage() {
  const [loading, setLoading] = React.useState(false);

  const handleRegister = (data: any) => {
    setLoading(true);
    // In a real application, this would be an API call
    setTimeout(() => {
      console.log("Registration data:", data);
      setLoading(false);
      // Redirect would happen here after successful registration
    }, 1500);
  };

  const handleLogin = (data: any) => {
    console.log("Login data:", data);
    // In a real application, this would be an API call
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex justify-center mb-8">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://assets.polymet.ai/legal-white-266853"
            alt="BuildConnect Logo"
            className="h-8"
          />

          <span className="text-xl font-bold">BuildConnect</span>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">
            Join the UK Building Merchant Ecosystem
          </h1>
          <p className="text-muted-foreground mb-6">
            Create an account to access exclusive promotions, connect with
            suppliers, and streamline your building materials procurement
            process.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 bg-primary/10 p-1.5 rounded-full text-primary">
                <ShieldCheckIcon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-medium">Secure Platform</h3>
                <p className="text-sm text-muted-foreground">
                  Your data is encrypted and securely stored
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 bg-primary/10 p-1.5 rounded-full text-primary">
                <ShieldCheckIcon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-medium">Verified Suppliers</h3>
                <p className="text-sm text-muted-foreground">
                  All suppliers on our platform are vetted and verified
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 bg-primary/10 p-1.5 rounded-full text-primary">
                <ShieldCheckIcon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-medium">Data Privacy</h3>
                <p className="text-sm text-muted-foreground">
                  We never share your information without permission
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-3">
              Trusted by leading organizations
            </p>
            <div className="flex flex-wrap items-center gap-6">
              {ORGANIZATIONS.map((org) => (
                <div key={org.id} className="h-8">
                  <img
                    src={org.logo}
                    alt={org.name}
                    className="h-full object-contain opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <AuthTabs
            defaultTab="register"
            onRegister={handleRegister}
            onLogin={handleLogin}
            registerLoading={loading}
          />
        </div>
      </div>
    </div>
  );
}
