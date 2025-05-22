"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SearchIcon, FilterIcon, SaveIcon, XIcon } from "lucide-react";

import OffersDataTable from "@/polymet/components/offers-data-table";
import ViewToggleDisplay from "@/polymet/components/view-toggle-display";
import KanbanOfferBoard from "@/polymet/components/kanban-offer-board";
import PromotionCalendar from "@/polymet/components/promotion-calendar";
import MerchantTreeView from "@/polymet/components/merchant-tree-view";
import FilterPanel from "@/polymet/components/filter-panel";
import SearchResultsDisplay from "@/polymet/components/search-results-display";

export default function ContentOrganizationPage() {
  const [activeTab, setActiveTab] = useState("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Demo function to simulate loading state
  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Content Management
          </h1>
          <p className="text-muted-foreground">
            Manage your offers, promotions, and merchant data
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 min-w-[200px] md:min-w-[300px]">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

            <Input
              placeholder="Search offers or merchants..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
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
          <Button
            variant="outline"
            size="icon"
            onClick={() => setFilterPanelOpen(!filterPanelOpen)}
            className={filterPanelOpen ? "bg-muted" : ""}
          >
            <FilterIcon className="h-4 w-4" />
          </Button>
          <Button>
            <SaveIcon className="mr-2 h-4 w-4" />
            Save View
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {filterPanelOpen && (
          <div className="lg:w-64 flex-shrink-0">
            <FilterPanel onFilterChange={() => handleSearch()} />
          </div>
        )}

        <div className="flex-1">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="table">Table</TabsTrigger>
                <TabsTrigger value="grid">Grid/List</TabsTrigger>
                <TabsTrigger value="kanban">Kanban</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="tree">Tree</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="hidden md:flex">
                  {isLoading ? "Loading..." : "42 items"}
                </Badge>
              </div>
            </div>

            <Separator className="mb-4" />

            {searchQuery && searchQuery.length > 2 ? (
              <SearchResultsDisplay query={searchQuery} isLoading={isLoading} />
            ) : (
              <>
                <TabsContent value="table" className="m-0">
                  <OffersDataTable isLoading={isLoading} />
                </TabsContent>

                <TabsContent value="grid" className="m-0">
                  <ViewToggleDisplay isLoading={isLoading} />
                </TabsContent>

                <TabsContent value="kanban" className="m-0">
                  <KanbanOfferBoard isLoading={isLoading} />
                </TabsContent>

                <TabsContent value="calendar" className="m-0">
                  <PromotionCalendar isLoading={isLoading} />
                </TabsContent>

                <TabsContent value="tree" className="m-0">
                  <MerchantTreeView isLoading={isLoading} />
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
