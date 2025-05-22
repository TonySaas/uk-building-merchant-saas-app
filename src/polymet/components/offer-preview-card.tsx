import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, TagIcon, BuildingIcon } from "lucide-react";

export interface OfferPreviewCardProps {
  title: string;
  description: string;
  originalPrice?: string | number;
  discountedPrice?: string | number;
  discountPercentage?: string | number;
  mainImageUrl?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  category?: string;
  organizations?: string[];
  sku?: string;
  onViewDetails?: () => void;
}

export function OfferPreviewCard({
  title,
  description,
  originalPrice,
  discountedPrice,
  discountPercentage,
  mainImageUrl,
  startDate,
  endDate,
  category,
  organizations = [],
  sku,
  onViewDetails,
}: OfferPreviewCardProps) {
  // Format dates if they exist
  const formattedStartDate = startDate
    ? new Date(startDate).toLocaleDateString()
    : null;
  const formattedEndDate = endDate
    ? new Date(endDate).toLocaleDateString()
    : null;

  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          {mainImageUrl ? (
            <img
              src={mainImageUrl}
              alt={title}
              className="w-full h-64 object-contain bg-white p-2"
            />
          ) : (
            <div className="w-full h-64 bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">No image available</p>
            </div>
          )}

          {discountPercentage && (
            <Badge className="absolute top-2 right-2 bg-red-500">
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>

        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>

          <div className="flex items-baseline gap-3 mb-4">
            {discountedPrice && (
              <span className="text-xl font-bold">
                £
                {typeof discountedPrice === "number"
                  ? discountedPrice.toFixed(2)
                  : discountedPrice}
              </span>
            )}

            {originalPrice && (
              <span className="text-muted-foreground line-through">
                £
                {typeof originalPrice === "number"
                  ? originalPrice.toFixed(2)
                  : originalPrice}
              </span>
            )}
          </div>

          <p className="text-muted-foreground mb-4 line-clamp-3">
            {description}
          </p>

          <div className="space-y-2 mb-4">
            {category && (
              <div className="flex items-center gap-2 text-sm">
                <TagIcon className="h-4 w-4 text-muted-foreground" />

                <span>{category}</span>
              </div>
            )}

            {formattedStartDate && formattedEndDate && (
              <div className="flex items-center gap-2 text-sm">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />

                <span>
                  {formattedStartDate} - {formattedEndDate}
                </span>
              </div>
            )}

            {organizations.length > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <BuildingIcon className="h-4 w-4 text-muted-foreground" />

                <span>
                  {organizations.length} organization
                  {organizations.length !== 1 ? "s" : ""}
                </span>
              </div>
            )}

            {sku && (
              <div className="text-xs text-muted-foreground">SKU: {sku}</div>
            )}
          </div>

          {onViewDetails && (
            <Button onClick={onViewDetails} className="w-full">
              View Details
            </Button>
          )}
        </CardContent>
      </div>
    </Card>
  );
}
