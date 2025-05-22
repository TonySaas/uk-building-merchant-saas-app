import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUpIcon, TrendingDownIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface DashboardStatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  icon?: ReactNode;
  description?: string;
  className?: string;
  viewAllLink?: string;
  onViewAll?: () => void;
  color?:
    | "default"
    | "primary"
    | "blue"
    | "green"
    | "red"
    | "orange"
    | "purple";
}

export default function DashboardStatsCard({
  title,
  value,
  change,
  icon,
  description,
  className,
  viewAllLink,
  onViewAll,
  color = "default",
}: DashboardStatsCardProps) {
  // Color-based styles
  const colorStyles = {
    default: "bg-card border-border",
    primary: "bg-primary/10 border-primary/20",
    blue: "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-900",
    green:
      "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900",
    red: "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900",
    orange:
      "bg-orange-50 border-orange-200 dark:bg-orange-950/30 dark:border-orange-900",
    purple:
      "bg-purple-50 border-purple-200 dark:bg-purple-950/30 dark:border-purple-900",
  };

  const iconColorStyles = {
    default: "text-muted-foreground",
    primary: "text-primary",
    blue: "text-blue-500 dark:text-blue-400",
    green: "text-green-500 dark:text-green-400",
    red: "text-red-500 dark:text-red-400",
    orange: "text-orange-500 dark:text-orange-400",
    purple: "text-purple-500 dark:text-purple-400",
  };

  return (
    <Card
      className={cn("border overflow-hidden", colorStyles[color], className)}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <h3 className="text-2xl font-bold tracking-tight">{value}</h3>

            {change && (
              <div className="flex items-center mt-1">
                {change.isPositive ? (
                  <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span
                  className={cn(
                    "text-xs font-medium",
                    change.isPositive ? "text-green-500" : "text-red-500"
                  )}
                >
                  {change.isPositive ? "+" : ""}
                  {change.value}%
                </span>
                {change.label && (
                  <span className="text-xs text-muted-foreground ml-1">
                    {change.label}
                  </span>
                )}
              </div>
            )}

            {description && (
              <p className="text-sm text-muted-foreground mt-2">
                {description}
              </p>
            )}
          </div>

          {icon && (
            <div className={cn("p-2 rounded-md", iconColorStyles[color])}>
              {icon}
            </div>
          )}
        </div>

        {(viewAllLink || onViewAll) && (
          <div className="mt-4 pt-4 border-t border-border">
            <Button
              variant="link"
              className="p-0 h-auto text-sm"
              onClick={onViewAll}
            >
              View all
              <ArrowRightIcon className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
