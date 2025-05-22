"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import {
  GridIcon,
  ListIcon,
  Columns2Icon,
  LayoutIcon,
  CalendarIcon,
  TagIcon,
  EyeIcon,
  ShoppingCartIcon,
  MoreHorizontalIcon,
} from "lucide-react";

// Sample data for demonstration
const offers = [
  {
    id: "OF-1001",
    name: "Summer Sale - Power Tools",
    merchant: "Toolstation",
    status: "active",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    discount: 15,
    image: "https://picsum.photos/seed/powertools/300/200",
    description:
      "Special discounts on all power tools including drills, saws, and sanders.",
    views: 1245,
    conversions: 89,
  },
  {
    id: "OF-1002",
    name: "Back to School - Stationery",
    merchant: "Office Depot",
    status: "scheduled",
    startDate: "2023-08-15",
    endDate: "2023-09-15",
    discount: 20,
    image: "https://picsum.photos/seed/stationery/300/200",
    description:
      "Get ready for the new school year with discounts on notebooks, pens, and more.",
    views: 0,
    conversions: 0,
  },
  {
    id: "OF-1003",
    name: "Clearance - Garden Furniture",
    merchant: "Garden World",
    status: "active",
    startDate: "2023-07-10",
    endDate: "2023-07-31",
    discount: 30,
    image: "https://picsum.photos/seed/garden/300/200",
    description:
      "End of season clearance on all garden furniture and accessories.",
    views: 876,
    conversions: 42,
  },
  {
    id: "OF-1004",
    name: "Flash Sale - Electronics",
    merchant: "Currys",
    status: "ended",
    startDate: "2023-05-01",
    endDate: "2023-05-07",
    discount: 25,
    image: "https://picsum.photos/seed/electronics/300/200",
    description: "Limited time offers on TVs, laptops, and smartphones.",
    views: 2145,
    conversions: 187,
  },
  {
    id: "OF-1005",
    name: "Weekend Special - Kitchenware",
    merchant: "John Lewis",
    status: "draft",
    startDate: "",
    endDate: "",
    discount: 10,
    image: "https://picsum.photos/seed/kitchen/300/200",
    description: "Special offers on cookware, utensils, and small appliances.",
    views: 0,
    conversions: 0,
  },
  {
    id: "OF-1006",
    name: "Holiday Season - Decorations",
    merchant: "HomeBase",
    status: "scheduled",
    startDate: "2023-11-01",
    endDate: "2023-12-25",
    discount: 15,
    image: "https://picsum.photos/seed/holiday/300/200",
    description:
      "Get ready for the holidays with discounts on decorations and lights.",
    views: 0,
    conversions: 0,
  },
];

type ViewType = "grid" | "list" | "compact" | "detailed";

