"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  setMonth,
  setYear,
  isValid,
  isToday,
  isSameDay,
  isAfter,
  isBefore,
} from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  disabledDates?: Date[];
  showTodayButton?: boolean;
  clearable?: boolean;
  readOnly?: boolean;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  disabled = false,
  minDate,
  maxDate,
  className,
  disabledDates = [],
  showTodayButton = true,
  clearable = true,
  readOnly = false,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value);
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentMonth, setCurrentMonth] = React.useState(date || new Date());

  // Update internal date when value prop changes
  React.useEffect(() => {
    setDate(value);
  }, [value]);

  // Generate month and year arrays for dropdowns
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
  }, []);

  // Handle month navigation
  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => subMonths(prevMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => addMonths(prevMonth, 1));
  };

  // Handle month/year selection
  const handleMonthChange = (monthIndex: number) => {
    setCurrentMonth((prevMonth) => setMonth(prevMonth, monthIndex));
  };

  const handleYearChange = (year: number) => {
    setCurrentMonth((prevMonth) => setYear(prevMonth, year));
  };

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const dayOfWeek = firstDay.getDay();
    const daysArray = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < dayOfWeek; i++) {
      daysArray.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(new Date(year, month, i));
    }

    return daysArray;
  };

  const days = getDaysInMonth(currentMonth);

  // Check if a date is disabled
  const isDateDisabled = (date: Date) => {
    if (!date) return false;

    // Check if date is within min/max range
    if (minDate && isBefore(date, minDate)) return true;
    if (maxDate && isAfter(date, maxDate)) return true;

    // Check if date is in disabledDates array
    return disabledDates.some((disabledDate) => isSameDay(date, disabledDate));
  };

  // Handle date selection
  const handleSelectDate = (day: Date) => {
    if (!day || isDateDisabled(day) || readOnly) return;

    setDate(day);
    onChange?.(day);
    setIsOpen(false);
  };

  // Handle today button click
  const handleSelectToday = () => {
    const today = new Date();
    if (isDateDisabled(today)) return;

    setDate(today);
    setCurrentMonth(today);
    onChange?.(today);
  };

  // Handle clear button click
  const handleClear = () => {
    setDate(undefined);
    onChange?.(undefined as any);
  };

  return (
    <Popover open={isOpen && !disabled && !readOnly} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
          disabled={disabled || readOnly}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />

          {date && isValid(date) ? format(date, "PPP") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePreviousMonth}
              disabled={
                minDate && isBefore(subMonths(currentMonth, 1), minDate)
              }
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <Select
                value={currentMonth.getMonth().toString()}
                onValueChange={(value) => handleMonthChange(parseInt(value))}
              >
                <SelectTrigger className="h-8 w-[110px]">
                  <SelectValue>{format(currentMonth, "MMMM")}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {months.map((month, i) => (
                    <SelectItem key={month} value={i.toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={currentMonth.getFullYear().toString()}
                onValueChange={(value) => handleYearChange(parseInt(value))}
              >
                <SelectTrigger className="h-8 w-[80px]">
                  <SelectValue>{format(currentMonth, "yyyy")}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextMonth}
              disabled={maxDate && isAfter(addMonths(currentMonth, 1), maxDate)}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground mb-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="p-1">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (!day) {
                return <div key={`empty-${index}`} className="p-2" />;
              }

              const isSelected = date && isSameDay(day, date);
              const isDisabled = isDateDisabled(day);
              const isCurrentDay = isToday(day);

              return (
                <Button
                  key={day.toISOString()}
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
                    isSelected &&
                      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                    isCurrentDay &&
                      !isSelected &&
                      "border border-primary text-primary",
                    isDisabled &&
                      "opacity-50 cursor-not-allowed hover:bg-transparent"
                  )}
                  disabled={isDisabled}
                  onClick={() => handleSelectDate(day)}
                  aria-selected={isSelected}
                >
                  {format(day, "d")}
                </Button>
              );
            })}
          </div>
          <div className="mt-3 flex items-center justify-between">
            {showTodayButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectToday}
                className="text-xs"
              >
                Today
              </Button>
            )}
            {clearable && date && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-xs ml-auto"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
