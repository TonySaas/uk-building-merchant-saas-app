"use client";

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  PlusIcon,
  MoreHorizontalIcon,
  CalendarIcon,
  TagIcon,
  PercentIcon,
  EyeIcon,
  ShoppingCartIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample data for demonstration
const initialColumns = [
  {
    id: "draft",
    title: "Draft",
    items: [
      {
        id: "OF-1005",
        name: "Weekend Special - Kitchenware",
        merchant: "John Lewis",
        discount: 10,
        image: "https://picsum.photos/seed/kitchen/300/200",
        description:
          "Special offers on cookware, utensils, and small appliances.",
      },
      {
        id: "OF-1007",
        name: "New Year - Fitness Equipment",
        merchant: "Sports Direct",
        discount: 20,
        image: "https://picsum.photos/seed/fitness/300/200",
        description: "Start the new year right with discounts on fitness gear.",
      },
    ],
  },
  {
    id: "scheduled",
    title: "Scheduled",
    items: [
      {
        id: "OF-1002",
        name: "Back to School - Stationery",
        merchant: "Office Depot",
        startDate: "2023-08-15",
        endDate: "2023-09-15",
        discount: 20,
        image: "https://picsum.photos/seed/stationery/300/200",
        description:
          "Get ready for the new school year with discounts on notebooks, pens, and more.",
      },
      {
        id: "OF-1006",
        name: "Holiday Season - Decorations",
        merchant: "HomeBase",
        startDate: "2023-11-01",
        endDate: "2023-12-25",
        discount: 15,
        image: "https://picsum.photos/seed/holiday/300/200",
        description:
          "Get ready for the holidays with discounts on decorations and lights.",
      },
    ],
  },
  {
    id: "active",
    title: "Active",
    items: [
      {
        id: "OF-1001",
        name: "Summer Sale - Power Tools",
        merchant: "Toolstation",
        startDate: "2023-06-01",
        endDate: "2023-08-31",
        discount: 15,
        image: "https://picsum.photos/seed/powertools/300/200",
        description:
          "Special discounts on all power tools including drills, saws, and sanders.",
        views: 1245,
        conversions: 89,
      },
      {
        id: "OF-1003",
        name: "Clearance - Garden Furniture",
        merchant: "Garden World",
        startDate: "2023-07-10",
        endDate: "2023-07-31",
        discount: 30,
        image: "https://picsum.photos/seed/garden/300/200",
        description:
          "End of season clearance on all garden furniture and accessories.",
        views: 876,
        conversions: 42,
      },
    ],
  },
  {
    id: "ended",
    title: "Ended",
    items: [
      {
        id: "OF-1004",
        name: "Flash Sale - Electronics",
        merchant: "Currys",
        startDate: "2023-05-01",
        endDate: "2023-05-07",
        discount: 25,
        image: "https://picsum.photos/seed/electronics/300/200",
        description: "Limited time offers on TVs, laptops, and smartphones.",
        views: 2145,
        conversions: 187,
      },
    ],
  },
];

