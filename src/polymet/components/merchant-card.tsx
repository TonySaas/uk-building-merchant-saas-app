import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ClockIcon,
  ExternalLinkIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react";
import { useState } from "react";
import CardBase from "@/polymet/components/card-base";

export interface MerchantCardProps {
  className?: string;
  name: string;
  logo: string;
  address?: string;
  city?: string;
  postcode?: string;
  phone?: string;
  website?: string;
  email?: string;
  isOpen?: boolean;
  openingHours?: {
    today?: string;
    schedule?: {
      [key: string]: string;
    };
  };
  distance?: number; // in miles
  rating?: number; // out of 5
  reviewCount?: number;
  specialOffers?: number;
  onViewOffers?: () => void;
  onGetDirections?: () => void;
  size?: "small" | "medium" | "large";
  variant?: "basic" | "detailed";
}

export default function MerchantCard({
  className,
  name,
  logo,
  address,
  city,
  postcode,
  phone,
  website,
  email,
  isOpen,
  openingHours,
  distance,
  rating,
  reviewCount,
  specialOffers,
  onViewOffers,
  onGetDirections,
  size = "medium",
  variant = "detailed",
}: MerchantCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showHours, setShowHours] = useState(false);

  // Format distance
  const formatDistance = (dist: number) => {
    return dist < 1
      ? `${(dist * 1760).toFixed(0)} yards`
      : `${dist.toFixed(1)} miles`;
  };

  // Format rating as stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={cn(
              "text-sm",
              star <= Math.round(rating)
                ? "text-yellow-500"
                : "text-gray-300 dark:text-gray-600"
            )}
          >
            ★
          </span>
        ))}
        <span className="ml-1 text-xs text-muted-foreground">
          ({reviewCount})
        </span>
      </div>
    );
  };

  // Size-based styles
  const sizeStyles = {
    small: {
      card: "max-w-[240px]",
      logo: "h-12 w-12",
      title: "text-sm font-medium",
      content: "text-xs",
    },
    medium: {
      card: "max-w-[320px]",
      logo: "h-16 w-16",
      title: "text-base font-medium",
      content: "text-sm",
    },
    large: {
      card: "max-w-[400px]",
      logo: "h-20 w-20",
      title: "text-lg font-medium",
      content: "text-base",
    },
  };

  return (
    <CardBase
      className={cn("overflow-hidden", sizeStyles[size].card, className)}
      padding={variant === "basic" ? "medium" : "none"}
      elevation={isHovered ? "medium" : "low"}
      interactive
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {variant === "detailed" && (
        <div className="p-4 flex items-center gap-4 border-b border-border">
          <div
            className={cn(
              "flex-shrink-0 bg-secondary rounded-md p-2 flex items-center justify-center",
              sizeStyles[size].logo
            )}
          >
            <img
              src={logo}
              alt={`${name} logo`}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={cn("truncate", sizeStyles[size].title)}>{name}</h3>
            {distance && (
              <div className="flex items-center text-xs text-muted-foreground">
                <MapPinIcon className="h-3 w-3 mr-1" />

                {formatDistance(distance)}
              </div>
            )}
            {isOpen !== undefined && (
              <Badge
                variant="outline"
                className={cn(
                  "mt-1",
                  isOpen
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                )}
              >
                {isOpen ? "Open Now" : "Closed"}
              </Badge>
            )}
          </div>
        </div>
      )}

      {variant === "basic" && (
        <div className="flex items-center gap-3 mb-3">
          <div
            className={cn(
              "flex-shrink-0 bg-secondary rounded-md p-2 flex items-center justify-center",
              sizeStyles[size].logo
            )}
          >
            <img
              src={logo}
              alt={`${name} logo`}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={cn("truncate", sizeStyles[size].title)}>{name}</h3>
            {isOpen !== undefined && (
              <Badge
                variant="outline"
                className={cn(
                  "mt-1",
                  isOpen
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                )}
              >
                {isOpen ? "Open Now" : "Closed"}
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Content section */}
      <div className={variant === "detailed" ? "p-4" : ""}>
        {/* Address */}
        {(address || city || postcode) && (
          <div
            className={cn(
              "flex items-start gap-2 mb-2",
              sizeStyles[size].content
            )}
          >
            <MapPinIcon className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />

            <div>
              {address && <div>{address}</div>}
              {city && postcode && <div>{`${city}, ${postcode}`}</div>}
              {city && !postcode && <div>{city}</div>}
              {!city && postcode && <div>{postcode}</div>}
            </div>
          </div>
        )}

        {/* Phone */}
        {phone && (
          <div
            className={cn(
              "flex items-center gap-2 mb-2",
              sizeStyles[size].content
            )}
          >
            <PhoneIcon className="h-4 w-4 text-muted-foreground" />

            <a href={`tel:${phone}`} className="text-primary hover:underline">
              {phone}
            </a>
          </div>
        )}

        {/* Opening hours */}
        {openingHours && (
          <div
            className={cn(
              "flex items-start gap-2 mb-2",
              sizeStyles[size].content
            )}
          >
            <ClockIcon className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />

            <div>
              {openingHours.today && (
                <div className="flex items-center justify-between">
                  <span>Today:</span>
                  <span className="font-medium">{openingHours.today}</span>
                </div>
              )}
              {openingHours.schedule && showHours && (
                <div className="mt-1 space-y-1">
                  {Object.entries(openingHours.schedule).map(([day, hours]) => (
                    <div
                      key={day}
                      className="flex items-center justify-between text-xs"
                    >
                      <span>{day}</span>
                      <span>{hours}</span>
                    </div>
                  ))}
                </div>
              )}
              {openingHours.schedule && (
                <button
                  onClick={() => setShowHours(!showHours)}
                  className="text-xs text-primary hover:underline mt-1"
                >
                  {showHours ? "Hide hours" : "Show all hours"}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Rating */}
        {rating !== undefined && reviewCount !== undefined && (
          <div className="mb-2">{renderStars(rating)}</div>
        )}

        {/* Special offers */}
        {specialOffers !== undefined && specialOffers > 0 && (
          <div className="mb-3">
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
            >
              {specialOffers} Special {specialOffers === 1 ? "Offer" : "Offers"}
            </Badge>
          </div>
        )}
      </div>

      {/* Action buttons */}
      {(onViewOffers || onGetDirections || website) && (
        <div
          className={cn(
            "flex gap-2",
            variant === "detailed" ? "p-4 pt-0" : "mt-3"
          )}
        >
          {onViewOffers && (
            <Button
              onClick={onViewOffers}
              className="flex-1"
              size={size === "small" ? "sm" : "default"}
            >
              View Offers
            </Button>
          )}

          {onGetDirections && (
            <Button
              onClick={onGetDirections}
              variant="outline"
              size={size === "small" ? "sm" : "default"}
            >
              Directions
            </Button>
          )}

          {website && (
            <Button
              onClick={() => window.open(website, "_blank")}
              variant="ghost"
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
