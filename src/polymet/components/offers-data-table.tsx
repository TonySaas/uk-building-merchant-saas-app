"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  SlidersIcon,
  DownloadIcon,
  RefreshCwIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Sample data for demonstration
const data = [
  {
    id: "OF-1001",
    name: "Summer Sale - Power Tools",
    merchant: "Toolstation",
    status: "active",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    discount: 15,
    views: 1245,
    conversions: 89,
  },
  {
    id: "OF-1002",
    name: "Back to School - Stationery",
    merchant: "Office Depot",
    status: "scheduled",
    startDate: "2023-08-15",
    endDate: "2023-09-15",
    discount: 20,
    views: 0,
    conversions: 0,
  },
  {
    id: "OF-1003",
    name: "Clearance - Garden Furniture",
    merchant: "Garden World",
    status: "active",
    startDate: "2023-07-10",
    endDate: "2023-07-31",
    discount: 30,
    views: 876,
    conversions: 42,
  },
  {
    id: "OF-1004",
    name: "Flash Sale - Electronics",
    merchant: "Currys",
    status: "ended",
    startDate: "2023-05-01",
    endDate: "2023-05-07",
    discount: 25,
    views: 2145,
    conversions: 187,
  },
  {
    id: "OF-1005",
    name: "Weekend Special - Kitchenware",
    merchant: "John Lewis",
    status: "draft",
    startDate: "",
    endDate: "",
    discount: 10,
    views: 0,
    conversions: 0,
  },
  {
    id: "OF-1006",
    name: "Holiday Season - Decorations",
    merchant: "HomeBase",
    status: "scheduled",
    startDate: "2023-11-01",
    endDate: "2023-12-25",
    discount: 15,
    views: 0,
    conversions: 0,
  },
  {
    id: "OF-1007",
    name: "New Year - Fitness Equipment",
    merchant: "Sports Direct",
    status: "draft",
    startDate: "",
    endDate: "",
    discount: 20,
    views: 0,
    conversions: 0,
  },
];

export default function OffersDataTable({ isLoading = false }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Define columns
  const columns: ColumnDef<(typeof data)[0]>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),

      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),

      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Offer Name
            {column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : null}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "merchant",
      header: "Merchant",
      cell: ({ row }) => <div>{row.getValue("merchant")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge
            variant={
              status === "active"
                ? "default"
                : status === "scheduled"
                  ? "outline"
                  : status === "ended"
                    ? "secondary"
                    : "destructive"
            }
            className={cn(
              "capitalize",
              status === "draft" &&
                "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400"
            )}
          >
            {status}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }) => {
        const startDate = row.getValue("startDate") as string;
        return startDate ? new Date(startDate).toLocaleDateString() : "-";
      },
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({ row }) => {
        const endDate = row.getValue("endDate") as string;
        return endDate ? new Date(endDate).toLocaleDateString() : "-";
      },
    },
    {
      accessorKey: "discount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Discount
            {column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : null}
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("discount")}%</div>,
    },
    {
      accessorKey: "views",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Views
            {column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : null}
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("views").toLocaleString()}</div>,
    },
    {
      accessorKey: "conversions",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Conversions
            {column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : null}
          </Button>
        );
      },
      cell: ({ row }) => (
        <div>{row.getValue("conversions").toLocaleString()}</div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
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
                onClick={() => console.log("View", row.original)}
              >
                <EyeIcon className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log("Edit", row.original)}
              >
                <EditIcon className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => console.log("Delete", row.original)}
                className="text-red-600"
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Empty state component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="rounded-full bg-muted p-3 mb-4">
        <ShoppingBagIcon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">No offers found</h3>
      <p className="text-sm text-muted-foreground text-center max-w-sm mt-2">
        There are no offers matching your criteria. Try changing your filters or
        create a new offer.
      </p>
      <Button className="mt-4">Create New Offer</Button>
    </div>
  );

  // Loading skeleton
  const TableSkeleton = () => (
    <>
      <div className="flex items-center justify-between py-4">
        <Skeleton className="h-8 w-[250px]" />

        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-[60px]" />

          <Skeleton className="h-8 w-[80px]" />

          <Skeleton className="h-8 w-[80px]" />
        </div>
      </div>
      <div className="rounded-md border">
        <div className="h-12 border-b px-4 flex items-center">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-4 w-[100px] mx-4" />
            ))}
        </div>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-16 border-b px-4 flex items-center">
              {Array(6)
                .fill(0)
                .map((_, j) => (
                  <Skeleton key={j} className="h-4 w-[100px] mx-4" />
                ))}
            </div>
          ))}
      </div>
      <div className="flex items-center justify-between py-4">
        <Skeleton className="h-8 w-[100px]" />

        <Skeleton className="h-8 w-[200px]" />
      </div>
    </>
  );

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex items-center justify-between p-4">
          <Input
            placeholder="Filter offers..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log("Refresh")}
            >
              <RefreshCwIcon className="h-4 w-4 mr-1" />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log("Export")}
            >
              <DownloadIcon className="h-4 w-4 mr-1" />
              Export
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <SlidersIcon className="h-4 w-4 mr-1" />
                  View
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <EmptyState />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 border-t">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

// Icon for empty state
function ShoppingBagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />

      <path d="M3 6h18" />

      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
