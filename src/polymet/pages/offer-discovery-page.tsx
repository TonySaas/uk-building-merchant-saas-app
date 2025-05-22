import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ORGANIZATIONS } from "@/polymet/data/organization-data";
import { MERCHANT_OFFERS } from "@/polymet/data/merchant-offers-data";
import OrganizationSelector from "@/polymet/components/organization-selector";
import OfferFilterControls from "@/polymet/components/offer-filter-controls";
import OfferDiscoveryFeed from "@/polymet/components/offer-discovery-feed";

export default function OfferDiscoveryPage() {
  const { orgId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOffers, setSelectedOffers] = useState<string[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState<
    string | null
  >(orgId || null);

  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    stockFilter: "all",
    discountFilter: "all",
  });

  // Simulate loading data
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [selectedOrganization]);

  // Filter offers based on selected organization and other filters
  const filteredOffers = MERCHANT_OFFERS.filter((offer) => {
    // Filter by organization if one is selected
    if (
      selectedOrganization &&
      offer.organization.id !== selectedOrganization
    ) {
      return false;
    }

    // Filter by search term
    if (
      filters.search &&
      !offer.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      !offer.description.toLowerCase().includes(filters.search.toLowerCase()) &&
      !offer.sku.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // Filter by category
    if (
      filters.category !== "all" &&
      offer.category.toLowerCase().replace(/\s+/g, "-") !== filters.category
    ) {
      return false;
    }

    // Filter by stock status
    if (
      filters.stockFilter !== "all" &&
      offer.stockStatus !== filters.stockFilter.replace("-", "-")
    ) {
      return false;
    }

    // Filter by discount percentage
    if (filters.discountFilter !== "all") {
      const minDiscount = parseInt(filters.discountFilter.split("+")[0]);
      if (offer.discountPercentage < minDiscount) {
        return false;
      }
    }

    return true;
  });

  // Handle organization selection
  const handleOrganizationSelect = (orgId: string) => {
    setSelectedOrganization((prevOrgId) =>
      prevOrgId === orgId ? null : orgId
    );
    setSelectedOffers([]);
  };

  // Handle offer selection
  const handleSelectOffer = (id: string) => {
    setSelectedOffers((prev) =>
      prev.includes(id)
        ? prev.filter((offerId) => offerId !== id)
        : [...prev, id]
    );
  };

  // Handle add to cart
  const handleAddToCart = (id: string) => {
    console.log(`Added offer ${id} to cart`);
    // Implement cart functionality here
  };

  // Handle view details
  const handleViewDetails = (id: string) => {
    console.log(`Viewing details for offer ${id}`);
    // Implement navigation to offer details page
  };

  // Handle search change
  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  // Handle category filter change
  const handleCategoryChange = (value: string) => {
    setFilters((prev) => ({ ...prev, category: value }));
  };

  // Handle stock filter change
  const handleStockFilterChange = (value: string) => {
    setFilters((prev) => ({ ...prev, stockFilter: value }));
  };

  // Handle discount filter change
  const handleDiscountFilterChange = (value: string) => {
    setFilters((prev) => ({ ...prev, discountFilter: value }));
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setFilters({
      search: "",
      category: "all",
      stockFilter: "all",
      discountFilter: "all",
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Offer Discovery</h1>
        <p className="text-muted-foreground">
          Browse and discover special offers from all affiliated organizations
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Filter by Organization</h2>
        <OrganizationSelector
          organizations={ORGANIZATIONS}
          onSelect={(org) => handleOrganizationSelect(org.id)}
          selectedOrgId={selectedOrganization}
        />
      </div>

      <div className="mb-8">
        <OfferFilterControls
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onStockFilterChange={handleStockFilterChange}
          onDiscountFilterChange={handleDiscountFilterChange}
          onClearFilters={handleClearFilters}
          activeFilters={filters}
        />
      </div>

      <OfferDiscoveryFeed
        offers={filteredOffers}
        isLoading={isLoading}
        selectedOffers={selectedOffers}
        onSelectOffer={handleSelectOffer}
        onAddToCart={handleAddToCart}
        onViewDetails={handleViewDetails}
        hasMoreOffers={false}
      />
    </div>
  );
}
