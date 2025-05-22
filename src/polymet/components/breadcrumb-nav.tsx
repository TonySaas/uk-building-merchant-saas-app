"use client";

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRightIcon, HomeIcon, ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface BreadcrumbNavProps {
  /**
   * Array of breadcrumb items to display
   */
  items?: BreadcrumbItem[];
  /**
   * Maximum number of items to display before collapsing
   */
  maxItems?: number;
  /**
   * Custom separator between items
   */
  separator?: React.ReactNode;
  /**
   * CSS class for the container
   */
  className?: string;
  /**
   * Whether to show tooltips for truncated items
   */
  showTooltips?: boolean;
}

export function BreadcrumbNav({
  items: propItems,
  maxItems = 4,
  separator = (
    <ChevronRightIcon className="h-4 w-4 text-muted-foreground mx-1" />
  ),

  className,
  showTooltips = true,
}: BreadcrumbNavProps) {
  const location = useLocation();
  const [items, setItems] = useState<BreadcrumbItem[]>(propItems || []);

  // Generate breadcrumbs from current path if not provided
  useEffect(() => {
    if (!propItems) {
      const pathSegments = location.pathname.split("/").filter(Boolean);

      const generatedItems: BreadcrumbItem[] = [
        {
          label: "Home",
          href: "/",
          icon: <HomeIcon className="h-4 w-4" />,
        },
      ];

      let currentPath = "";
      pathSegments.forEach((segment) => {
        currentPath += `/${segment}`;
        generatedItems.push({
          label: segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          href: currentPath,
        });
      });

      setItems(generatedItems);
    }
  }, [location.pathname, propItems]);

  // If no items, don't render anything
  if (!items.length) return null;

  // Determine if we need to collapse items
  const needsCollapse = items.length > maxItems;

  // Calculate visible items
  let visibleItems: BreadcrumbItem[] = items;

  if (needsCollapse) {
    // Always show first and last items
    const firstItem = items[0];
    const lastItems = items.slice(-Math.floor(maxItems / 2));

    // Calculate how many middle items to show
    const middleItemsCount = maxItems - 1 - lastItems.length;
    const middleItems =
      middleItemsCount > 0 ? items.slice(1, 1 + middleItemsCount) : [];

    // Combine visible items
    visibleItems = [firstItem, ...middleItems, ...lastItems];

    // Calculate hidden items
    const hiddenStartIndex = 1 + middleItemsCount;
    const hiddenEndIndex = items.length - lastItems.length;
    const hiddenItems = items.slice(hiddenStartIndex, hiddenEndIndex);

    // Insert dropdown for hidden items if there are any
    if (hiddenItems.length > 0) {
      const dropdownIndex = 1 + middleItemsCount;
      visibleItems.splice(dropdownIndex, 0, {
        label: `${hiddenItems.length} more`,
        href: "#",
        icon: <ChevronDownIcon className="h-4 w-4" />,

        // Store hidden items for the dropdown
        // @ts-ignore - Custom property for our use
        hiddenItems,
      });
    }
  }

  // Render breadcrumb item
  const renderItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
    // Check if this is a dropdown item
    // @ts-ignore - Custom property for our use
    const isDropdown = item.hiddenItems !== undefined;

    // Base content
    const content = (
      <div className="flex items-center">
        {item.icon && <span className="mr-1">{item.icon}</span>}
        <span
          className={cn(
            "text-sm",
            isLast ? "font-medium" : "text-muted-foreground",
            item.disabled && "opacity-60 cursor-not-allowed"
          )}
        >
          {item.label}
        </span>
      </div>
    );

    // Wrap in tooltip if needed
    const wrappedContent = showTooltips ? (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent>{item.label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      content
    );

    // For dropdown items
    if (isDropdown) {
      return (
        <React.Fragment key={`dropdown-${index}`}>
          {index > 0 && separator}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-auto p-1">
                {content}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              {/* @ts-ignore - Custom property for our use */}
              {item.hiddenItems.map(
                (hiddenItem: BreadcrumbItem, hiddenIndex: number) => (
                  <DropdownMenuItem key={`hidden-${hiddenIndex}`} asChild>
                    <Link to={hiddenItem.href} className="flex items-center">
                      {hiddenItem.icon && (
                        <span className="mr-2">{hiddenItem.icon}</span>
                      )}
                      {hiddenItem.label}
                    </Link>
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </React.Fragment>
      );
    }

    // For regular items
    return (
      <React.Fragment key={`item-${index}`}>
        {index > 0 && separator}
        {item.disabled || isLast ? (
          <span className="flex items-center">{wrappedContent}</span>
        ) : (
          <Link to={item.href} className="hover:underline">
            {wrappedContent}
          </Link>
        )}
      </React.Fragment>
    );
  };

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)}>
      <ol className="flex items-center flex-wrap">
        {visibleItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {renderItem(item, index, index === visibleItems.length - 1)}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default BreadcrumbNav;
