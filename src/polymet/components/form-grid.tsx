import React from "react";
import { cn } from "@/lib/utils";

export interface FormGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  rowGap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  colGap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  alignItems?: "start" | "center" | "end" | "stretch" | "baseline";
}

export function FormGrid({
  children,
  className,
  cols = { sm: 1, md: 2, lg: 3 },
  gap,
  rowGap,
  colGap,
  alignItems = "stretch",
}: FormGridProps) {
  const gapClasses = {
    none: "gap-0",
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
  };

  const rowGapClasses = {
    none: "row-gap-0",
    xs: "row-gap-1",
    sm: "row-gap-2",
    md: "row-gap-4",
    lg: "row-gap-6",
    xl: "row-gap-8",
  };

  const colGapClasses = {
    none: "col-gap-0",
    xs: "col-gap-1",
    sm: "col-gap-2",
    md: "col-gap-4",
    lg: "col-gap-6",
    xl: "col-gap-8",
  };

  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
    baseline: "items-baseline",
  };

  // Handle responsive columns
  let colClasses = "";
  if (typeof cols === "number") {
    colClasses = `grid-cols-${cols}`;
  } else {
    const { sm, md, lg, xl } = cols;
    colClasses = cn(
      sm && `grid-cols-${sm}`,
      md && `md:grid-cols-${md}`,
      lg && `lg:grid-cols-${lg}`,
      xl && `xl:grid-cols-${xl}`
    );
  }

  return (
    <div
      className={cn(
        "grid",
        colClasses,
        gap && gapClasses[gap],
        rowGap && rowGapClasses[rowGap],
        colGap && colGapClasses[colGap],
        alignItems && alignClasses[alignItems],
        className
      )}
    >
      {children}
    </div>
  );
}

export interface FormGridItemProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  rowSpan?: number;
  alignSelf?: "start" | "center" | "end" | "stretch" | "baseline";
}

export function FormGridItem({
  children,
  className,
  colSpan,
  rowSpan,
  alignSelf,
}: FormGridItemProps) {
  // Handle responsive column spans
  let colSpanClasses = "";
  if (typeof colSpan === "number") {
    colSpanClasses = `col-span-${colSpan}`;
  } else if (colSpan) {
    const { sm, md, lg, xl } = colSpan;
    colSpanClasses = cn(
      sm && `col-span-${sm}`,
      md && `md:col-span-${md}`,
      lg && `lg:col-span-${lg}`,
      xl && `xl:col-span-${xl}`
    );
  }

  const rowSpanClass = rowSpan ? `row-span-${rowSpan}` : "";

  const alignSelfClasses = {
    start: "self-start",
    center: "self-center",
    end: "self-end",
    stretch: "self-stretch",
    baseline: "self-baseline",
  };

  return (
    <div
      className={cn(
        colSpanClasses,
        rowSpanClass,
        alignSelf && alignSelfClasses[alignSelf],
        className
      )}
    >
      {children}
    </div>
  );
}

export interface FormGridSectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  colSpan?: number | { sm?: number; md?: number; lg?: number; xl?: number };
}

export function FormGridSection({
  children,
  className,
  title,
  description,
  colSpan = { sm: 1, md: 2, lg: 3 },
}: FormGridSectionProps) {
  // Handle responsive column spans
  let colSpanClasses = "";
  if (typeof colSpan === "number") {
    colSpanClasses = `col-span-${colSpan}`;
  } else {
    const { sm, md, lg, xl } = colSpan;
    colSpanClasses = cn(
      sm && `col-span-${sm}`,
      md && `md:col-span-${md}`,
      lg && `lg:col-span-${lg}`,
      xl && `xl:col-span-${xl}`
    );
  }

  return (
    <div className={cn("space-y-3", colSpanClasses, className)}>
      {(title || description) && (
        <div className="space-y-1">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
