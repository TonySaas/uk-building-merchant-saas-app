"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  CalendarIcon,
  TagIcon,
  PercentIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Sample data for demonstration
const promotions = [
  {
    id: "OF-1001",
    name: "Summer Sale - Power Tools",
    merchant: "Toolstation",
    startDate: "2023-07-01",
    endDate: "2023-08-31",
    discount: 15,
    color: "bg-blue-500",
  },
  {
    id: "OF-1002",
    name: "Back to School - Stationery",
    merchant: "Office Depot",
    startDate: "2023-08-15",
    endDate: "2023-09-15",
    discount: 20,
    color: "bg-purple-500",
  },
  {
    id: "OF-1003",
    name: "Clearance - Garden Furniture",
    merchant: "Garden World",
    startDate: "2023-07-10",
    endDate: "2023-07-31",
    discount: 30,
    color: "bg-green-500",
  },
  {
    id: "OF-1004",
    name: "Flash Sale - Electronics",
    merchant: "Currys",
    startDate: "2023-07-05",
    endDate: "2023-07-07",
    discount: 25,
    color: "bg-red-500",
  },
  {
    id: "OF-1006",
    name: "Holiday Season - Decorations",
    merchant: "HomeBase",
    startDate: "2023-07-20",
    endDate: "2023-08-25",
    discount: 15,
    color: "bg-amber-500",
  },
];

export default function PromotionCalendar({ isLoading = false }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month");

  // Get current year and month
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Navigate to previous month/week
  const goToPrevious = () => {
    if (view === "month") {
      setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    } else if (view === "week") {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - 7);
      setCurrentDate(newDate);
    }
  };

  // Navigate to next month/week
  const goToNext = () => {
    if (view === "month") {
      setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    } else if (view === "week") {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() + 7);
      setCurrentDate(newDate);
    }
  };

  // Go to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get days in month
  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];

    // Get the day of the week for the first day of the month
    const firstDayOfMonth = date.getDay();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add days of the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  // Get days in week
  const getDaysInWeek = (date) => {
    const days = [];
    const currentDay = date.getDay(); // 0 for Sunday, 1 for Monday, etc.

    // Calculate the start date of the week (Sunday)
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - currentDay);

    // Add 7 days starting from the start date
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }

    return days;
  };

  // Check if a promotion is active on a given date
  const isPromotionActiveOnDate = (promotion, date) => {
    const promotionStart = new Date(promotion.startDate);
    const promotionEnd = new Date(promotion.endDate);

    return date >= promotionStart && date <= promotionEnd;
  };

  // Get promotions for a specific date
  const getPromotionsForDate = (date) => {
    if (!date) return [];

    return promotions.filter((promotion) =>
      isPromotionActiveOnDate(promotion, date)
    );
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Check if date is today
  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Check if date is in current month
  const isCurrentMonth = (date) => {
    if (!date) return false;
    return date.getMonth() === currentMonth;
  };

  // Get days based on current view
  const days =
    view === "month"
      ? getDaysInMonth(currentYear, currentMonth)
      : getDaysInWeek(currentDate);

  // Get month and year display
  const monthYearDisplay = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Get week display
  const weekDisplay = () => {
    const weekDays = getDaysInWeek(currentDate);
    const startDate = weekDays[0].toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const endDate = weekDays[6].toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `${startDate} - ${endDate}`;
  };

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="rounded-full bg-muted p-3 mb-4">
        <CalendarIcon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">No promotions scheduled</h3>
      <p className="text-sm text-muted-foreground text-center max-w-sm mt-2">
        There are no promotions scheduled for this period. Create a new
        promotion to get started.
      </p>
      <Button className="mt-4">
        <PlusIcon className="h-4 w-4 mr-1" />
        Create Promotion
      </Button>
    </div>
  );

  // Loading skeleton
  const CalendarSkeleton = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-[180px]" />

        <div className="flex items-center space-x-2">
          <Skeleton className="h-9 w-[100px]" />

          <Skeleton className="h-9 w-24" />

          <Skeleton className="h-9 w-9 rounded-md" />

          <Skeleton className="h-9 w-9 rounded-md" />

          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array(7)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-8" />
          ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array(35)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-md" />
          ))}
      </div>
    </div>
  );

  if (isLoading) {
    return <CalendarSkeleton />;
  }

  // Check if there are any promotions in the current view
  const hasPromotions = days.some(
    (day) => day && getPromotionsForDate(day).length > 0
  );

  return (
    <Card>
      <CardHeader className="px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <div>
          <CardTitle>
            {view === "month" ? monthYearDisplay : weekDisplay()}
          </CardTitle>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={view} onValueChange={setView}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <div className="flex items-center">
            <Button variant="outline" size="icon" onClick={goToPrevious}>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={goToNext}>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:px-6 pb-6">
        {hasPromotions ? (
          <>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-sm font-medium py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => (
                <div
                  key={index}
                  className={cn(
                    "min-h-28 border rounded-md p-1",
                    day && isToday(day) ? "border-primary" : "border-border",
                    day && !isCurrentMonth(day) ? "bg-muted/30" : "",
                    !day && "bg-muted/10"
                  )}
                >
                  {day && (
                    <>
                      <div className="flex justify-between items-center mb-1">
                        <span
                          className={cn(
                            "text-sm font-medium h-6 w-6 flex items-center justify-center rounded-full",
                            isToday(day)
                              ? "bg-primary text-primary-foreground"
                              : ""
                          )}
                        >
                          {day.getDate()}
                        </span>
                        {isCurrentMonth(day) && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                          >
                            <PlusIcon className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <div className="space-y-1">
                        {getPromotionsForDate(day).map((promotion) => (
                          <TooltipProvider key={promotion.id}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className={cn(
                                    "text-xs p-1 rounded truncate text-white",
                                    promotion.color
                                  )}
                                >
                                  {promotion.name}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent side="right">
                                <div className="space-y-1">
                                  <p className="font-medium">
                                    {promotion.name}
                                  </p>
                                  <p className="text-xs">
                                    {promotion.merchant}
                                  </p>
                                  <div className="flex items-center text-xs">
                                    <CalendarIcon className="h-3 w-3 mr-1" />
                                    {new Date(
                                      promotion.startDate
                                    ).toLocaleDateString()}{" "}
                                    -{" "}
                                    {new Date(
                                      promotion.endDate
                                    ).toLocaleDateString()}
                                  </div>
                                  <Badge className="mt-1 bg-red-500 hover:bg-red-500">
                                    <PercentIcon className="h-3 w-3 mr-1" />
                                    {promotion.discount}% OFF
                                  </Badge>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <EmptyState />
        )}
      </CardContent>
    </Card>
  );
}
