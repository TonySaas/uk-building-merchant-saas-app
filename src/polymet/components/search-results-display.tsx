import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  EyeIcon,
  ShoppingCartIcon,
  TagIcon,
  PackageIcon,
  BuildingIcon,
} from "lucide-react";

interface SearchResultsDisplayProps {
  query: string;
  isLoading?: boolean;
}

export default function SearchResultsDisplay({
  query,
  isLoading = false,
}: SearchResultsDisplayProps) {
  // Mock search results
  const mockOffers = [
    {
      id: "offer1",
      title: "DeWalt 18V XR Brushless Combi Drill",
      category: "Power Tools",
      discount: "25%",
      price: 149.99,
      originalPrice: 199.99,
      merchant: "Toolstation",
      merchantLogo: "https://picsum.photos/seed/toolstation/100/100",
      image: "https://picsum.photos/seed/dewalt/300/300",
    },
    {
      id: "offer2",
      title: "Stanley FatMax Tape Measure 8m",
      category: "Hand Tools",
      discount: "15%",
      price: 12.99,
      originalPrice: 15.99,
      merchant: "Screwfix",
      merchantLogo: "https://picsum.photos/seed/screwfix/100/100",
      image: "https://picsum.photos/seed/stanley/300/300",
    },
    {
      id: "offer3",
      title: "Makita DHP484 18V LXT Brushless Combi Drill",
      category: "Power Tools",
      discount: "20%",
      price: 129.99,
      originalPrice: 159.99,
      merchant: "B&Q",
      merchantLogo: "https://picsum.photos/seed/bandq/100/100",
      image: "https://picsum.photos/seed/makita/300/300",
    },
  ];

  const mockMerchants = [
    {
      id: "merchant1",
      name: "Toolstation",
      logo: "https://picsum.photos/seed/toolstation/100/100",
      location: "Bristol",
      offers: 42,
    },
    {
      id: "merchant2",
      name: "Screwfix",
      logo: "https://picsum.photos/seed/screwfix/100/100",
      location: "Cardiff",
      offers: 38,
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Search Results</h2>
          <p className="text-sm text-muted-foreground">Searching...</p>
        </div>
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Results</TabsTrigger>
            <TabsTrigger value="offers">Offers</TabsTrigger>
            <TabsTrigger value="merchants">Merchants</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4 mt-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-start p-4">
                    <Skeleton className="h-16 w-16 rounded-md" />

                    <div className="ml-4 flex-1 space-y-2">
                      <Skeleton className="h-5 w-3/4" />

                      <Skeleton className="h-4 w-1/2" />

                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-16" />

                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Search Results</h2>
        <p className="text-sm text-muted-foreground">
          {mockOffers.length + mockMerchants.length} results for "{query}"
        </p>
      </div>
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Results</TabsTrigger>
          <TabsTrigger value="offers">Offers ({mockOffers.length})</TabsTrigger>
          <TabsTrigger value="merchants">
            Merchants ({mockMerchants.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4 mt-4">
          {/* Offers */}
          {mockOffers.map((offer) => (
            <Card key={offer.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-start p-4">
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="h-full w-full object-cover rounded-md"
                    />

                    {offer.discount && (
                      <Badge className="absolute -top-2 -right-2 bg-red-500">
                        {offer.discount}
                      </Badge>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium line-clamp-1">
                          {offer.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <TagIcon className="h-3 w-3" />

                            {offer.category}
                          </Badge>
                          <div className="flex items-center text-sm">
                            <Avatar className="h-4 w-4 mr-1">
                              <AvatarImage
                                src={offer.merchantLogo}
                                alt={offer.merchant}
                              />

                              <AvatarFallback>
                                {offer.merchant[0]}
                              </AvatarFallback>
                            </Avatar>
                            {offer.merchant}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">
                          ${offer.price.toFixed(2)}
                        </div>
                        {offer.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            ${offer.originalPrice.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end mt-2 gap-2">
                      <Button size="sm" variant="outline">
                        <EyeIcon className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm">
                        <ShoppingCartIcon className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Merchants */}
          {mockMerchants.map((merchant) => (
            <Card key={merchant.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center p-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={merchant.logo} alt={merchant.name} />

                    <AvatarFallback>{merchant.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{merchant.name}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <BuildingIcon className="h-3 w-3" />

                          {merchant.location}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <PackageIcon className="h-3 w-3" />
                        {merchant.offers} offers
                      </Badge>
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button size="sm">View Merchant</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="offers" className="space-y-4 mt-4">
          {mockOffers.map((offer) => (
            <Card key={offer.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-start p-4">
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="h-full w-full object-cover rounded-md"
                    />

                    {offer.discount && (
                      <Badge className="absolute -top-2 -right-2 bg-red-500">
                        {offer.discount}
                      </Badge>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium line-clamp-1">
                          {offer.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <TagIcon className="h-3 w-3" />

                            {offer.category}
                          </Badge>
                          <div className="flex items-center text-sm">
                            <Avatar className="h-4 w-4 mr-1">
                              <AvatarImage
                                src={offer.merchantLogo}
                                alt={offer.merchant}
                              />

                              <AvatarFallback>
                                {offer.merchant[0]}
                              </AvatarFallback>
                            </Avatar>
                            {offer.merchant}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">
                          ${offer.price.toFixed(2)}
                        </div>
                        {offer.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            ${offer.originalPrice.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end mt-2 gap-2">
                      <Button size="sm" variant="outline">
                        <EyeIcon className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm">
                        <ShoppingCartIcon className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="merchants" className="space-y-4 mt-4">
          {mockMerchants.map((merchant) => (
            <Card key={merchant.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center p-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={merchant.logo} alt={merchant.name} />

                    <AvatarFallback>{merchant.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{merchant.name}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <BuildingIcon className="h-3 w-3" />

                          {merchant.location}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <PackageIcon className="h-3 w-3" />
                        {merchant.offers} offers
                      </Badge>
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button size="sm">View Merchant</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
