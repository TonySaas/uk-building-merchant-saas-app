import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface DashboardActionCardProps {
  title: string;
  description?: string;
  icon: ReactNode;
  primaryAction: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  color?:
    | "default"
    | "primary"
    | "blue"
    | "green"
    | "red"
    | "orange"
    | "purple";
}

export default function DashboardActionCard({
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
  className,
  color = "default",
}: DashboardActionCardProps) {
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
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary/20 text-primary",
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400",
    green:
      "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400",
    red: "bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400",
    orange:
      "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400",
    purple:
      "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400",
  };

  return (
    <Card
      className={cn("border overflow-hidden", colorStyles[color], className)}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={cn("p-3 rounded-lg", iconColorStyles[color])}>
            {icon}
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">
                {description}
              </p>
            )}

            <div className="flex flex-wrap gap-3 mt-4">
              <Button onClick={primaryAction.onClick}>
                {primaryAction.label}
              </Button>

              {secondaryAction && (
                <Button variant="outline" onClick={secondaryAction.onClick}>
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
