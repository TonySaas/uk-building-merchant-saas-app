"use client";

import * as React from "react";
import { CalendarIcon, ClockIcon } from "lucide-react";
import {
  addDays,
  addWeeks,
  addMonths,
  format,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { cn } from "@/lib/utils";
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
import { DatePicker } from "@/polymet/components/date-picker";
import {
  DateRangePicker,
  DateRange,
} from "@/polymet/components/date-range-picker";

export interface RelativeDateOption {
  label: string;
  value: string;
  getDate: () => Date | DateRange;
}

export interface RelativeDateSelectorProps {
  value?: Date | DateRange;
  onChange?: (value: Date | DateRange) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  showCustomOption?: boolean;
  isRange?: boolean;
  readOnly?: boolean;
  customOptions?: RelativeDateOption[];
}

export function RelativeDateSelector({
  value,
  onChange,
  placeholder = "Select date",
  disabled = false,
  className,
  showCustomOption = true,
  isRange = false,
  readOnly = false,
  customOptions,
}: RelativeDateSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<
    Date | DateRange | undefined
  >(value);
  const [selectedOption, setSelectedOption] = React.useState<string>("");
  const [showCustomPicker, setShowCustomPicker] = React.useState(false);

  // Update internal state when value prop changes
  React.useEffect(() => {
    setSelectedValue(value);

    // Try to find matching predefined option
    if (value) {
      const matchingOption = getRelativeDateOptions().find((option) => {
        const optionValue = option.getDate();
        if (isDateRange(value) && isDateRange(optionValue)) {
          return isSameDateRange(value, optionValue);
        } else if (!isDateRange(value) && !isDateRange(optionValue)) {
          return isSameDay(value as Date, optionValue as Date);
        }
        return false;
      });

      if (matchingOption) {
        setSelectedOption(matchingOption.value);
      } else {
        setSelectedOption("custom");
      }
    } else {
      setSelectedOption("");
    }
  }, [value]);

  // Helper functions for date comparison
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isSameDateRange = (range1: DateRange, range2: DateRange) => {
    return (
      isSameDay(range1.from as Date, range2.from as Date) &&
      isSameDay(range1.to as Date, range2.to as Date)
    );
  };

  const isDateRange = (value: any): value is DateRange => {
    return (
      value && typeof value === "object" && "from" in value && "to" in value
    );
  };

  // Get relative date options
  const getRelativeDateOptions = (): RelativeDateOption[] => {
    const today = new Date();

    const defaultOptions: RelativeDateOption[] = [
      {
        label: "Today",
        value: "today",
        getDate: () =>
          isRange ? { from: startOfDay(today), to: endOfDay(today) } : today,
      },
      {
        label: "Tomorrow",
        value: "tomorrow",
        getDate: () => {
          const tomorrow = addDays(today, 1);
          return isRange
            ? { from: startOfDay(tomorrow), to: endOfDay(tomorrow) }
            : tomorrow;
        },
      },
      {
        label: "This week",
        value: "this-week",
        getDate: () =>
          isRange ? { from: startOfWeek(today), to: endOfWeek(today) } : today,
      },
      {
        label: "Next week",
        value: "next-week",
        getDate: () => {
          const nextWeek = addWeeks(today, 1);
          return isRange
            ? { from: startOfWeek(nextWeek), to: endOfWeek(nextWeek) }
            : nextWeek;
        },
      },
      {
        label: "This month",
        value: "this-month",
        getDate: () =>
          isRange
            ? { from: startOfMonth(today), to: endOfMonth(today) }
            : today,
      },
      {
        label: "Next month",
        value: "next-month",
        getDate: () => {
          const nextMonth = addMonths(today, 1);
          return isRange
            ? { from: startOfMonth(nextMonth), to: endOfMonth(nextMonth) }
            : nextMonth;
        },
      },
      {
        label: "In 3 days",
        value: "in-3-days",
        getDate: () => {
          const inThreeDays = addDays(today, 3);
          return isRange
            ? { from: startOfDay(inThreeDays), to: endOfDay(inThreeDays) }
            : inThreeDays;
        },
      },
      {
        label: "In 7 days",
        value: "in-7-days",
        getDate: () => {
          const inSevenDays = addDays(today, 7);
          return isRange
            ? { from: startOfDay(inSevenDays), to: endOfDay(inSevenDays) }
            : inSevenDays;
        },
      },
      {
        label: "In 30 days",
        value: "in-30-days",
        getDate: () => {
          const inThirtyDays = addDays(today, 30);
          return isRange
            ? { from: startOfDay(inThirtyDays), to: endOfDay(inThirtyDays) }
            : inThirtyDays;
        },
      },
      {
        label: "Next 7 days",
        value: "next-7-days",
        getDate: () => ({
          from: startOfDay(today),
          to: endOfDay(addDays(today, 6)),
        }),
      },
      {
        label: "Next 30 days",
        value: "next-30-days",
        getDate: () => ({
          from: startOfDay(today),
          to: endOfDay(addDays(today, 29)),
        }),
      },
    ];

    // Filter out range-only options if not in range mode
    const filteredOptions = defaultOptions.filter((option) => {
      if (!isRange) {
        return !["next-7-days", "next-30-days"].includes(option.value);
      }
      return true;
    });

    // Add custom options if provided
    const allOptions = customOptions
      ? [...filteredOptions, ...customOptions]
      : filteredOptions;

    // Add custom date option if enabled
    if (showCustomOption) {
      allOptions.push({
        label: "Custom date",
        value: "custom",
        getDate: () =>
          isRange ? { from: undefined, to: undefined } : new Date(),
      });
    }

    return allOptions;
  };

  const relativeDateOptions = getRelativeDateOptions();

  // Handle option selection
  const handleSelectOption = (optionValue: string) => {
    if (readOnly) return;

    const option = relativeDateOptions.find((opt) => opt.value === optionValue);
    if (!option) return;

    setSelectedOption(optionValue);

    if (optionValue === "custom") {
      setShowCustomPicker(true);
    } else {
      const dateValue = option.getDate();
      setSelectedValue(dateValue);
      onChange?.(dateValue);
      setIsOpen(false);
    }
  };

  // Handle custom date selection
  const handleCustomDateChange = (date: Date | DateRange) => {
    if (readOnly) return;

    setSelectedValue(date);
    onChange?.(date);
    setShowCustomPicker(false);
    setIsOpen(false);
  };

  // Format display value
  const formatDisplayValue = () => {
    if (!selectedValue) return placeholder;

    if (isDateRange(selectedValue)) {
      if (selectedValue.from && selectedValue.to) {
        return `${format(selectedValue.from, "PPP")} - ${format(selectedValue.to, "PPP")}`;
      } else if (selectedValue.from) {
        return `From ${format(selectedValue.from, "PPP")}`;
      } else if (selectedValue.to) {
        return `Until ${format(selectedValue.to, "PPP")}`;
      }
    } else if (selectedValue) {
      return format(selectedValue as Date, "PPP");
    }

    return placeholder;
  };

  // Get option label from value
  const getOptionLabel = () => {
    if (!selectedOption) return placeholder;

    const option = relativeDateOptions.find(
      (opt) => opt.value === selectedOption
    );
    return option ? option.label : "Custom date";
  };

  return (
    <Popover open={isOpen && !disabled && !readOnly} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedValue && "text-muted-foreground",
            className
          )}
          disabled={disabled || readOnly}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />

          <div className="flex flex-col items-start">
            <span className="text-sm">{getOptionLabel()}</span>
            <span className="text-xs text-muted-foreground">
              {formatDisplayValue()}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        {showCustomPicker ? (
          <div className="p-4 space-y-4">
            <Button
              variant="ghost"
              size="sm"
              className="mb-2"
              onClick={() => setShowCustomPicker(false)}
            >
              ← Back to options
            </Button>
            {isRange ? (
              <DateRangePicker
                value={
                  isDateRange(selectedValue)
                    ? (selectedValue as DateRange)
                    : undefined
                }
                onChange={handleCustomDateChange as (range: DateRange) => void}
                placeholder="Select date range"
              />
            ) : (
              <DatePicker
                value={
                  !isDateRange(selectedValue)
                    ? (selectedValue as Date)
                    : undefined
                }
                onChange={handleCustomDateChange as (date: Date) => void}
                placeholder="Select date"
              />
            )}
          </div>
        ) : (
          <Command>
            <CommandInput placeholder="Search date..." />

            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {relativeDateOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={handleSelectOption}
                  >
                    {option.value === "custom" ? (
                      <ClockIcon className="mr-2 h-4 w-4" />
                    ) : (
                      <CalendarIcon className="mr-2 h-4 w-4" />
                    )}
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        )}
      </PopoverContent>
    </Popover>
  );
}
