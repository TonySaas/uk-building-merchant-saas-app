import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { RefreshCwIcon, XIcon } from "lucide-react";

interface FilterPanelProps {
  onFilterChange?: () => void;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedMerchants, setSelectedMerchants] = useState<string[]>([]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  const handleMerchantChange = (merchant: string, checked: boolean) => {
    if (checked) {
      setSelectedMerchants([...selectedMerchants, merchant]);
    } else {
      setSelectedMerchants(selectedMerchants.filter((m) => m !== merchant));
    }
  };

  const handleReset = () => {
    setPriceRange([0, 100]);
    setSelectedCategories([]);
    setSelectedStatus("all");
    setSelectedMerchants([]);
  };

  const handleApply = () => {
    if (onFilterChange) {
      onFilterChange();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RefreshCwIcon className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-3">
          <Label className="text-sm font-medium">Price Range</Label>
          <div className="pt-2">
            <Slider
              defaultValue={priceRange}
              max={100}
              step={1}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mb-2"
            />

            <div className="flex items-center justify-between">
              <Input
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([parseInt(e.target.value), priceRange[1]])
                }
                className="w-20 h-8"
              />

              <span className="text-muted-foreground">to</span>
              <Input
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], parseInt(e.target.value)])
                }
                className="w-20 h-8"
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <Label className="text-sm font-medium">Categories</Label>
          <div className="grid grid-cols-1 gap-2">
            {[
              "Power Tools",
              "Hand Tools",
              "Accessories",
              "Safety Equipment",
              "Fasteners",
            ].map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category, checked === true)
                  }
                />

                <Label htmlFor={`category-${category}`} className="text-sm">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <Label className="text-sm font-medium">Status</Label>
          <RadioGroup value={selectedStatus} onValueChange={setSelectedStatus}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="status-all" />

              <Label htmlFor="status-all" className="text-sm">
                All
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="active" id="status-active" />

              <Label htmlFor="status-active" className="text-sm">
                Active
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="scheduled" id="status-scheduled" />

              <Label htmlFor="status-scheduled" className="text-sm">
                Scheduled
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ended" id="status-ended" />

              <Label htmlFor="status-ended" className="text-sm">
                Ended
              </Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        <div className="space-y-3">
          <Label className="text-sm font-medium">Merchants</Label>
          <div className="grid grid-cols-1 gap-2">
            {["Toolstation", "Screwfix", "B&Q", "Travis Perkins", "Selco"].map(
              (merchant) => (
                <div key={merchant} className="flex items-center space-x-2">
                  <Checkbox
                    id={`merchant-${merchant}`}
                    checked={selectedMerchants.includes(merchant)}
                    onCheckedChange={(checked) =>
                      handleMerchantChange(merchant, checked === true)
                    }
                  />

                  <Label htmlFor={`merchant-${merchant}`} className="text-sm">
                    {merchant}
                  </Label>
                </div>
              )
            )}
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <Label className="text-sm font-medium">Date Range</Label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-2">
          {selectedCategories.length > 0 ||
          selectedMerchants.length > 0 ||
          selectedStatus !== "all" ? (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {category}
                  <XIcon
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleCategoryChange(category, false)}
                  />
                </Badge>
              ))}
              {selectedMerchants.map((merchant) => (
                <Badge
                  key={merchant}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {merchant}
                  <XIcon
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => handleMerchantChange(merchant, false)}
                  />
                </Badge>
              ))}
              {selectedStatus !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Status: {selectedStatus}
                  <XIcon
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => setSelectedStatus("all")}
                  />
                </Badge>
              )}
            </div>
          ) : null}
          <Button className="w-full" onClick={handleApply}>
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
