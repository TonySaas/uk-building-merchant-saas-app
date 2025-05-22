import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ShoppingCartIcon,
  EyeIcon,
  CalendarIcon,
  PackageIcon,
  TagIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface MerchantOfferCardProps {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  image?: string;
  startDate?: string;
  endDate?: string;
  organization: {
    id: string;
    name: string;
    logo: string;
  };
  category: string;
  sku: string;
  stockStatus: "in-stock" | "low-stock" | "out-of-stock";
  stockQuantity?: number;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export default function MerchantOfferCard({
  id,
  title,
  description,
  originalPrice,
  discountedPrice,
  discountPercentage,
  image,
  startDate,
  endDate,
  organization,
  category,
  sku,
  stockStatus,
  stockQuantity,
  isSelected = false,
  onSelect,
  onAddToCart,
  onViewDetails,
}: MerchantOfferCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  const stockStatusConfig = {
    "in-stock": {
      label: "In Stock",
      color:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      showQuantity: true,
    },
    "low-stock": {
      label: "Low Stock",
      color:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
      showQuantity: true,
    },
    "out-of-stock": {
      label: "Out of Stock",
      color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      showQuantity: false,
    },
  };

  const stockInfo = stockStatusConfig[stockStatus];

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-200 h-full",
        isSelected ? "border-primary border-2" : "hover:border-primary/50",
        isHovered ? "shadow-md" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {onSelect && (
          <div className="absolute top-2 left-2 z-10">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onSelect(id)}
              className="h-5 w-5 border-2 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            />
          </div>
        )}

        {image ? (
          <div className="relative h-48 w-full">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />

            {discountPercentage > 0 && (
              <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
                {discountPercentage}% OFF
              </Badge>
            )}
          </div>
        ) : (
          <div className="h-48 w-full bg-muted flex items-center justify-center">
            <PackageIcon className="h-12 w-12 text-muted-foreground" />

            {discountPercentage > 0 && (
              <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
                {discountPercentage}% OFF
              </Badge>
            )}
          </div>
        )}
      </div>

      <CardContent className="p-4 flex flex-col h-[calc(100%-12rem)]">
        <div className="flex items-center mb-2">
          <img
            src={organization.logo}
            alt={organization.name}
            className="h-6 w-6 rounded-full mr-2 object-contain"
          />

          <span className="text-sm text-muted-foreground">
            {organization.name}
          </span>
        </div>

        <h3 className="font-semibold text-lg line-clamp-2 mb-1">{title}</h3>

        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs">
            <TagIcon className="h-3 w-3 mr-1" />

            {category}
          </Badge>
          <Badge variant="outline" className={cn("text-xs", stockInfo.color)}>
            {stockInfo.label}
            {stockInfo.showQuantity &&
              stockQuantity !== undefined &&
              ` (${stockQuantity})`}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-2 flex-grow">
          {description}
        </p>

        {(startDate || endDate) && (
          <div className="flex items-center text-xs text-muted-foreground mb-2">
            <CalendarIcon className="h-3 w-3 mr-1" />
            {formattedStartDate} - {formattedEndDate || "Ongoing"}
          </div>
        )}

        <div className="flex items-baseline mb-3">
          <span className="text-lg font-bold">
            £{discountedPrice.toFixed(2)}
          </span>
          {originalPrice > discountedPrice && (
            <span className="ml-2 text-sm text-muted-foreground line-through">
              £{originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <div className="text-xs text-muted-foreground mb-3">SKU: {sku}</div>

        <div className="flex gap-2 mt-auto">
          {onViewDetails && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onViewDetails(id)}
            >
              <EyeIcon className="h-4 w-4 mr-1" />
              Details
            </Button>
          )}
          {onAddToCart && (
            <Button
              size="sm"
              className="flex-1"
              disabled={stockStatus === "out-of-stock"}
              onClick={() => onAddToCart(id)}
            >
              <ShoppingCartIcon className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
