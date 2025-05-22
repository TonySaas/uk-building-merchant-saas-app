"use client";

import * as React from "react";
import { ClockIcon } from "lucide-react";
import { format, parse, isValid } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

export interface TimePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  step?: number; // Step in minutes
  is24Hour?: boolean;
  minTime?: string; // Format: "HH:mm" or "hh:mm a"
  maxTime?: string; // Format: "HH:mm" or "hh:mm a"
  readOnly?: boolean;
}

export function TimePicker({
  value,
  onChange,
  placeholder = "Select time",
  disabled = false,
  className,
  step = 15,
  is24Hour = false,
  minTime,
  maxTime,
  readOnly = false,
}: TimePickerProps) {
  const [time, setTime] = React.useState<Date | undefined>(value);
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [isValid, setIsValid] = React.useState(true);

  // Update internal time when value prop changes
  React.useEffect(() => {
    setTime(value);
    if (value) {
      setInputValue(format(value, is24Hour ? "HH:mm" : "hh:mm a"));
    } else {
      setInputValue("");
    }
  }, [value, is24Hour]);

  // Generate time options
  const generateTimeOptions = () => {
    const options = [];
    const totalMinutesInDay = 24 * 60;
    const formatString = is24Hour ? "HH:mm" : "hh:mm a";

    for (let minutes = 0; minutes < totalMinutesInDay; minutes += step) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      const date = new Date();
      date.setHours(hours, mins, 0, 0);

      const timeString = format(date, formatString);

      // Check if time is within min/max range
      let isDisabled = false;

      if (minTime) {
        const minDate = parse(
          minTime,
          is24Hour ? "HH:mm" : "hh:mm a",
          new Date()
        );
        if (date < minDate) {
          isDisabled = true;
        }
      }

      if (maxTime) {
        const maxDate = parse(
          maxTime,
          is24Hour ? "HH:mm" : "hh:mm a",
          new Date()
        );
        if (date > maxDate) {
          isDisabled = true;
        }
      }

      options.push({ time: date, label: timeString, disabled: isDisabled });
    }

    return options;
  };

  const timeOptions = React.useMemo(generateTimeOptions, [
    step,
    is24Hour,
    minTime,
    maxTime,
  ]);

  // Handle time selection
  const handleSelectTime = (selectedTime: Date) => {
    if (readOnly) return;

    setTime(selectedTime);
    setInputValue(format(selectedTime, is24Hour ? "HH:mm" : "hh:mm a"));
    onChange?.(selectedTime);
    setIsOpen(false);
    setIsValid(true);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;

    const value = e.target.value;
    setInputValue(value);

    try {
      // Try to parse the input value
      const formatString = is24Hour ? "HH:mm" : "hh:mm a";
      const parsedDate = parse(value, formatString, new Date());

      if (isValid(parsedDate)) {
        setTime(parsedDate);
        onChange?.(parsedDate);
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } catch (error) {
      setIsValid(false);
    }
  };

  // Handle blur event
  const handleBlur = () => {
    if (!time && inputValue) {
      setInputValue("");
      setIsValid(true);
    } else if (time) {
      setInputValue(format(time, is24Hour ? "HH:mm" : "hh:mm a"));
      setIsValid(true);
    }
  };

  // Group time options by hour for better organization
  const groupedTimeOptions = React.useMemo(() => {
    const grouped: { [hour: string]: typeof timeOptions } = {};

    timeOptions.forEach((option) => {
      const hour = format(option.time, is24Hour ? "HH" : "hh a");
      if (!grouped[hour]) {
        grouped[hour] = [];
      }
      grouped[hour].push(option);
    });

    return grouped;
  }, [timeOptions, is24Hour]);

  return (
    <Popover open={isOpen && !disabled && !readOnly} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled || readOnly}
            className={cn(
              "pr-10",
              !isValid && "border-red-500 focus-visible:ring-red-500",
              className
            )}
          />

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 text-muted-foreground"
            disabled={disabled || readOnly}
            onClick={() => setIsOpen(true)}
            type="button"
          >
            <ClockIcon className="h-4 w-4" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="h-[300px] overflow-y-auto p-2">
          {Object.entries(groupedTimeOptions).map(([hour, options]) => (
            <div key={hour} className="mb-2">
              <div className="sticky top-0 bg-background px-2 py-1 text-sm font-medium text-muted-foreground">
                {hour}
              </div>
              <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                {options.map((option) => {
                  const isSelected =
                    time &&
                    format(time, is24Hour ? "HH:mm" : "hh:mm a") ===
                      option.label;

                  return (
                    <Button
                      key={option.label}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        "h-8 justify-center",
                        isSelected && "bg-primary text-primary-foreground",
                        option.disabled && "opacity-50 cursor-not-allowed"
                      )}
                      disabled={option.disabled}
                      onClick={() => handleSelectTime(option.time)}
                    >
                      {option.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
