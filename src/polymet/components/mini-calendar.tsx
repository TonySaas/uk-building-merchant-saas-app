"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  isSameDay,
  isToday,
  isBefore,
  isAfter,
} from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface MiniCalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  disabledDates?: Date[];
  showHeader?: boolean;
  showToday?: boolean;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export function MiniCalendar({
  value,
  onChange,
  disabled = false,
  minDate,
  maxDate,
  className,
  disabledDates = [],
  showHeader = true,
  showToday = true,
  readOnly = false,
  size = "md",
}: MiniCalendarProps) {
  const [date, setDate] = React.useState<Date | undefined>(value);
  const [currentMonth, setCurrentMonth] = React.useState(date || new Date());

  // Update internal date when value prop changes
  React.useEffect(() => {
    setDate(value);
  }, [value]);

  // Handle month navigation
  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => subMonths(prevMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => addMonths(prevMonth, 1));
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
    if (!day || isDateDisabled(day) || disabled || readOnly) return;

    setDate(day);
    onChange?.(day);
  };

  // Handle today button click
  const handleSelectToday = () => {
    const today = new Date();
    if (isDateDisabled(today) || disabled || readOnly) return;

    setDate(today);
    setCurrentMonth(today);
    onChange?.(today);
  };

  // Size classes
  const sizeClasses = {
    sm: {
      container: "max-w-[200px]",
      dayButton: "h-5 w-5 text-xs",
      header: "text-xs",
      weekday: "text-[0.65rem]",
    },
    md: {
      container: "max-w-[250px]",
      dayButton: "h-7 w-7 text-sm",
      header: "text-sm",
      weekday: "text-xs",
    },
    lg: {
      container: "max-w-[300px]",
      dayButton: "h-8 w-8 text-sm",
      header: "text-base",
      weekday: "text-xs",
    },
  };

  return (
    <div className={cn("p-2", sizeClasses[size].container, className)}>
      {showHeader && (
        <div className="flex items-center justify-between mb-2">
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-7 w-7", sizeClasses[size].dayButton)}
            onClick={handlePreviousMonth}
            disabled={
              disabled ||
              readOnly ||
              (minDate && isBefore(subMonths(currentMonth, 1), minDate))
            }
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <div className={cn("font-medium", sizeClasses[size].header)}>
            {format(currentMonth, "MMMM yyyy")}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-7 w-7", sizeClasses[size].dayButton)}
            onClick={handleNextMonth}
            disabled={
              disabled ||
              readOnly ||
              (maxDate && isAfter(addMonths(currentMonth, 1), maxDate))
            }
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
      <div
        className={cn(
          "grid grid-cols-7 gap-1 text-center font-medium text-muted-foreground mb-1",
          sizeClasses[size].weekday
        )}
      >
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="p-1">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="p-0" />;
          }

          const isSelected = date && isSameDay(day, date);
          const isDisabled = isDateDisabled(day) || disabled;
          const isCurrentDay = isToday(day);

          return (
            <Button
              key={day.toISOString()}
              variant="ghost"
              size="icon"
              className={cn(
                sizeClasses[size].dayButton,
                "p-0 font-normal aria-selected:opacity-100",
                isSelected &&
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                isCurrentDay &&
                  !isSelected &&
                  "border border-primary text-primary",
                isDisabled &&
                  "opacity-50 cursor-not-allowed hover:bg-transparent",
                readOnly && "cursor-default"
              )}
              disabled={isDisabled || readOnly}
              onClick={() => handleSelectDate(day)}
              aria-selected={isSelected}
            >
              {format(day, "d")}
            </Button>
          );
        })}
      </div>
      {showToday && (
        <div className="mt-2 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSelectToday}
            disabled={disabled || readOnly || isDateDisabled(new Date())}
            className="text-xs h-7"
          >
            Today
          </Button>
        </div>
      )}
    </div>
  );
}
