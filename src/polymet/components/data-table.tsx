"use client";

import * as React from "react";
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
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  FilterIcon,
  MoreHorizontalIcon,
  RefreshCwIcon,
  SlidersIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  searchColumn?: string;
  pageSize?: number;
  loading?: boolean;
  onRowClick?: (row: TData) => void;
  onRefresh?: () => void;
  onExport?: () => void;
  onFilterChange?: (filters: ColumnFiltersState) => void;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  title,
  description,
  searchPlaceholder = "Search...",
  searchColumn = "name",
  pageSize = 10,
  loading = false,
  onRowClick,
  onRefresh,
  onExport,
  onFilterChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
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

  // Set default page size
  React.useEffect(() => {
    table.setPageSize(pageSize);
  }, [table, pageSize]);

  // Call onFilterChange when filters change
  React.useEffect(() => {
    onFilterChange?.(columnFilters);
  }, [columnFilters, onFilterChange]);

  return (
    <Card className="w-full">
      {(title || description) && (
        <CardHeader className="pb-3">
          {title && <CardTitle>{title}</CardTitle>}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </CardHeader>
      )}
      <CardContent className="p-0">
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <div className="flex items-center flex-1 space-x-2">
            <Input
              placeholder={searchPlaceholder}
              value={
                (table.getColumn(searchColumn)?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn(searchColumn)
                  ?.setFilterValue(event.target.value)
              }
              className="h-9 w-[150px] lg:w-[250px]"
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1">
                  <FilterIcon className="h-3.5 w-3.5" />

                  <span className="hidden sm:inline">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() =>
                    table.getColumn("status")?.setFilterValue("active")
                  }
                >
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    table.getColumn("status")?.setFilterValue("inactive")
                  }
                >
                  Inactive
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    table.getColumn("status")?.setFilterValue("pending")
                  }
                >
                  Pending
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => table.resetColumnFilters()}>
                  Clear filters
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1">
                  <SlidersIcon className="h-3.5 w-3.5" />

                  <span className="hidden sm:inline">View</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
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
            {onRefresh && (
              <Button
                variant="outline"
                size="sm"
                className="h-9"
                onClick={onRefresh}
                disabled={loading}
              >
                <RefreshCwIcon
                  className={cn("h-3.5 w-3.5", loading && "animate-spin")}
                />
              </Button>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {onExport && (
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-1"
                onClick={onExport}
              >
                <DownloadIcon className="h-3.5 w-3.5" />

                <span className="hidden sm:inline">Export</span>
              </Button>
            )}
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected
              </p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className={cn("overflow-auto", loading && "opacity-70")}>
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
                      className={onRowClick ? "cursor-pointer" : ""}
                      onClick={() => onRowClick && onRowClick(row.original)}
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
                      {loading ? "Loading..." : "No results."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-4 border-t">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing{" "}
            <strong>
              {table.getFilteredRowModel().rows.length > 0
                ? table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                  1
                : 0}
              -
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}
            </strong>{" "}
            of <strong>{table.getFilteredRowModel().rows.length}</strong>{" "}
            results
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronLeftIcon className="h-4 w-4" />

                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronRightIcon className="h-4 w-4" />

                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper components for column definitions
export function createSelectColumn<TData>(): ColumnDef<TData, any> {
  return {
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
        onClick={(e) => e.stopPropagation()}
      />
    ),

    enableSorting: false,
    enableHiding: false,
  };
}

export function createActionsColumn<TData>(
  actions: (row: TData) => React.ReactNode
): ColumnDef<TData, any> {
  return {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {actions(row.original)}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  };
}

export function createSortableColumn<TData, TValue>(
  header: string,
  accessorKey: string,
  cell?: (info: {
    getValue: () => TValue;
    row: { original: TData };
  }) => React.ReactNode
): ColumnDef<TData, TValue> {
  return {
    accessorKey,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4 h-8 data-[state=open]:bg-accent"
        >
          {header}
          {column.getIsSorted() === "desc" ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      );
    },
    cell: cell
      ? ({ getValue, row }) => cell({ getValue, row })
      : ({ getValue }) => <div>{getValue() as React.ReactNode}</div>,
  };
}

export function createStatusColumn<TData>(
  accessorKey: string,
  statuses: Record<
    string,
    {
      label: string;
      variant: "default" | "outline" | "secondary" | "destructive";
    }
  >
): ColumnDef<TData, string> {
  return {
    accessorKey,
    header: "Status",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      const status = statuses[value];
      if (!status) return value;

      return (
        <Badge variant={status.variant} className="capitalize">
          {status.label}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  };
}
