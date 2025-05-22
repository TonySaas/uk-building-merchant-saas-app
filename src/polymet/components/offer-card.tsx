import { cn } from "@/lib/utils";
import { CalendarIcon, ExternalLinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CardBase from "@/polymet/components/card-base";

export interface OfferCardProps {
  productName: string;
  productImage?: string;
  currentPrice: number;
  originalPrice?: number;
  productSku?: string;
  merchantName?: string;
  merchantLogo?: string;
  expiryDate?: Date;
  isNew?: boolean;
  isFeatured?: boolean;
  isLimited?: boolean;
  onAddToCart?: () => void;
  onViewDetails?: () => void;
  productUrl?: string;
  size?: "small" | "medium" | "large";
}

export default function OfferCard({
  productName,
  productImage,
  currentPrice,
  originalPrice,
  productSku,
  merchantName,
  merchantLogo,
  expiryDate,
  isNew = false,
  isFeatured = false,
  isLimited = false,
  onAddToCart,
  onViewDetails,
  productUrl,
  size = "medium",
}: OfferCardProps) {
  // Calculate discount percentage if both prices are provided
  const discountPercentage =
    originalPrice && currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : null;

  // Check if offer is expired
  const isExpired = expiryDate ? new Date() > expiryDate : false;

  // Check if offer expires soon (within 24 hours)
  const expiresSoon =
    expiryDate &&
    !isExpired &&
    new Date().getTime() + 24 * 60 * 60 * 1000 > expiryDate.getTime();

  // Format expiry date
  const formatExpiryDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });
    }
  };

  // Size-based styles
  const sizeStyles = {
    small: {
      card: "max-w-[250px]",
      image: "h-32",
      title: "text-sm line-clamp-2",
      price: "text-lg",
      badge: "text-xs",
    },
    medium: {
      card: "max-w-[320px]",
      image: "h-40",
      title: "text-base line-clamp-2",
      price: "text-xl",
      badge: "text-xs",
    },
    large: {
      card: "max-w-[380px]",
      image: "h-48",
      title: "text-lg line-clamp-3",
      price: "text-2xl",
      badge: "text-sm",
    },
  };

  return (
    <CardBase
      className={cn("overflow-hidden", sizeStyles[size].card)}
      elevation="low"
    >
      {/* Image section */}
      {productImage && (
        <div className="relative">
          <img
            src={productImage}
            alt={productName}
            className={cn(
              "w-full object-cover",
              sizeStyles[size].image,
              isExpired && "opacity-70"
            )}
          />

          {/* Badges overlay */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isNew && (
              <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
            )}
            {isFeatured && (
              <Badge className="bg-purple-500 hover:bg-purple-600">
                Featured
              </Badge>
            )}
            {isLimited && (
              <Badge className="bg-orange-500 hover:bg-orange-600">
                Limited
              </Badge>
            )}
          </div>

          {/* Discount badge */}
          {discountPercentage && !isExpired && (
            <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
              -{discountPercentage}%
            </Badge>
          )}

          {/* Expired overlay */}
          {isExpired && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge
                variant="destructive"
                className="text-base px-3 py-1 uppercase"
              >
                Offer Expired
              </Badge>
            </div>
          )}
        </div>
      )}

      <div className="p-4">
        {/* Merchant info */}
        {merchantName && (
          <div className="flex items-center gap-2 mb-2">
            {merchantLogo && (
              <img
                src={merchantLogo}
                alt={merchantName}
                className="w-5 h-5 rounded-full"
              />
            )}
            <span className="text-xs text-muted-foreground">
              {merchantName}
            </span>
          </div>
        )}

        {/* Product name */}
        <h3
          className={cn(
            "font-medium mb-2",
            sizeStyles[size].title,
            isExpired && "text-muted-foreground"
          )}
        >
          {productName}
        </h3>

        {/* SKU */}
        {productSku && (
          <div className="text-xs text-muted-foreground mb-2">
            SKU: {productSku}
          </div>
        )}

        {/* Price section */}
        <div className="flex items-baseline gap-2 mb-3">
          <span
            className={cn(
              "font-bold",
              sizeStyles[size].price,
              isExpired ? "text-muted-foreground" : "text-primary"
            )}
          >
            £{currentPrice.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              £{originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Expiry date */}
        {expiryDate && (
          <div
            className={cn(
              "flex items-center text-xs gap-1 mb-3",
              expiresSoon && !isExpired
                ? "text-orange-500 dark:text-orange-400"
                : "text-muted-foreground"
            )}
          >
            <CalendarIcon className="h-3 w-3" />

            <span>
              {isExpired
                ? `Expired on ${formatExpiryDate(expiryDate)}`
                : `Ends ${formatExpiryDate(expiryDate)}`}
            </span>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col gap-2 mt-4">
          {onAddToCart && (
            <Button
              onClick={onAddToCart}
              disabled={isExpired}
              className="w-full"
              size={size === "small" ? "sm" : "default"}
            >
              Add to Cart
            </Button>
          )}

          <div className="flex gap-2">
            {onViewDetails && (
              <Button
                onClick={onViewDetails}
                variant="outline"
                className="flex-1"
                size={size === "small" ? "sm" : "default"}
              >
                View Details
              </Button>
            )}

            {productUrl && (
              <Button
                variant="outline"
                size={size === "small" ? "sm" : "default"}
                className={!onViewDetails ? "flex-1" : ""}
                asChild
              >
                <a
                  href={productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1"
                >
                  <ExternalLinkIcon className="h-3 w-3" />

                  {!onViewDetails && "Visit"}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </CardBase>
  );
}
