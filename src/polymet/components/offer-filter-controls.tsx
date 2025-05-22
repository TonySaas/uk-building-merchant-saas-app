import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  SearchIcon,
  FilterIcon,
  XIcon,
  TagIcon,
  BuildingIcon,
  PackageIcon,
} from "lucide-react";

interface OfferFilterControlsProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStockFilterChange: (value: string) => void;
  onDiscountFilterChange: (value: string) => void;
  onClearFilters: () => void;
  activeFilters: {
    search: string;
    category: string;
    stockFilter: string;
    discountFilter: string;
  };
}

export default function OfferFilterControls({
  onSearchChange,
  onCategoryChange,
  onStockFilterChange,
  onDiscountFilterChange,
  onClearFilters,
  activeFilters,
}: OfferFilterControlsProps) {
  const [searchValue, setSearchValue] = useState(activeFilters.search);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchValue);
  };

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "power-tools", label: "Power Tools" },
    { value: "hand-tools", label: "Hand Tools" },
    { value: "building-materials", label: "Building Materials" },
    { value: "electrical", label: "Electrical" },
    { value: "plumbing", label: "Plumbing" },
    { value: "heating", label: "Heating & Ventilation" },
    { value: "outdoor", label: "Outdoor & Gardening" },
    { value: "safety", label: "Safety & Workwear" },
  ];

  const stockOptions = [
    { value: "all", label: "All Stock Levels" },
    { value: "in-stock", label: "In Stock" },
    { value: "low-stock", label: "Low Stock" },
    { value: "out-of-stock", label: "Out of Stock" },
  ];

  const discountOptions = [
    { value: "all", label: "All Discounts" },
    { value: "10+", label: "10%+ Off" },
    { value: "25+", label: "25%+ Off" },
    { value: "50+", label: "50%+ Off" },
  ];

  const hasActiveFilters =
    activeFilters.category !== "all" ||
    activeFilters.stockFilter !== "all" ||
    activeFilters.discountFilter !== "all";

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearchSubmit} className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />

        <Input
          placeholder="Search offers by name, SKU, or description..."
          className="pl-10 pr-16"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <Button
          type="submit"
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8"
        >
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Select
              value={activeFilters.category}
              onValueChange={onCategoryChange}
            >
              <SelectTrigger className="w-full">
                <div className="flex items-center">
                  <PackageIcon className="h-4 w-4 mr-2" />

                  <SelectValue placeholder="Select category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <Select
              value={activeFilters.stockFilter}
              onValueChange={onStockFilterChange}
            >
              <SelectTrigger className="w-full">
                <div className="flex items-center">
                  <BuildingIcon className="h-4 w-4 mr-2" />

                  <SelectValue placeholder="Stock availability" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {stockOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <Select
              value={activeFilters.discountFilter}
              onValueChange={onDiscountFilterChange}
            >
              <SelectTrigger className="w-full">
                <div className="flex items-center">
                  <TagIcon className="h-4 w-4 mr-2" />

                  <SelectValue placeholder="Discount level" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {discountOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="whitespace-nowrap"
          >
            <XIcon className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-1">
          <div className="text-sm text-muted-foreground py-1">
            Active filters:
          </div>
          {activeFilters.category !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category:{" "}
              {
                categories.find((c) => c.value === activeFilters.category)
                  ?.label
              }
              <XIcon
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => onCategoryChange("all")}
              />
            </Badge>
          )}
          {activeFilters.stockFilter !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Stock:{" "}
              {
                stockOptions.find((o) => o.value === activeFilters.stockFilter)
                  ?.label
              }
              <XIcon
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => onStockFilterChange("all")}
              />
            </Badge>
          )}
          {activeFilters.discountFilter !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Discount:{" "}
              {
                discountOptions.find(
                  (o) => o.value === activeFilters.discountFilter
                )?.label
              }
              <XIcon
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => onDiscountFilterChange("all")}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
