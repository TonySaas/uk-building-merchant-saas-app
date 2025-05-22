"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface OrganizationMerchantItem {
  id: string;
  name: string;
  logo: string;
  description: string;
  badge?: string;
  locations?: number;
  categories?: string[];
}

interface OrganizationMerchantSelectorProps {
  items: OrganizationMerchantItem[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  type?: "organization" | "merchant" | "supplier";
}

const OrganizationMerchantSelector = React.forwardRef<
  HTMLButtonElement,
  OrganizationMerchantSelectorProps
>(
  (
    {
      items,
      value,
      onChange,
      placeholder = "Select an item",
      emptyMessage = "No results found.",
      disabled,
      error,
      className,
      type = "organization",
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");

    const selectedItem = React.useMemo(
      () => items.find((item) => item.id === value),
      [items, value]
    );

    const typeLabel = React.useMemo(() => {
      switch (type) {
        case "organization":
          return "Organization";
        case "merchant":
          return "Merchant";
        case "supplier":
          return "Supplier";
        default:
          return "Item";
      }
    }, [type]);

    return (
      <div className={cn("relative", className)}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                "w-full justify-between font-normal h-auto min-h-10 py-2",
                error ? "border-red-500 focus:ring-red-500" : "",
                disabled ? "opacity-50 cursor-not-allowed" : ""
              )}
              disabled={disabled}
              onClick={() => setOpen(true)}
            >
              {selectedItem ? (
                <div className="flex items-center gap-2 text-left">
                  <div className="h-8 w-8 overflow-hidden rounded bg-secondary flex items-center justify-center">
                    <img
                      src={selectedItem.logo}
                      alt={selectedItem.name}
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{selectedItem.name}</span>
                    <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {selectedItem.description}
                    </span>
                  </div>
                </div>
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
              <SearchIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[--radix-popover-trigger-width] p-0"
            align="start"
          >
            <Command>
              <CommandInput
                placeholder={`Search ${typeLabel.toLowerCase()}s...`}
                value={searchQuery}
                onValueChange={setSearchQuery}
              />

              <CommandList>
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                <CommandGroup>
                  {items
                    .filter(
                      (item) =>
                        item.name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        item.description
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        (item.categories &&
                          item.categories.some((category) =>
                            category
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                          ))
                    )
                    .map((item) => (
                      <CommandItem
                        key={item.id}
                        value={item.id}
                        onSelect={() => {
                          onChange(item.id);
                          setOpen(false);
                        }}
                        className="py-2"
                      >
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 overflow-hidden rounded bg-secondary flex items-center justify-center">
                            <img
                              src={item.logo}
                              alt={item.name}
                              className="h-8 w-8 object-contain"
                            />
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{item.name}</span>
                              {item.badge && (
                                <Badge variant="outline" className="text-xs">
                                  {item.badge}
                                </Badge>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {item.description}
                            </span>
                            {item.locations && (
                              <span className="text-xs text-muted-foreground">
                                {item.locations} locations nationwide
                              </span>
                            )}
                            {item.categories && item.categories.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {item.categories.map((category) => (
                                  <Badge
                                    key={category}
                                    variant="secondary"
                                    className="text-xs px-1 py-0 h-5"
                                  >
                                    {category}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
OrganizationMerchantSelector.displayName = "OrganizationMerchantSelector";

export { OrganizationMerchantSelector };
