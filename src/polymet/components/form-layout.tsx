import React from "react";
import { cn } from "@/lib/utils";

export interface FormLayoutProps {
  children: React.ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  gap?: "none" | "sm" | "md" | "lg";
  fullWidth?: boolean;
  responsive?: boolean;
}

export function FormLayout({
  children,
  className,
  columns = 1,
  gap = "md",
  fullWidth = false,
  responsive = true,
}: FormLayoutProps) {
  const gapClasses = {
    none: "gap-0",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  };

  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  const responsiveClasses = responsive
    ? {
        1: "",
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      }
    : columnClasses;

  return (
    <div
      className={cn(
        "grid",
        responsive ? responsiveClasses[columns] : columnClasses[columns],
        gapClasses[gap],
        fullWidth ? "w-full" : "",
        className
      )}
    >
      {children}
    </div>
  );
}

export interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
  span?: 1 | 2 | 3 | 4 | "full";
  alignItems?: "start" | "center" | "end" | "stretch";
}

export function FormGroup({
  children,
  className,
  span = 1,
  alignItems = "start",
}: FormGroupProps) {
  const spanClasses = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    full: "col-span-full",
  };

  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  return (
    <div
      className={cn(
        "flex flex-col",
        spanClasses[span],
        alignClasses[alignItems],
        className
      )}
    >
      {children}
    </div>
  );
}

export interface FormRowProps {
  children: React.ReactNode;
  className?: string;
  alignItems?: "start" | "center" | "end" | "baseline" | "stretch";
  justifyContent?: "start" | "center" | "end" | "between" | "around" | "evenly";
  gap?: "none" | "sm" | "md" | "lg";
}

export function FormRow({
  children,
  className,
  alignItems = "center",
  justifyContent = "start",
  gap = "md",
}: FormRowProps) {
  const alignClasses = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    baseline: "items-baseline",
    stretch: "items-stretch",
  };

  const justifyClasses = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  };

  const gapClasses = {
    none: "gap-0",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  };

  return (
    <div
      className={cn(
        "flex flex-wrap",
        alignClasses[alignItems],
        justifyClasses[justifyContent],
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
}

export interface FormDividerProps {
  className?: string;
  label?: string;
}

export function FormDivider({ className, label }: FormDividerProps) {
  if (label) {
    return (
      <div className={cn("col-span-full flex items-center my-4", className)}>
        <div className="h-px flex-1 bg-border"></div>
        <span className="px-3 text-sm text-muted-foreground">{label}</span>
        <div className="h-px flex-1 bg-border"></div>
      </div>
    );
  }

  return (
    <div className={cn("col-span-full h-px bg-border my-4", className)}></div>
  );
}

export interface FormFieldProps {
  children: React.ReactNode;
  className?: string;
  grow?: boolean;
  shrink?: boolean;
  basis?: string;
}

export function FormField({
  children,
  className,
  grow = false,
  shrink = false,
  basis,
}: FormFieldProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        grow && "flex-grow",
        shrink && "flex-shrink",
        className
      )}
      style={basis ? { flexBasis: basis } : undefined}
    >
      {children}
    </div>
  );
}