export default function KanbanOfferBoard({ isLoading = false }) {
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // If dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Find source and destination column indices
    const sourceColIndex = columns.findIndex(
      (col) => col.id === source.droppableId
    );
    const destColIndex = columns.findIndex(
      (col) => col.id === destination.droppableId
    );

    // Create a new columns array to avoid direct state mutation
    const newColumns = [...columns];

    // Get the item being dragged
    const [movedItem] = newColumns[sourceColIndex].items.splice(
      source.index,
      1
    );

    // Insert the item at the destination
    newColumns[destColIndex].items.splice(destination.index, 0, movedItem);

    // Update state
    setColumns(newColumns);
  };

  // Empty state component for a column
  const EmptyColumnState = ({ columnId }) => (
    <div className="flex flex-col items-center justify-center p-4 h-24 border-2 border-dashed rounded-md text-center">
      <p className="text-sm text-muted-foreground">No offers</p>
      <Button variant="ghost" size="sm" className="mt-2">
        <PlusIcon className="h-4 w-4 mr-1" />
        Add Offer
      </Button>
    </div>
  );

  // Loading skeleton for the kanban board
  const KanbanSkeleton = () => (
    <div className="flex gap-4 overflow-x-auto pb-6">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex-shrink-0 w-80">
            <Card>
              <CardHeader className="px-4 py-3 flex flex-row items-center justify-between space-y-0">
                <Skeleton className="h-5 w-24" />

                <Skeleton className="h-6 w-6 rounded-full" />
              </CardHeader>
              <CardContent className="px-4 space-y-3">
                {Array(i + 1)
                  .fill(0)
                  .map((_, j) => (
                    <Card key={j} className="mb-3">
                      <CardContent className="p-3 space-y-2">
                        <Skeleton className="h-4 w-full" />

                        <Skeleton className="h-4 w-3/4" />

                        <div className="flex justify-between items-center pt-2">
                          <Skeleton className="h-6 w-16 rounded-full" />

                          <Skeleton className="h-6 w-6 rounded-full" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </CardContent>
            </Card>
          </div>
        ))}
    </div>
  );

  if (isLoading) {
    return <KanbanSkeleton />;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-6">
        {columns.map((column) => (
          <div key={column.id} className="flex-shrink-0 w-80">
            <Card className="h-full">
              <CardHeader className="px-4 py-3 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center">
                  <h3 className="text-sm font-medium">{column.title}</h3>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {column.items.length}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <PlusIcon className="h-4 w-4" />

                  <span className="sr-only">Add offer</span>
                </Button>
              </CardHeader>
              <CardContent className="px-2 pt-0 pb-2">
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`min-h-[200px] p-1 transition-colors ${
                        snapshot.isDraggingOver ? "bg-muted/50" : ""
                      }`}
                    >
                      {column.items.length === 0 ? (
                        <EmptyColumnState columnId={column.id} />
                      ) : (
                        column.items.map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`mb-2 transition-shadow ${
                                  snapshot.isDragging ? "shadow-lg" : ""
                                }`}
                              >
                                <Card className="bg-card">
                                  <CardContent className="p-3 space-y-2">
                                    <div className="flex justify-between items-start">
                                      <h4 className="text-sm font-medium line-clamp-1">
                                        {item.name}
                                      </h4>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 w-6 p-0"
                                          >
                                            <MoreHorizontalIcon className="h-3 w-3" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem>
                                            View Details
                                          </DropdownMenuItem>
                                          <DropdownMenuItem>
                                            Edit
                                          </DropdownMenuItem>
                                          <DropdownMenuItem>
                                            Move
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                      {item.merchant}
                                    </p>
                                    {item.startDate && (
                                      <div className="flex items-center text-xs text-muted-foreground">
                                        <CalendarIcon className="h-3 w-3 mr-1" />
                                        {new Date(
                                          item.startDate
                                        ).toLocaleDateString()}{" "}
                                        -{" "}
                                        {new Date(
                                          item.endDate
                                        ).toLocaleDateString()}
                                      </div>
                                    )}
                                    <div className="flex justify-between items-center pt-1">
                                      {item.discount > 0 && (
                                        <Badge
                                          variant="outline"
                                          className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-900"
                                        >
                                          <PercentIcon className="h-3 w-3 mr-1" />
                                          {item.discount}% OFF
                                        </Badge>
                                      )}
                                      {item.views !== undefined && (
                                        <div className="flex items-center text-xs">
                                          <EyeIcon className="h-3 w-3 mr-1" />

                                          {item.views}
                                        </div>
                                      )}
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </CardContent>
              <CardFooter className="p-2 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-center text-xs h-8"
                >
                  <PlusIcon className="h-3 w-3 mr-1" />
                  Add Offer
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
        <div className="flex-shrink-0 w-80">
          <Button variant="outline" className="h-12 w-full border-dashed">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Column
          </Button>
        </div>
      </div>
    </DragDropContext>
  );
}
