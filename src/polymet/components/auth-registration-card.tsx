import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegistrationForm from "@/polymet/components/registration-form";
import { ORGANIZATIONS } from "@/polymet/data/organization-data";

interface AuthRegistrationCardProps {
  title?: string;
  description?: string;
  onSubmit?: (data: any) => void;
  loading?: boolean;
  showTrustedOrgs?: boolean;
}

export default function AuthRegistrationCard({
  title = "Create an account",
  description = "Enter your details to create your account",
  onSubmit,
  loading = false,
  showTrustedOrgs = true,
}: AuthRegistrationCardProps) {
  return (
    <>
      <CardHeader className="space-y-1 pt-6">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <RegistrationForm onSubmit={onSubmit} loading={loading} />

        {showTrustedOrgs && (
          <div className="mt-6">
            <p className="text-center text-xs text-muted-foreground mb-3">
              Trusted by leading organizations
            </p>
            <div className="flex items-center justify-center space-x-4">
              {ORGANIZATIONS.slice(0, 4).map((org) => (
                <img
                  key={org.id}
                  src={org.logo}
                  alt={org.name}
                  className="h-6 w-auto opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </>
  );
}
