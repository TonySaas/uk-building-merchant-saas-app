import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EyeIcon,
  EditIcon,
  MoreHorizontalIcon,
  ArrowRightIcon,
  ArrowUpDownIcon,
  TrashIcon,
  BarChartIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Offer {
  id: string;
  name: string;
  merchant: string;
  status: "active" | "scheduled" | "ended" | "draft";
  startDate: string;
  endDate?: string;
  views: number;
  conversions: number;
  discount: number;
}

interface RecentOffersTableProps {
  offers?: Offer[];
  isLoading?: boolean;
  onViewAll?: () => void;
  onViewOffer?: (id: string) => void;
  onEditOffer?: (id: string) => void;
  onDeleteOffer?: (id: string) => void;
  onViewAnalytics?: (id: string) => void;
}

export default function RecentOffersTable({
  offers = [],
  isLoading = false,
  onViewAll,
  onViewOffer,
  onEditOffer,
  onDeleteOffer,
  onViewAnalytics,
}: RecentOffersTableProps) {
  const [sortField, setSortField] = useState<keyof Offer | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: keyof Offer) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedOffers = [...offers].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "scheduled":
        return "outline";
      case "ended":
        return "secondary";
      case "draft":
        return cn(
          "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400"
        );
      default:
        return "default";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Recent Offers</CardTitle>
          <CardDescription>
            Overview of your latest promotional offers
          </CardDescription>
        </div>
        {onViewAll && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewAll}
            className="gap-1"
          >
            View all
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-8 w-full bg-muted animate-pulse rounded" />

            <div className="h-16 w-full bg-muted animate-pulse rounded" />

            <div className="h-16 w-full bg-muted animate-pulse rounded" />

            <div className="h-16 w-full bg-muted animate-pulse rounded" />
          </div>
        ) : offers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No offers found</p>
            <Button variant="outline" className="mt-4">
              Create your first offer
            </Button>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="w-[250px] cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center gap-1">
                      Offer Name
                      <ArrowUpDownIcon className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Merchant</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("startDate")}
                  >
                    <div className="flex items-center gap-1">
                      Date
                      <ArrowUpDownIcon className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="text-right cursor-pointer"
                    onClick={() => handleSort("views")}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Views
                      <ArrowUpDownIcon className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="text-right cursor-pointer"
                    onClick={() => handleSort("conversions")}
                  >
                    <div className="flex items-center justify-end gap-1">
                      Conv.
                      <ArrowUpDownIcon className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedOffers.slice(0, 5).map((offer) => (
                  <TableRow key={offer.id}>
                    <TableCell className="font-medium">{offer.name}</TableCell>
                    <TableCell>{offer.merchant}</TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusBadgeVariant(offer.status) as any}
                        className="capitalize"
                      >
                        {offer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {formatDate(offer.startDate)}
                      {offer.endDate && ` - ${formatDate(offer.endDate)}`}
                    </TableCell>
                    <TableCell className="text-right">
                      {offer.views.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {offer.conversions.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => onViewOffer?.(offer.id)}
                          >
                            <EyeIcon className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onEditOffer?.(offer.id)}
                          >
                            <EditIcon className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onViewAnalytics?.(offer.id)}
                          >
                            <BarChartIcon className="mr-2 h-4 w-4" />
                            Analytics
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            onClick={() => onDeleteOffer?.(offer.id)}
                            className="text-red-600"
                          >
                            <TrashIcon className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
