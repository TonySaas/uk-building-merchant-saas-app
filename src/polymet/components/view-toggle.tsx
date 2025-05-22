import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GridIcon, ListIcon, Columns2Icon, LayoutIcon } from "lucide-react";
import { motion } from "framer-motion";

export type ViewType = "grid" | "list" | "compact" | "detailed";

export interface ViewToggleProps {
  view: ViewType;
  onChange: (view: ViewType) => void;
  className?: string;
  availableViews?: ViewType[];
}

export function ViewToggle({
  view,
  onChange,
  className,
  availableViews = ["grid", "list", "compact", "detailed"],
}: ViewToggleProps) {
  const viewOptions = React.useMemo(() => {
    const options = [
      {
        value: "grid",
        icon: <GridIcon className="h-4 w-4" />,

        label: "Grid",
      },
      {
        value: "list",
        icon: <ListIcon className="h-4 w-4" />,

        label: "List",
      },
      {
        value: "compact",
        icon: <Columns2Icon className="h-4 w-4" />,

        label: "Compact",
      },
      {
        value: "detailed",
        icon: <LayoutIcon className="h-4 w-4" />,

        label: "Detailed",
      },
    ] as const;

    return options.filter((option) =>
      availableViews.includes(option.value as ViewType)
    );
  }, [availableViews]);

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border bg-background p-1 text-muted-foreground",
        className
      )}
    >
      {viewOptions.map((option) => {
        const isActive = view === option.value;
        return (
          <Button
            key={option.value}
            variant="ghost"
            size="sm"
            className={cn(
              "relative px-3 text-sm font-normal",
              isActive ? "text-foreground" : "hover:text-foreground"
            )}
            onClick={() => onChange(option.value as ViewType)}
          >
            {isActive && (
              <motion.div
                layoutId="viewToggleIndicator"
                className="absolute inset-0 z-10 bg-muted rounded-sm"
                transition={{ type: "spring", duration: 0.5 }}
                initial={false}
              />
            )}
            <span className="relative z-20 flex items-center gap-2">
              {option.icon}
              <span className="hidden sm:inline-block">{option.label}</span>
            </span>
          </Button>
        );
      })}
    </div>
  );
}

export interface ContentViewProps<T> {
  data: T[];
  view: ViewType;
  renderGridItem: (item: T, index: number) => React.ReactNode;
  renderListItem: (item: T, index: number) => React.ReactNode;
  renderCompactItem?: (item: T, index: number) => React.ReactNode;
  renderDetailedItem?: (item: T, index: number) => React.ReactNode;
  gridClassName?: string;
  listClassName?: string;
  compactClassName?: string;
  detailedClassName?: string;
  emptyState?: React.ReactNode;
  loading?: boolean;
  loadingItemCount?: number;
  renderLoading?: () => React.ReactNode;
}

export function ContentView<T>({
  data,
  view,
  renderGridItem,
  renderListItem,
  renderCompactItem,
  renderDetailedItem,
  gridClassName = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
  listClassName = "flex flex-col gap-2",
  compactClassName = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2",
  detailedClassName = "flex flex-col gap-4",
  emptyState,
  loading = false,
  loadingItemCount = 6,
  renderLoading,
}: ContentViewProps<T>) {
  if (loading && renderLoading) {
    return renderLoading();
  }

  if (data.length === 0 && !loading) {
    return emptyState || <div className="text-center py-8">No items found</div>;
  }

  const items = loading ? Array(loadingItemCount).fill({} as T) : data;

  switch (view) {
    case "grid":
      return (
        <div className={gridClassName}>
          {items.map((item, index) => renderGridItem(item, index))}
        </div>
      );

    case "list":
      return (
        <div className={listClassName}>
          {items.map((item, index) => renderListItem(item, index))}
        </div>
      );

    case "compact":
      return (
        <div className={compactClassName}>
          {items.map((item, index) =>
            renderCompactItem
              ? renderCompactItem(item, index)
              : renderGridItem(item, index)
          )}
        </div>
      );

    case "detailed":
      return (
        <div className={detailedClassName}>
          {items.map((item, index) =>
            renderDetailedItem
              ? renderDetailedItem(item, index)
              : renderListItem(item, index)
          )}
        </div>
      );

    default:
      return (
        <div className={gridClassName}>
          {items.map((item, index) => renderGridItem(item, index))}
        </div>
      );
  }
}
