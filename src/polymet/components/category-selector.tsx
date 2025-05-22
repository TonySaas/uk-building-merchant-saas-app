"use client";

import * as React from "react";
import { ChevronRightIcon, ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/polymet/components/checkbox-group";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CategoryItem {
  id: string;
  name: string;
  children?: CategoryItem[];
  count?: number;
  disabled?: boolean;
}

interface CategorySelectorProps {
  categories: CategoryItem[];
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
  className?: string;
  disabled?: boolean;
  error?: string;
  maxHeight?: string | number;
  multiSelect?: boolean;
}

const CategorySelector = React.forwardRef<
  HTMLDivElement,
  CategorySelectorProps
>(
  (
    {
      categories,
      selectedCategories,
      onChange,
      className,
      disabled = false,
      error,
      maxHeight = "400px",
      multiSelect = true,
    },
    ref
  ) => {
    // Track expanded categories
    const [expandedCategories, setExpandedCategories] = React.useState<
      Record<string, boolean>
    >({});

    const toggleExpanded = (categoryId: string) => {
      setExpandedCategories((prev) => ({
        ...prev,
        [categoryId]: !prev[categoryId],
      }));
    };

    const handleCategorySelect = (categoryId: string, checked: boolean) => {
      if (disabled) return;

      if (multiSelect) {
        if (checked) {
          onChange([...selectedCategories, categoryId]);
        } else {
          onChange(selectedCategories.filter((id) => id !== categoryId));
        }
      } else {
        // Single select mode
        onChange([categoryId]);
      }
    };

    // Recursive function to get all descendant category IDs
    const getAllDescendants = (category: CategoryItem): string[] => {
      let descendants: string[] = [category.id];

      if (category.children && category.children.length > 0) {
        category.children.forEach((child) => {
          descendants = [...descendants, ...getAllDescendants(child)];
        });
      }

      return descendants;
    };

    // Check if all children of a category are selected
    const areAllChildrenSelected = (category: CategoryItem): boolean => {
      if (!category.children || category.children.length === 0) {
        return selectedCategories.includes(category.id);
      }

      return category.children.every((child) => areAllChildrenSelected(child));
    };

    // Check if some but not all children of a category are selected
    const areSomeChildrenSelected = (category: CategoryItem): boolean => {
      if (!category.children || category.children.length === 0) {
        return selectedCategories.includes(category.id);
      }

      const allDescendants = getAllDescendants(category);
      const selectedDescendants = allDescendants.filter((id) =>
        selectedCategories.includes(id)
      );

      return (
        selectedDescendants.length > 0 &&
        selectedDescendants.length < allDescendants.length
      );
    };

    // Handle parent category selection (select/deselect all children)
    const handleParentCategorySelect = (
      category: CategoryItem,
      checked: boolean
    ) => {
      if (disabled) return;

      const allDescendants = getAllDescendants(category);

      if (checked) {
        // Add all descendants to selected categories
        const newSelected = [
          ...new Set([...selectedCategories, ...allDescendants]),
        ];

        onChange(newSelected);
      } else {
        // Remove all descendants from selected categories
        const newSelected = selectedCategories.filter(
          (id) => !allDescendants.includes(id)
        );
        onChange(newSelected);
      }
    };

    const renderCategory = (category: CategoryItem, depth = 0) => {
      const hasChildren = category.children && category.children.length > 0;
      const isExpanded = expandedCategories[category.id] || false;
      const isAllSelected = hasChildren && areAllChildrenSelected(category);
      const isSomeSelected =
        hasChildren && areSomeChildrenSelected(category) && !isAllSelected;
      const isSelected = selectedCategories.includes(category.id);
      const isDisabled = disabled || category.disabled;

      return (
        <div
          key={category.id}
          className={cn("select-none", depth > 0 ? "ml-6" : "")}
        >
          <div className="flex items-center py-1.5">
            <Checkbox
              id={category.id}
              checked={isAllSelected || isSelected}
              indeterminate={isSomeSelected}
              onCheckedChange={(checked) => {
                if (hasChildren) {
                  handleParentCategorySelect(category, !!checked);
                } else {
                  handleCategorySelect(category.id, !!checked);
                }
              }}
              disabled={isDisabled}
              className="mr-2"
            />

            {hasChildren ? (
              <Collapsible open={isExpanded}>
                <div className="flex flex-1 items-center">
                  <CollapsibleTrigger
                    onClick={(e) => {
                      e.preventDefault();
                      toggleExpanded(category.id);
                    }}
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium hover:underline",
                      isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    )}
                    disabled={isDisabled}
                  >
                    {isExpanded ? (
                      <ChevronDownIcon className="h-4 w-4" />
                    ) : (
                      <ChevronRightIcon className="h-4 w-4" />
                    )}
                    <span>{category.name}</span>
                  </CollapsibleTrigger>

                  {category.count !== undefined && (
                    <Badge variant="secondary" className="ml-2">
                      {category.count}
                    </Badge>
                  )}
                </div>

                <CollapsibleContent className="mt-1">
                  {category.children?.map((child) =>
                    renderCategory(child, depth + 1)
                  )}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <label
                htmlFor={category.id}
                className={cn(
                  "flex flex-1 items-center gap-2 text-sm",
                  isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                )}
              >
                <span>{category.name}</span>
                {category.count !== undefined && (
                  <Badge variant="secondary" className="ml-auto">
                    {category.count}
                  </Badge>
                )}
              </label>
            )}
          </div>
        </div>
      );
    };

    return (
      <div ref={ref} className={cn("w-full", className)}>
        <div
          className={cn(
            "rounded-md border border-input bg-background p-2",
            "overflow-y-auto",
            disabled ? "opacity-50 cursor-not-allowed" : ""
          )}
          style={{ maxHeight }}
        >
          {categories.map((category) => renderCategory(category))}
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
CategorySelector.displayName = "CategorySelector";

export { CategorySelector };
