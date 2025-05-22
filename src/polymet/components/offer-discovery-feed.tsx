import { useState } from "react";
import MerchantOfferCard, {
  MerchantOfferCardProps,
} from "@/polymet/components/merchant-offer-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LayoutGridIcon,
  LayoutListIcon,
  PackageIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
} from "lucide-react";

interface OfferDiscoveryFeedProps {
  offers: MerchantOfferCardProps[];
  isLoading?: boolean;
  selectedOffers?: string[];
  onSelectOffer?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  onLoadMore?: () => void;
  hasMoreOffers?: boolean;
}

export default function OfferDiscoveryFeed({
  offers,
  isLoading = false,
  selectedOffers = [],
  onSelectOffer,
  onAddToCart,
  onViewDetails,
  onLoadMore,
  hasMoreOffers = false,
}: OfferDiscoveryFeedProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("newest");

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "discount-high", label: "Highest Discount" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
  ];

  // Sort offers based on selected sort option
  const sortedOffers = [...offers].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.startDate || "").getTime() -
          new Date(a.startDate || "").getTime()
        );

      case "discount-high":
        return (b.discountPercentage || 0) - (a.discountPercentage || 0);
      case "price-low":
        return (a.discountedPrice || 0) - (b.discountedPrice || 0);
      case "price-high":
        return (b.discountedPrice || 0) - (a.discountedPrice || 0);
      case "name-asc":
        return (a.title || "").localeCompare(b.title || "");
      case "name-desc":
        return (b.title || "").localeCompare(a.title || "");
      default:
        return 0;
    }
  });

  // Loading skeletons
  const LoadingSkeletons = () => (
    <>
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="flex flex-col h-full">
            <Skeleton className="h-48 w-full" />

            <div className="p-4 flex flex-col flex-1">
              <div className="flex items-center mb-2">
                <Skeleton className="h-6 w-6 rounded-full mr-2" />

                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-6 w-3/4 mb-1" />

              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="h-5 w-16" />

                <Skeleton className="h-5 w-20" />
              </div>
              <Skeleton className="h-4 w-full mb-1" />

              <Skeleton className="h-4 w-full mb-2" />

              <Skeleton className="h-4 w-32 mb-3" />

              <Skeleton className="h-6 w-24 mb-3" />

              <Skeleton className="h-4 w-20 mb-3" />

              <div className="flex gap-2 mt-auto">
                <Skeleton className="h-9 w-full" />

                <Skeleton className="h-9 w-full" />
              </div>
            </div>
          </div>
        ))}
    </>
  );

  // Empty state
  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-12">
      <div className="rounded-full bg-muted p-3 mb-4">
        <PackageIcon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">No offers found</h3>
      <p className="text-sm text-muted-foreground text-center max-w-sm mt-2">
        No offers match your current filters. Try adjusting your search criteria
        or check back later for new offers.
      </p>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-sm text-muted-foreground">
          {isLoading ? (
            <Skeleton className="h-5 w-32" />
          ) : (
            `Showing ${offers.length} offers`
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center">
                    {sortBy === option.value && (
                      <CheckIcon className="mr-2 h-4 w-4" />
                    )}
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="px-3"
            >
              <LayoutGridIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="px-3"
            >
              <LayoutListIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div
          className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}
        >
          <LoadingSkeletons />
        </div>
      ) : offers.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <div
            className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}
          >
            {sortedOffers.map((offer) => (
              <MerchantOfferCard
                key={offer.id}
                {...offer}
                isSelected={selectedOffers.includes(offer.id)}
                onSelect={onSelectOffer}
                onAddToCart={onAddToCart}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>

          {hasMoreOffers && onLoadMore && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={onLoadMore}
                variant="outline"
                className="min-w-[200px]"
              >
                Load More Offers
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
