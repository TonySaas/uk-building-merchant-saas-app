import React, { useState } from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  MapPinIcon,
  StoreIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface MerchantLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  postcode: string;
  isOpen: boolean;
  hasStock?: boolean;
  stockLevel?: "high" | "medium" | "low" | "out_of_stock";
}

export interface MerchantGroup {
  id: string;
  name: string;
  logo: string;
  locations: MerchantLocation[];
  totalLocations: number;
}

interface MerchantTreeViewProps {
  merchants: MerchantGroup[];
  selectedMerchant?: string;
  selectedLocation?: string;
  onSelectLocation: (merchantId: string, locationId: string) => void;
  className?: string;
  maxHeight?: string | number;
}

export default function MerchantTreeView({
  merchants,
  selectedMerchant,
  selectedLocation,
  onSelectLocation,
  className,
  maxHeight = "600px",
}: MerchantTreeViewProps) {
  const [expandedMerchants, setExpandedMerchants] = useState<
    Record<string, boolean>
  >(
    merchants.reduce(
      (acc, merchant) => {
        // Auto-expand the merchant that has the selected location
        acc[merchant.id] = merchant.id === selectedMerchant;
        return acc;
      },
      {} as Record<string, boolean>
    )
  );

  const toggleMerchant = (merchantId: string) => {
    setExpandedMerchants((prev) => ({
      ...prev,
      [merchantId]: !prev[merchantId],
    }));
  };

  const getStockLevelIndicator = (
    stockLevel?: "high" | "medium" | "low" | "out_of_stock"
  ) => {
    if (!stockLevel) return null;

    const colors = {
      high: "bg-green-500",
      medium: "bg-green-500",
      low: "bg-amber-500",
      out_of_stock: "bg-red-500",
    };

    return (
      <span
        className={`inline-block w-2 h-2 rounded-full ${colors[stockLevel]}`}
      />
    );
  };

  return (
    <div className={cn("border rounded-md", className)}>
      <div className="p-3 border-b bg-muted/40">
        <h3 className="font-medium flex items-center gap-2">
          <StoreIcon className="h-4 w-4" />
          Merchant Locations
        </h3>
      </div>

      <ScrollArea
        className={cn(
          "p-2",
          typeof maxHeight === "number"
            ? `h-[${maxHeight}px]`
            : `h-${maxHeight}`
        )}
      >
        <div className="space-y-1">
          {merchants.map((merchant) => (
            <div key={merchant.id} className="space-y-1">
              <button
                onClick={() => toggleMerchant(merchant.id)}
                className={cn(
                  "flex items-center gap-2 w-full p-2 rounded-md hover:bg-muted text-left",
                  expandedMerchants[merchant.id] && "bg-muted/50"
                )}
              >
                {expandedMerchants[merchant.id] ? (
                  <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4 text-muted-foreground" />
                )}
                <img
                  src={merchant.logo}
                  alt={merchant.name}
                  className="h-5 w-5 rounded-sm object-cover"
                />

                <span className="font-medium">{merchant.name}</span>
                <Badge variant="outline" className="ml-auto text-xs">
                  {merchant.totalLocations} locations
                </Badge>
              </button>

              {expandedMerchants[merchant.id] && (
                <div className="pl-6 space-y-1">
                  {merchant.locations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => onSelectLocation(merchant.id, location.id)}
                      className={cn(
                        "flex items-center gap-2 w-full p-2 rounded-md hover:bg-muted text-left text-sm",
                        selectedLocation === location.id &&
                          "bg-primary/10 font-medium"
                      )}
                    >
                      <MapPinIcon className="h-3.5 w-3.5 text-muted-foreground" />

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span>{location.name}</span>
                          <div className="flex items-center gap-1.5">
                            {getStockLevelIndicator(location.stockLevel)}
                            <Badge
                              variant={
                                location.isOpen ? "default" : "secondary"
                              }
                              className="text-[10px] px-1 py-0 h-4"
                            >
                              {location.isOpen ? "Open" : "Closed"}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                          {location.address}, {location.city}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
