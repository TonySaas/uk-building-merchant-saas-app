"use client";

import * as React from "react";
import { format, isAfter, isBefore, isSameDay, isValid } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DatePicker } from "@/polymet/components/date-picker";

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  disabledDates?: Date[];
  showValidationError?: boolean;
  readOnly?: boolean;
}

export function DateRangePicker({
  value,
  onChange,
  placeholder = "Select date range",
  disabled = false,
  minDate,
  maxDate,
  className,
  disabledDates = [],
  showValidationError = true,
  readOnly = false,
}: DateRangePickerProps) {
  const [dateRange, setDateRange] = React.useState<DateRange>(
    value || { from: undefined, to: undefined }
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const [validationError, setValidationError] = React.useState<string | null>(
    null
  );

  // Update internal state when value prop changes
  React.useEffect(() => {
    if (value) {
      setDateRange(value);
    }
  }, [value]);

  // Validate date range
  React.useEffect(() => {
    if (dateRange.from && dateRange.to) {
      if (isAfter(dateRange.from, dateRange.to)) {
        setValidationError("End date must be after start date");
      } else {
        setValidationError(null);
      }
    } else {
      setValidationError(null);
    }
  }, [dateRange.from, dateRange.to]);

  const handleFromChange = (date: Date) => {
    const newRange = { ...dateRange, from: date };
    setDateRange(newRange);

    // If end date exists and is before start date, clear end date
    if (newRange.to && isAfter(date, newRange.to)) {
      newRange.to = undefined;
    }

    onChange?.(newRange);
  };

  const handleToChange = (date: Date) => {
    const newRange = { ...dateRange, to: date };
    setDateRange(newRange);
    onChange?.(newRange);
  };

  const handleClear = () => {
    const newRange = { from: undefined, to: undefined };
    setDateRange(newRange);
    onChange?.(newRange);
  };

  const formatDateRange = () => {
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "PPP")} - ${format(dateRange.to, "PPP")}`;
    }

    if (dateRange.from) {
      return `${format(dateRange.from, "PPP")} - Select end date`;
    }

    return placeholder;
  };

  return (
    <div className="space-y-2">
      <Popover open={isOpen && !disabled && !readOnly} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !dateRange.from && !dateRange.to && "text-muted-foreground",
              className
            )}
            disabled={disabled || readOnly}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />

            {formatDateRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-4 space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="font-medium">Start date</div>
                <DatePicker
                  value={dateRange.from}
                  onChange={handleFromChange}
                  placeholder="Select start date"
                  minDate={minDate}
                  maxDate={maxDate}
                  disabledDates={disabledDates}
                  clearable={false}
                />
              </div>
              <div className="grid gap-2">
                <div className="font-medium">End date</div>
                <DatePicker
                  value={dateRange.to}
                  onChange={handleToChange}
                  placeholder="Select end date"
                  minDate={dateRange.from || minDate}
                  maxDate={maxDate}
                  disabledDates={disabledDates}
                  clearable={false}
                />
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              {validationError && showValidationError && (
                <p className="text-xs text-red-500">{validationError}</p>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-xs ml-auto"
              >
                Clear
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {validationError && showValidationError && !isOpen && (
        <p className="text-xs text-red-500">{validationError}</p>
      )}
    </div>
  );
}
