import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Define the chart configuration type for consistent styling
export interface ChartConfig {
  [key: string]: {
    label?: string;
    color?: string;
    formatter?: (value: any) => string;
    hidden?: boolean;
  };
}

// Helper function to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Default chart colors that work well with organization theming
export const chartColors = {
  primary: "hsl(var(--chart-1))",
  secondary: "hsl(var(--chart-2))",
  tertiary: "hsl(var(--chart-3))",
  quaternary: "hsl(var(--chart-4))",
  quinary: "hsl(var(--chart-5))",
};

// Format numbers with commas for thousands
export function formatNumber(value: number): string {
  return new Intl.NumberFormat().format(value);
}

// Format currency values
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// Format percentage values
export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

// Format date values
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Format short date values (without year)
export function formatShortDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

// Calculate percentage change between two values
export function calculatePercentageChange(
  current: number,
  previous: number
): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

// Generate a color scale for heatmaps based on value
export function getHeatmapColor(
  value: number,
  min: number,
  max: number
): string {
  // Normalize value between 0 and 1
  const normalized = Math.max(0, Math.min(1, (value - min) / (max - min)));

  // Generate color from blue (cold) to red (hot)
  const hue = ((1 - normalized) * 240).toString(10);
  return `hsl(${hue}, 70%, 50%)`;
}

// Generate chart data with random values (for demo purposes)
export function generateRandomData(
  length: number,
  categories: string[],
  dateStart?: Date,
  valueRange: [number, number] = [100, 1000]
): any[] {
  const data = [];
  const startDate =
    dateStart || new Date(new Date().setDate(new Date().getDate() - length));

  for (let i = 0; i < length; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const item: any = {
      date: date.toISOString().split("T")[0],
    };

    categories.forEach((category) => {
      const min = valueRange[0];
      const max = valueRange[1];
      item[category] = Math.floor(Math.random() * (max - min + 1)) + min;
    });

    data.push(item);
  }

  return data;
}

// Generate random geographic data for UK regions
export function generateRandomGeoData() {
  const regions = [
    "London",
    "South East",
    "East of England",
    "South West",
    "West Midlands",
    "East Midlands",
    "Yorkshire and the Humber",
    "North West",
    "North East",
    "Scotland",
    "Wales",
    "Northern Ireland",
  ];

  return regions.map((region) => ({
    region,
    merchants: Math.floor(Math.random() * 200) + 50,
    offers: Math.floor(Math.random() * 1000) + 100,
    revenue: Math.floor(Math.random() * 100000) + 10000,
    engagement: Math.random() * 0.3 + 0.1,
  }));
}
