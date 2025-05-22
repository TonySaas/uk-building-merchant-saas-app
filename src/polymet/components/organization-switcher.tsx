import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Organization {
  id: string;
  name: string;
  logo: string;
  description?: string;
}

interface OrganizationSwitcherProps {
  organizations: Organization[];
  currentOrganizationId?: string;
  onOrganizationChange?: (orgId: string) => void;
  className?: string;
  disabled?: boolean;
}

export function OrganizationSwitcher({
  organizations,
  currentOrganizationId,
  onOrganizationChange,
  className,
  disabled = false,
}: OrganizationSwitcherProps) {
  const [open, setOpen] = useState(false);

  const currentOrg =
    organizations.find((org) => org.id === currentOrganizationId) ||
    organizations[0];

  const handleSelect = (orgId: string) => {
    if (onOrganizationChange) {
      onOrganizationChange(orgId);
    }
    setOpen(false);
  };

  return (
    <Popover open={open && !disabled} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select organization"
          className={cn(
            "flex items-center justify-between gap-2 w-[220px] px-3",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          disabled={disabled}
        >
          <div className="flex items-center gap-2 truncate">
            {currentOrg && (
              <Avatar className="h-5 w-5">
                <AvatarImage
                  src={currentOrg.logo}
                  alt={`${currentOrg.name} logo`}
                />

                <AvatarFallback>{currentOrg.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <span className="truncate">
              {currentOrg?.name || "Select organization"}
            </span>
          </div>
          <ChevronDownIcon className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandInput placeholder="Search organizations..." />

          <CommandEmpty>No organization found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {organizations.map((org) => (
                <CommandItem
                  key={org.id}
                  value={org.id}
                  onSelect={() => handleSelect(org.id)}
                  className="flex items-center gap-2 py-2"
                >
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={org.logo} alt={`${org.name} logo`} />

                    <AvatarFallback>{org.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{org.name}</span>
                    {org.description && (
                      <span className="text-xs text-muted-foreground truncate max-w-[160px]">
                        {org.description}
                      </span>
                    )}
                  </div>
                  {org.id === currentOrganizationId && (
                    <CheckIcon className="ml-auto h-4 w-4" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