export default function ViewToggleDisplay({ isLoading = false }) {
  const [viewType, setViewType] = useState<ViewType>("grid");

  // Status badge component
  const StatusBadge = ({ status }) => {
    const variants = {
      active:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      scheduled:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      ended: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
      draft:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    };

    return (
      <Badge variant="outline" className={`capitalize ${variants[status]}`}>
        {status}
      </Badge>
    );
  };

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="rounded-full bg-muted p-3 mb-4">
        <TagIcon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">No offers found</h3>
      <p className="text-sm text-muted-foreground text-center max-w-sm mt-2">
        There are no offers matching your criteria. Try changing your filters or
        create a new offer.
      </p>
      <Button className="mt-4">Create New Offer</Button>
    </div>
  );

  // Loading skeletons for different view types
  const LoadingSkeletons = () => {
    switch (viewType) {
      case "grid":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-0">
                    <Skeleton className="h-40 w-full rounded-t-lg" />

                    <div className="p-4 space-y-2">
                      <Skeleton className="h-5 w-3/4" />

                      <Skeleton className="h-4 w-1/2" />

                      <div className="flex justify-between items-center pt-2">
                        <Skeleton className="h-6 w-16" />

                        <Skeleton className="h-8 w-8 rounded-full" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        );

      case "list":
        return (
          <div className="space-y-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                    <Skeleton className="h-24 sm:w-40 w-full rounded-lg" />

                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-3/4" />

                      <Skeleton className="h-4 w-1/2" />

                      <div className="flex justify-between items-center pt-2">
                        <Skeleton className="h-6 w-16" />

                        <Skeleton className="h-8 w-24" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        );

      case "compact":
        return (
          <div className="space-y-2">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-3 flex items-center">
                    <Skeleton className="h-10 w-10 rounded-md mr-3" />

                    <div className="flex-1 min-w-0">
                      <Skeleton className="h-4 w-3/4 mb-1" />

                      <Skeleton className="h-3 w-1/2" />
                    </div>
                    <Skeleton className="h-6 w-16 mr-2" />

                    <Skeleton className="h-8 w-8 rounded-full" />
                  </CardContent>
                </Card>
              ))}
          </div>
        );

      case "detailed":
        return (
          <div className="space-y-4">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                    <Skeleton className="h-48 md:w-64 w-full rounded-lg" />

                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-6 w-3/4" />

                      <Skeleton className="h-4 w-1/2" />

                      <Skeleton className="h-20 w-full" />

                      <div className="flex justify-between items-center pt-2">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />

                          <Skeleton className="h-4 w-24" />
                        </div>
                        <div className="flex space-x-2">
                          <Skeleton className="h-9 w-24 rounded-md" />

                          <Skeleton className="h-9 w-24 rounded-md" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        );

      default:
        return null;
    }
  };

  // Grid view component
  const GridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {offers.map((offer) => (
        <motion.div
          key={offer.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden h-full flex flex-col">
            <CardContent className="p-0 flex-1 flex flex-col">
              <div className="relative">
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="h-40 w-full object-cover"
                />

                <div className="absolute top-2 right-2">
                  <StatusBadge status={offer.status} />
                </div>
                {offer.discount > 0 && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-red-500 hover:bg-red-500">
                      {offer.discount}% OFF
                    </Badge>
                  </div>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-lg line-clamp-1">
                  {offer.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {offer.merchant}
                </p>
                <p className="text-sm line-clamp-2 flex-1">
                  {offer.description}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="h-3 w-3 mr-1" />

                    {offer.startDate
                      ? new Date(offer.startDate).toLocaleDateString()
                      : "Not scheduled"}
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontalIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  // List view component
  const ListView = () => (
    <div className="space-y-4">
      {offers.map((offer) => (
        <motion.div
          key={offer.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Card>
            <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
              <div className="relative sm:w-48 h-32">
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="h-full w-full object-cover rounded-md"
                />

                {offer.discount > 0 && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-red-500 hover:bg-red-500">
                      {offer.discount}% OFF
                    </Badge>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-lg">{offer.name}</h3>
                  <StatusBadge status={offer.status} />
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {offer.merchant}
                </p>
                <p className="text-sm mb-4">{offer.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarIcon className="h-3 w-3 mr-1" />

                      {offer.startDate
                        ? new Date(offer.startDate).toLocaleDateString()
                        : "Not scheduled"}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <EyeIcon className="h-3 w-3 mr-1" />

                      {offer.views}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm">
                      <ShoppingCartIcon className="h-4 w-4 mr-1" />
                      Promote
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  // Compact view component
  const CompactView = () => (
    <div className="space-y-2">
      {offers.map((offer) => (
        <motion.div
          key={offer.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.15 }}
        >
          <Card>
            <CardContent className="p-3 flex items-center">
              <div className="h-10 w-10 rounded-md overflow-hidden mr-3">
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">{offer.name}</h3>
                <p className="text-xs text-muted-foreground truncate">
                  {offer.merchant}
                </p>
              </div>
              <StatusBadge status={offer.status} />

              <Button size="sm" variant="ghost" className="ml-2 h-8 w-8 p-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  // Detailed view component
  const DetailedView = () => (
    <div className="space-y-4">
      {offers.map((offer) => (
        <motion.div
          key={offer.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card>
            <CardContent className="p-6 flex flex-col md:flex-row gap-6">
              <div className="relative md:w-64 h-48">
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="h-full w-full object-cover rounded-lg"
                />

                {offer.discount > 0 && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-red-500 hover:bg-red-500">
                      {offer.discount}% OFF
                    </Badge>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-xl">{offer.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {offer.merchant}
                    </p>
                  </div>
                  <StatusBadge status={offer.status} />
                </div>
                <p className="my-4">{offer.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium">
                      {offer.startDate
                        ? new Date(offer.startDate).toLocaleDateString()
                        : "Not scheduled"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">End Date</p>
                    <p className="font-medium">
                      {offer.endDate
                        ? new Date(offer.endDate).toLocaleDateString()
                        : "Not scheduled"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Views</p>
                    <p className="font-medium">
                      {offer.views.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Conversions</p>
                    <p className="font-medium">
                      {offer.conversions.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="text-sm text-muted-foreground">
                    ID: {offer.id}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button>
                      <ShoppingCartIcon className="h-4 w-4 mr-1" />
                      Promote Offer
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="inline-flex items-center rounded-md border bg-background p-1 text-muted-foreground">
          <Button
            variant={viewType === "grid" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewType("grid")}
            className="px-3"
          >
            <GridIcon className="h-4 w-4 mr-2" />
            Grid
          </Button>
          <Button
            variant={viewType === "list" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewType("list")}
            className="px-3"
          >
            <ListIcon className="h-4 w-4 mr-2" />
            List
          </Button>
          <Button
            variant={viewType === "compact" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewType("compact")}
            className="px-3"
          >
            <Columns2Icon className="h-4 w-4 mr-2" />
            Compact
          </Button>
          <Button
            variant={viewType === "detailed" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewType("detailed")}
            className="px-3"
          >
            <LayoutIcon className="h-4 w-4 mr-2" />
            Detailed
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          {offers.length} items
        </div>
      </div>

      {isLoading ? (
        <LoadingSkeletons />
      ) : offers.length === 0 ? (
        <EmptyState />
      ) : (
        <div>
          {viewType === "grid" && <GridView />}
          {viewType === "list" && <ListView />}
          {viewType === "compact" && <CompactView />}
          {viewType === "detailed" && <DetailedView />}
        </div>
      )}
    </div>
  );
}
