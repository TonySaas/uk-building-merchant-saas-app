import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPinIcon,
  PhoneIcon,
  GlobeIcon,
  ClockIcon,
  NavigationIcon,
} from "lucide-react";

export interface MerchantDetailCardProps {
  merchant: {
    id: string;
    name: string;
    logo: string;
    address: string;
    city: string;
    postcode: string;
    phone?: string;
    website?: string;
    isOpen: boolean;
    openingHours?: {
      today: string;
      schedule?: Record<string, string>;
    };
    distance: number;
    hasStock?: boolean;
    stockLevel?: "high" | "medium" | "low" | "out_of_stock";
    organization?: string;
    categories?: string[];
  };
  onClose?: () => void;
  onViewDirections?: (merchant: any) => void;
  onViewOffers?: (merchant: any) => void;
}

export default function MerchantDetailCard({
  merchant,
  onClose,
  onViewDirections,
  onViewOffers,
}: MerchantDetailCardProps) {
  const getStockLevelBadge = () => {
    if (merchant.stockLevel === undefined) return null;

    const variants = {
      high: <Badge className="bg-green-500">In Stock</Badge>,

      medium: <Badge className="bg-green-500">In Stock</Badge>,

      low: <Badge className="bg-amber-500">Low Stock</Badge>,

      out_of_stock: <Badge variant="destructive">Out of Stock</Badge>,
    };

    return variants[merchant.stockLevel];
  };

  return (
    <Card className="w-full shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={merchant.logo}
            alt={merchant.name}
            className="w-12 h-12 rounded-md object-cover"
          />

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg">{merchant.name}</h3>
              {onClose && (
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Badge variant={merchant.isOpen ? "default" : "secondary"}>
                {merchant.isOpen ? "Open Now" : "Closed"}
              </Badge>
              {getStockLevelBadge()}
            </div>
          </div>
        </div>

        <div className="space-y-2 text-sm mb-4">
          <div className="flex items-start gap-2">
            <MapPinIcon className="h-4 w-4 mt-0.5 text-muted-foreground" />

            <div>
              <p>{merchant.address}</p>
              <p>
                {merchant.city}, {merchant.postcode}
              </p>
              <p className="text-muted-foreground">
                {merchant.distance.toFixed(1)} miles away
              </p>
            </div>
          </div>

          {merchant.phone && (
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 text-muted-foreground" />

              <a href={`tel:${merchant.phone}`} className="hover:underline">
                {merchant.phone}
              </a>
            </div>
          )}

          {merchant.website && (
            <div className="flex items-center gap-2">
              <GlobeIcon className="h-4 w-4 text-muted-foreground" />

              <a
                href={merchant.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline truncate max-w-[200px]"
              >
                {merchant.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}

          {merchant.openingHours && (
            <div className="flex items-start gap-2">
              <ClockIcon className="h-4 w-4 mt-0.5 text-muted-foreground" />

              <div>
                <p>
                  <span className="font-medium">Today:</span>{" "}
                  {merchant.openingHours.today}
                </p>
              </div>
            </div>
          )}

          {merchant.categories && merchant.categories.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {merchant.categories.map((category) => (
                <Badge key={category} variant="outline" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          {onViewDirections && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onViewDirections(merchant)}
            >
              <NavigationIcon className="h-4 w-4 mr-1" />
              Directions
            </Button>
          )}

          {onViewOffers && (
            <Button
              size="sm"
              className="flex-1"
              onClick={() => onViewOffers(merchant)}
            >
              View Offers
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
