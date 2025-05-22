"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

// Base Select Components
const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <CaretSortIcon className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <CaretSortIcon className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <CaretSortIcon className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />

      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// Searchable Select Component
interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SearchableSelectProps {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  emptyMessage?: string;
}

const SearchableSelect = React.forwardRef<
  HTMLButtonElement,
  SearchableSelectProps
>(
  (
    {
      options,
      value,
      onChange,
      placeholder = "Select an option",
      disabled,
      error,
      className,
      emptyMessage = "No results found.",
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");

    const selectedOption = React.useMemo(
      () => options.find((option) => option.value === value),
      [options, value]
    );

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
                "w-full justify-between font-normal",
                error ? "border-red-500 focus:ring-red-500" : "",
                disabled ? "opacity-50 cursor-not-allowed" : ""
              )}
              disabled={disabled}
            >
              {selectedOption ? selectedOption.label : placeholder}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
            <Command>
              <CommandInput
                placeholder="Search..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="h-9"
              />

              <CommandList>
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                <CommandGroup>
                  {options
                    .filter((option) =>
                      option.label
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                        onSelect={() => {
                          onChange(option.value);
                          setOpen(false);
                        }}
                        className={
                          option.disabled ? "opacity-50 cursor-not-allowed" : ""
                        }
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === option.value ? "opacity-100" : "opacity-0"
                          )}
                        />

                        {option.label}
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
SearchableSelect.displayName = "SearchableSelect";

// Multi-Select Component
interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  emptyMessage?: string;
  maxItems?: number;
}

const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      value = [],
      onChange,
      placeholder = "Select options",
      disabled,
      error,
      className,
      emptyMessage = "No results found.",
      maxItems,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");

    const selectedOptions = React.useMemo(
      () => options.filter((option) => value.includes(option.value)),
      [options, value]
    );

    const handleSelect = React.useCallback(
      (optionValue: string) => {
        const option = options.find((o) => o.value === optionValue);
        if (!option) return;

        if (value.includes(optionValue)) {
          onChange(value.filter((v) => v !== optionValue));
        } else {
          if (maxItems && value.length >= maxItems) {
            return;
          }
          onChange([...value, optionValue]);
        }
      },
      [options, value, onChange, maxItems]
    );

    const handleRemove = React.useCallback(
      (optionValue: string) => {
        onChange(value.filter((v) => v !== optionValue));
      },
      [value, onChange]
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Backspace" && !searchQuery && value.length > 0) {
          onChange(value.slice(0, -1));
        }
      },
      [searchQuery, value, onChange]
    );

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
                "w-full min-h-10 h-auto justify-between font-normal",
                error ? "border-red-500 focus:ring-red-500" : "",
                disabled ? "opacity-50 cursor-not-allowed" : "",
                "flex-wrap"
              )}
              disabled={disabled}
              onClick={() => setOpen(true)}
            >
              <div className="flex flex-wrap gap-1 items-center">
                {selectedOptions.length > 0 ? (
                  selectedOptions.map((option) => (
                    <Badge
                      key={option.value}
                      variant="secondary"
                      className="mr-1 mb-1 mt-1"
                    >
                      {option.label}
                      <button
                        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleRemove(option.value);
                          }
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemove(option.value);
                        }}
                      >
                        <XIcon className="h-3 w-3" />

                        <span className="sr-only">Remove {option.label}</span>
                      </button>
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted-foreground">{placeholder}</span>
                )}
              </div>
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
            <Command>
              <CommandInput
                placeholder="Search..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="h-9"
                onKeyDown={handleKeyDown}
              />

              <CommandList>
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                <CommandGroup>
                  {options
                    .filter((option) =>
                      option.label
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((option) => {
                      const isSelected = value.includes(option.value);
                      return (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          disabled={option.disabled}
                          onSelect={() => {
                            handleSelect(option.value);
                          }}
                          className={cn(
                            option.disabled
                              ? "opacity-50 cursor-not-allowed"
                              : "",
                            isSelected ? "bg-accent" : ""
                          )}
                        >
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "opacity-50"
                            )}
                          >
                            {isSelected && <CheckIcon className="h-3 w-3" />}
                          </div>
                          {option.label}
                        </CommandItem>
                      );
                    })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        {maxItems && value.length >= maxItems && (
          <p className="mt-1 text-xs text-amber-500">
            Maximum of {maxItems} items selected
          </p>
        )}
      </div>
    );
  }
);
MultiSelect.displayName = "MultiSelect";

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SearchableSelect,
  MultiSelect,
};
