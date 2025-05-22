import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Organization {
  id: string;
  name: string;
  logo: string;
  description: string;
}

interface OrganizationSelectorProps {
  organizations: Organization[];
  onSelect?: (organization: Organization) => void;
}

export default function OrganizationSelector({
  organizations,
  onSelect,
}: OrganizationSelectorProps) {
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);

  const handleSelect = (org: Organization) => {
    setSelectedOrg(org.id);
    if (onSelect) {
      onSelect(org);
    }
  };

  return (
    <div className="w-full">
      <h2 className="mb-6 text-center text-2xl font-bold tracking-tight md:text-3xl">
        Organisation
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {organizations.map((org) => (
          <Card
            key={org.id}
            className={cn(
              "cursor-pointer transition-all duration-300 hover:shadow-lg",
              selectedOrg === org.id
                ? "border-2 border-primary shadow-md"
                : "border border-border hover:border-primary/50"
            )}
            onClick={() => handleSelect(org)}
          >
            <CardContent className="flex flex-col items-center justify-center p-4">
              <div className="mb-3 flex h-16 items-center justify-center bg-secondary p-2">
                <img
                  src={org.logo}
                  alt={`${org.name} logo`}
                  className="h-12 max-w-full object-contain"
                />
              </div>
              <h3 className="text-center text-lg font-medium">{org.name}</h3>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                {org.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
