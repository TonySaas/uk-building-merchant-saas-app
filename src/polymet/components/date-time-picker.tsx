"use client";

import * as React from "react";
import { CalendarIcon, ClockIcon } from "lucide-react";
import {
  format,
  parse,
  isValid,
  setHours,
  setMinutes,
  setSeconds,
} from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePicker } from "@/polymet/components/date-picker";
import { TimePicker } from "@/polymet/components/time-picker";

export interface DateTimePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  disabledDates?: Date[];
  timeStep?: number;
  is24Hour?: boolean;
  minTime?: string;
  maxTime?: string;
  readOnly?: boolean;
}

export function DateTimePicker({
  value,
  onChange,
  placeholder = "Select date and time",
  disabled = false,
  minDate,
  maxDate,
  className,
  disabledDates = [],
  timeStep = 15,
  is24Hour = false,
  minTime,
  maxTime,
  readOnly = false,
}: DateTimePickerProps) {
  const [dateTime, setDateTime] = React.useState<Date | undefined>(value);
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<string>("date");

  // Update internal state when value prop changes
  React.useEffect(() => {
    setDateTime(value);
  }, [value]);

  // Handle date change
  const handleDateChange = (date: Date) => {
    if (!date || readOnly) return;

    let newDateTime: Date;

    if (dateTime) {
      // Preserve time from existing dateTime
      newDateTime = new Date(date);
      newDateTime.setHours(
        dateTime.getHours(),
        dateTime.getMinutes(),
        dateTime.getSeconds(),
        dateTime.getMilliseconds()
      );
    } else {
      // Set default time to current time
      newDateTime = date;
    }

    setDateTime(newDateTime);
    onChange?.(newDateTime);

    // Switch to time tab after date selection
    setActiveTab("time");
  };

  // Handle time change
  const handleTimeChange = (time: Date) => {
    if (!time || readOnly) return;

    let newDateTime: Date;

    if (dateTime) {
      // Preserve date from existing dateTime
      newDateTime = new Date(dateTime);
      newDateTime.setHours(
        time.getHours(),
        time.getMinutes(),
        time.getSeconds(),
        time.getMilliseconds()
      );
    } else {
      // Set default date to today
      newDateTime = new Date();
      newDateTime.setHours(
        time.getHours(),
        time.getMinutes(),
        time.getSeconds(),
        time.getMilliseconds()
      );
    }

    setDateTime(newDateTime);
    onChange?.(newDateTime);
  };

  // Format the display value
  const formatDisplayValue = () => {
    if (!dateTime) return placeholder;

    const dateFormat = "PPP";
    const timeFormat = is24Hour ? "HH:mm" : "hh:mm a";

    return `${format(dateTime, dateFormat)} at ${format(dateTime, timeFormat)}`;
  };

  return (
    <Popover open={isOpen && !disabled && !readOnly} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !dateTime && "text-muted-foreground",
            className
          )}
          disabled={disabled || readOnly}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />

          {formatDisplayValue()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center border-b px-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="date"
                className="data-[state=active]:bg-muted"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                Date
              </TabsTrigger>
              <TabsTrigger
                value="time"
                className="data-[state=active]:bg-muted"
              >
                <ClockIcon className="mr-2 h-4 w-4" />
                Time
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="date" className="p-4">
            <DatePicker
              value={dateTime}
              onChange={handleDateChange}
              minDate={minDate}
              maxDate={maxDate}
              disabledDates={disabledDates}
              clearable={false}
            />
          </TabsContent>
          <TabsContent value="time" className="p-4">
            <TimePicker
              value={dateTime}
              onChange={handleTimeChange}
              step={timeStep}
              is24Hour={is24Hour}
              minTime={minTime}
              maxTime={maxTime}
            />
          </TabsContent>
        </Tabs>
        <div className="flex items-center justify-between p-4 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setDateTime(undefined);
              onChange?.(undefined as any);
            }}
            className="text-xs"
          >
            Clear
          </Button>
          <Button
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-xs"
          >
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
