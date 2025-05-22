import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, CartesianGrid } from "recharts";

interface PerformanceMetricsPreviewProps {
  data?: {
    name: string;
    views: number;
    conversions: number;
  }[];
  isLoading?: boolean;
  onViewDetails?: () => void;
}

export default function PerformanceMetricsPreview({
  data = [],
  isLoading = false,
  onViewDetails,
}: PerformanceMetricsPreviewProps) {
  // If no data is provided, use sample data
  const chartData =
    data.length > 0
      ? data
      : [
          { name: "Mon", views: 420, conversions: 32 },
          { name: "Tue", views: 380, conversions: 28 },
          { name: "Wed", views: 560, conversions: 45 },
          { name: "Thu", views: 490, conversions: 36 },
          { name: "Fri", views: 610, conversions: 52 },
          { name: "Sat", views: 450, conversions: 38 },
          { name: "Sun", views: 320, conversions: 24 },
        ];

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Performance Metrics</CardTitle>
        {onViewDetails && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewDetails}
            className="gap-1"
          >
            View details
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[250px] w-full bg-muted animate-pulse rounded" />
        ) : (
          <ChartContainer config={{}} className="aspect-[none] h-[250px]">
            <BarChart data={chartData}>
              <ChartTooltip content={<ChartTooltipContent />} />

              <CartesianGrid
                vertical={false}
                stroke="#E5E7EB"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tickMargin={8}
              />

              <Bar
                dataKey="views"
                name="Views"
                fill="hsl(var(--chart-1))"
                radius={4}
                barSize={20}
              />

              <Bar
                dataKey="conversions"
                name="Conversions"
                fill="hsl(var(--chart-2))"
                radius={4}
                barSize={20}
              />
            </BarChart>
          </ChartContainer>
        )}

        <div className="flex items-center justify-center gap-8 mt-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[hsl(var(--chart-1))]" />

            <span className="text-sm text-muted-foreground">Views</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[hsl(var(--chart-2))]" />

            <span className="text-sm text-muted-foreground">Conversions</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
