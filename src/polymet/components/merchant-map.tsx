import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapIcon, ListIcon, SearchIcon, MapPinIcon, XIcon } from "lucide-react";
import MerchantDetailCard from "@/polymet/components/merchant-detail-card";

interface Location {
  lat: number;
  lng: number;
}

interface Merchant {
  id: string;
  name: string;
  logo: string;
  address: string;
  city: string;
  postcode: string;
  lat: number;
  lng: number;
  distance: number;
  isOpen: boolean;
  hasStock: boolean;
  stockLevel: "high" | "medium" | "low" | "out_of_stock";
  organization?: string;
  categories?: string[];
}

interface MerchantMapProps {
  merchants: Merchant[];
  userLocation?: Location;
  selectedMerchant?: string | null;
  onSelectMerchant?: (id: string | null) => void;
  onViewDirections?: (merchant: Merchant) => void;
  isListView?: boolean;
  onToggleView?: () => void;
}

export default function MerchantMap({
  merchants,
  userLocation,
  selectedMerchant,
  onSelectMerchant,
  onViewDirections,
  isListView = false,
  onToggleView,
}: MerchantMapProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mapLoaded, setMapLoaded] = useState(true);

  // Filter merchants based on search query
  const filteredMerchants = merchants.filter(
    (merchant) =>
      merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.categories?.some((category) =>
        category.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // Sort merchants by distance
  const sortedMerchants = [...filteredMerchants].sort(
    (a, b) => a.distance - b.distance
  );

  // Find the selected merchant object
  const selectedMerchantObject = merchants.find(
    (m) => m.id === selectedMerchant
  );

  // Handle merchant selection
  const handleSelectMerchant = (id: string) => {
    if (onSelectMerchant) {
      onSelectMerchant(id === selectedMerchant ? null : id);
    }
  };

  // Handle view directions
  const handleViewDirections = (merchant: Merchant) => {
    if (onViewDirections) {
      onViewDirections(merchant);
    }
  };

  // Get stock level badge color
  const getStockLevelColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-blue-500";
      case "low":
        return "bg-amber-500";
      case "out_of_stock":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header with search and view toggle */}
      <div className="p-3 border-b flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search merchants or categories..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full aspect-square"
              onClick={() => setSearchQuery("")}
            >
              <XIcon className="h-4 w-4" />

              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
        <Button variant="outline" size="icon" onClick={onToggleView}>
          {isListView ? (
            <MapIcon className="h-4 w-4" />
          ) : (
            <ListIcon className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Main content area */}
      <div className="flex-1 relative">
        {isListView ? (
          <div className="h-full overflow-auto p-3">
            <h3 className="text-lg font-medium mb-3">Nearby Merchants</h3>
            {sortedMerchants.length > 0 ? (
              <div className="space-y-3">
                {sortedMerchants.map((merchant) => (
                  <Card
                    key={merchant.id}
                    className={`overflow-hidden cursor-pointer transition-colors ${
                      selectedMerchant === merchant.id
                        ? "border-primary ring-1 ring-primary"
                        : ""
                    }`}
                    onClick={() => handleSelectMerchant(merchant.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={merchant.logo}
                            alt={merchant.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium truncate">
                              {merchant.name}
                            </h4>
                            <Badge
                              variant={merchant.isOpen ? "default" : "outline"}
                              className={merchant.isOpen ? "bg-green-500" : ""}
                            >
                              {merchant.isOpen ? "Open" : "Closed"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {merchant.address}, {merchant.city}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center">
                              <MapPinIcon className="h-3 w-3 mr-1 text-muted-foreground" />

                              <span className="text-xs text-muted-foreground">
                                {merchant.distance.toFixed(1)} miles away
                              </span>
                            </div>
                            {merchant.hasStock && (
                              <Badge
                                variant="outline"
                                className={`${getStockLevelColor(merchant.stockLevel)} text-white`}
                              >
                                {merchant.stockLevel === "high"
                                  ? "In Stock"
                                  : merchant.stockLevel === "medium"
                                    ? "Limited Stock"
                                    : merchant.stockLevel === "low"
                                      ? "Low Stock"
                                      : "Out of Stock"}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[calc(100%-2rem)] text-center p-4">
                <MapIcon className="h-12 w-12 text-muted-foreground mb-2" />

                <h3 className="text-lg font-medium">No merchants found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full bg-gray-100 dark:bg-gray-800 relative">
            {/* Map placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              {mapLoaded ? (
                <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <MapIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />

                    <p className="text-muted-foreground">
                      Map would render here with merchant pins
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {merchants.length} merchants in this area
                    </p>
                  </div>
                </div>
              ) : (
                <div className="animate-pulse flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-full mb-4"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
                </div>
              )}
            </div>

            {/* Merchant list sidebar */}
            <div className="absolute top-3 left-3 w-64 bg-background rounded-md shadow-lg overflow-hidden">
              <div className="p-3 border-b">
                <h3 className="font-medium">Nearby Merchants</h3>
                <p className="text-xs text-muted-foreground">
                  {sortedMerchants.length} merchants found
                </p>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {sortedMerchants.map((merchant) => (
                  <div
                    key={merchant.id}
                    className={`p-2 border-b cursor-pointer hover:bg-muted transition-colors ${
                      selectedMerchant === merchant.id ? "bg-muted" : ""
                    }`}
                    onClick={() => handleSelectMerchant(merchant.id)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={merchant.logo}
                          alt={merchant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">
                          {merchant.name}
                        </h4>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {merchant.distance.toFixed(1)} miles
                          </span>
                          <Badge
                            variant={merchant.isOpen ? "default" : "outline"}
                            className={`text-xs ${merchant.isOpen ? "bg-green-500" : ""}`}
                          >
                            {merchant.isOpen ? "Open" : "Closed"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* User location marker */}
            {userLocation && (
              <div className="absolute bottom-20 right-4 bg-background p-2 rounded-md shadow-md flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium">Your Location</span>
              </div>
            )}

            {/* Selected merchant detail */}
            {selectedMerchantObject && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
                <MerchantDetailCard
                  merchant={selectedMerchantObject}
                  onClose={() =>
                    handleSelectMerchant(selectedMerchantObject.id)
                  }
                  onViewDirections={() =>
                    handleViewDirections(selectedMerchantObject)
                  }
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
