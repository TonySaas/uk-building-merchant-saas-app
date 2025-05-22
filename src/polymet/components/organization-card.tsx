import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckIcon, ExternalLinkIcon } from "lucide-react";
import { useState } from "react";
import CardBase from "@/polymet/components/card-base";

export interface OrganizationCardProps {
  className?: string;
  name: string;
  logo: string;
  description?: string;
  website?: string;
  membershipStatus?: "active" | "pending" | "expired" | "none";
  memberSince?: string;
  membershipLevel?: "standard" | "premium" | "enterprise";
  campaigns?: string[];
  onSelect?: () => void;
  onViewDetails?: () => void;
  selected?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "default" | "compact" | "detailed";
}

export default function OrganizationCard({
  className,
  name,
  logo,
  description,
  website,
  membershipStatus = "none",
  memberSince,
  membershipLevel,
  campaigns,
  onSelect,
  onViewDetails,
  selected = false,
  size = "medium",
  variant = "default",
}: OrganizationCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Size-based styles
  const sizeStyles = {
    small: {
      card: "max-w-[240px]",
      logo: "h-10",
      title: "text-sm font-medium",
      description: "text-xs",
    },
    medium: {
      card: "max-w-[320px]",
      logo: "h-14",
      title: "text-base font-medium",
      description: "text-sm",
    },
    large: {
      card: "max-w-[400px]",
      logo: "h-20",
      title: "text-lg font-medium",
      description: "text-base",
    },
  };

  // Membership status styles
  const statusStyles = {
    active: {
      badge:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      text: "Active",
    },
    pending: {
      badge:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      text: "Pending",
    },
    expired: {
      badge: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      text: "Expired",
    },
    none: {
      badge: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
      text: "Not a Member",
    },
  };

  // Membership level styles
  const levelStyles = {
    standard: {
      badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      text: "Standard",
    },
    premium: {
      badge:
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      text: "Premium",
    },
    enterprise: {
      badge:
        "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
      text: "Enterprise",
    },
  };

  return (
    <CardBase
      className={cn(
        "overflow-hidden",
        sizeStyles[size].card,
        selected && "border-2 border-primary shadow-md",
        className
      )}
      padding={variant === "compact" ? "small" : "medium"}
      elevation={isHovered || selected ? "medium" : "low"}
      interactive={!!onSelect}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo and name section */}
      <div
        className={cn(
          "flex",
          variant === "compact" ? "items-center" : "flex-col items-center"
        )}
      >
        <div
          className={cn(
            "bg-secondary p-3 rounded-md flex items-center justify-center",
            variant === "compact" ? "mr-3" : "mb-3 w-full"
          )}
        >
          <img
            src={logo}
            alt={`${name} logo`}
            className={cn(
              "max-w-full object-contain",
              sizeStyles[size].logo,
              variant === "compact" ? "h-8" : ""
            )}
          />
        </div>

        <div
          className={cn(
            variant === "compact" ? "flex-1" : "text-center w-full"
          )}
        >
          <h3
            className={cn(
              sizeStyles[size].title,
              variant === "compact" ? "" : "mt-2"
            )}
          >
            {name}
          </h3>

          {/* Description (not shown in compact variant) */}
          {description && variant !== "compact" && (
            <p
              className={cn(
                "text-muted-foreground mt-1",
                sizeStyles[size].description
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Selected indicator */}
      {selected && (
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-0.5">
          <CheckIcon className="h-4 w-4" />
        </div>
      )}

      {/* Membership information (detailed variant only) */}
      {variant === "detailed" && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2 mb-3">
            {membershipStatus && (
              <Badge
                variant="outline"
                className={statusStyles[membershipStatus].badge}
              >
                {statusStyles[membershipStatus].text}
              </Badge>
            )}

            {membershipLevel && (
              <Badge
                variant="outline"
                className={levelStyles[membershipLevel].badge}
              >
                {levelStyles[membershipLevel].text}
              </Badge>
            )}
          </div>

          {memberSince && (
            <p className="text-xs text-muted-foreground mb-3">
              Member since: {memberSince}
            </p>
          )}

          {campaigns && campaigns.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-medium mb-1">Active Campaigns:</p>
              <div className="flex flex-wrap gap-1">
                {campaigns.map((campaign, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {campaign}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action buttons */}
      {(onViewDetails || website) && (
        <div
          className={cn("flex gap-2", variant === "detailed" ? "mt-0" : "mt-4")}
        >
          {onViewDetails && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails();
              }}
              className="flex-1"
              size={size === "small" ? "sm" : "default"}
            >
              View Details
            </Button>
          )}

          {website && (
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                window.open(website, "_blank");
              }}
              size={size === "small" ? "sm" : "default"}
            >
              <ExternalLinkIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </CardBase>
  );
}
