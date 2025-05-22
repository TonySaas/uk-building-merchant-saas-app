"use client";

import * as React from "react";
import { CalendarIcon, PlusIcon, TrashIcon, XIcon } from "lucide-react";
import { format, parse, isValid } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/polymet/components/date-picker";
import { TimePicker } from "@/polymet/components/time-picker";

export interface ScheduleRule {
  id: string;
  type: "once" | "daily" | "weekly" | "monthly";
  startDate: Date;
  endDate?: Date;
  time?: Date;
  daysOfWeek?: number[]; // 0 = Sunday, 1 = Monday, etc.
  dayOfMonth?: number;
  active: boolean;
}

export interface ScheduleBuilderProps {
  value?: ScheduleRule[];
  onChange?: (rules: ScheduleRule[]) => void;
  disabled?: boolean;
  readOnly?: boolean;
  maxRules?: number;
  className?: string;
  showHeader?: boolean;
}

export function ScheduleBuilder({
  value = [],
  onChange,
  disabled = false,
  readOnly = false,
  maxRules = 10,
  className,
  showHeader = true,
}: ScheduleBuilderProps) {
  const [rules, setRules] = React.useState<ScheduleRule[]>(value);

  // Update internal state when value prop changes
  React.useEffect(() => {
    setRules(value);
  }, [value]);

  // Generate unique ID
  const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  // Add a new rule
  const handleAddRule = () => {
    if (disabled || readOnly || rules.length >= maxRules) return;

    const newRule: ScheduleRule = {
      id: generateId(),
      type: "once",
      startDate: new Date(),
      active: true,
    };

    const updatedRules = [...rules, newRule];
    setRules(updatedRules);
    onChange?.(updatedRules);
  };

  // Remove a rule
  const handleRemoveRule = (id: string) => {
    if (disabled || readOnly) return;

    const updatedRules = rules.filter((rule) => rule.id !== id);
    setRules(updatedRules);
    onChange?.(updatedRules);
  };

  // Update a rule
  const handleUpdateRule = (id: string, updates: Partial<ScheduleRule>) => {
    if (disabled || readOnly) return;

    const updatedRules = rules.map((rule) => {
      if (rule.id === id) {
        return { ...rule, ...updates };
      }
      return rule;
    });

    setRules(updatedRules);
    onChange?.(updatedRules);
  };

  // Toggle day of week
  const toggleDayOfWeek = (ruleId: string, day: number) => {
    if (disabled || readOnly) return;

    const rule = rules.find((r) => r.id === ruleId);
    if (!rule) return;

    const daysOfWeek = rule.daysOfWeek || [];
    const updatedDays = daysOfWeek.includes(day)
      ? daysOfWeek.filter((d) => d !== day)
      : [...daysOfWeek, day];

    handleUpdateRule(ruleId, { daysOfWeek: updatedDays });
  };

  // Render rule form based on type
  const renderRuleForm = (rule: ScheduleRule) => {
    switch (rule.type) {
      case "once":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor={`${rule.id}-date`}>Date</Label>
                <DatePicker
                  value={rule.startDate}
                  onChange={(date) =>
                    handleUpdateRule(rule.id, { startDate: date })
                  }
                  disabled={disabled || !rule.active || readOnly}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`${rule.id}-time`}>Time</Label>
                <TimePicker
                  value={rule.time}
                  onChange={(time) => handleUpdateRule(rule.id, { time })}
                  disabled={disabled || !rule.active || readOnly}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        );

      case "daily":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor={`${rule.id}-start-date`}>Start Date</Label>
                <DatePicker
                  value={rule.startDate}
                  onChange={(date) =>
                    handleUpdateRule(rule.id, { startDate: date })
                  }
                  disabled={disabled || !rule.active || readOnly}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`${rule.id}-end-date`}>
                  End Date (Optional)
                </Label>
                <DatePicker
                  value={rule.endDate}
                  onChange={(date) =>
                    handleUpdateRule(rule.id, { endDate: date })
                  }
                  disabled={disabled || !rule.active || readOnly}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor={`${rule.id}-time`}>Time</Label>
              <TimePicker
                value={rule.time}
                onChange={(time) => handleUpdateRule(rule.id, { time })}
                disabled={disabled || !rule.active || readOnly}
                className="mt-1"
              />
            </div>
          </div>
        );

      case "weekly":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor={`${rule.id}-start-date`}>Start Date</Label>
                <DatePicker
                  value={rule.startDate}
                  onChange={(date) =>
                    handleUpdateRule(rule.id, { startDate: date })
                  }
                  disabled={disabled || !rule.active || readOnly}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`${rule.id}-end-date`}>
                  End Date (Optional)
                </Label>
                <DatePicker
                  value={rule.endDate}
                  onChange={(date) =>
                    handleUpdateRule(rule.id, { endDate: date })
                  }
                  disabled={disabled || !rule.active || readOnly}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor={`${rule.id}-time`}>Time</Label>
              <TimePicker
                value={rule.time}
                onChange={(time) => handleUpdateRule(rule.id, { time })}
                disabled={disabled || !rule.active || readOnly}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="mb-2 block">Days of Week</Label>
              <div className="flex flex-wrap gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day, index) => (
                    <Button
                      key={day}
                      type="button"
                      variant={
                        rule.daysOfWeek?.includes(index) ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => toggleDayOfWeek(rule.id, index)}
                      disabled={disabled || !rule.active || readOnly}
                      className="w-12"
                    >
                      {day}
                    </Button>
                  )
                )}
              </div>
            </div>
          </div>
        );

      case "monthly":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor={`${rule.id}-start-date`}>Start Date</Label>
                <DatePicker
                  value={rule.startDate}
                  onChange={(date) =>
                    handleUpdateRule(rule.id, { startDate: date })
                  }
                  disabled={disabled || !rule.active || readOnly}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`${rule.id}-end-date`}>
                  End Date (Optional)
                </Label>
                <DatePicker
                  value={rule.endDate}
                  onChange={(date) =>
                    handleUpdateRule(rule.id, { endDate: date })
                  }
                  disabled={disabled || !rule.active || readOnly}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor={`${rule.id}-time`}>Time</Label>
              <TimePicker
                value={rule.time}
                onChange={(time) => handleUpdateRule(rule.id, { time })}
                disabled={disabled || !rule.active || readOnly}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`${rule.id}-day-of-month`}>Day of Month</Label>
              <Select
                value={rule.dayOfMonth?.toString() || ""}
                onValueChange={(value) =>
                  handleUpdateRule(rule.id, { dayOfMonth: parseInt(value) })
                }
                disabled={disabled || !rule.active || readOnly}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <SelectItem key={day} value={day.toString()}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {showHeader && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Schedule Builder</h3>
          <Button
            onClick={handleAddRule}
            disabled={disabled || readOnly || rules.length >= maxRules}
            size="sm"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Schedule
          </Button>
        </div>
      )}

      {rules.length === 0 && (
        <div className="flex flex-col items-center justify-center p-6 border border-dashed rounded-lg text-muted-foreground">
          <CalendarIcon className="h-10 w-10 mb-2" />

          <p>No schedules defined</p>
          <Button
            onClick={handleAddRule}
            disabled={disabled || readOnly}
            variant="outline"
            size="sm"
            className="mt-2"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Schedule
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {rules.map((rule) => (
          <Card
            key={rule.id}
            className={cn("relative", !rule.active && "opacity-60")}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={rule.active}
                    onCheckedChange={(checked) =>
                      handleUpdateRule(rule.id, { active: checked })
                    }
                    disabled={disabled || readOnly}
                  />

                  <Select
                    value={rule.type}
                    onValueChange={(value) =>
                      handleUpdateRule(rule.id, {
                        type: value as ScheduleRule["type"],
                        // Reset type-specific fields when changing type
                        daysOfWeek: value === "weekly" ? [1, 3, 5] : undefined,
                        dayOfMonth: value === "monthly" ? 1 : undefined,
                      })
                    }
                    disabled={disabled || !rule.active || readOnly}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="once">Once</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveRule(rule.id)}
                  disabled={disabled || readOnly}
                  className="h-8 w-8"
                >
                  <TrashIcon className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>{renderRuleForm(rule)}</CardContent>
          </Card>
        ))}
      </div>

      {!showHeader && rules.length > 0 && (
        <Button
          onClick={handleAddRule}
          disabled={disabled || readOnly || rules.length >= maxRules}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Schedule
        </Button>
      )}
    </div>
  );
}
