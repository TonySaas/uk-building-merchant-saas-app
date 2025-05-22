"use client";

import * as React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  PlusIcon,
  MoreHorizontalIcon,
  XIcon,
  EditIcon,
  TrashIcon,
  ClockIcon,
  CalendarIcon,
  TagIcon,
  UserIcon,
} from "lucide-react";

export interface KanbanItem {
  id: string;
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  dueDate?: string;
  assignee?: {
    id: string;
    name: string;
    avatar?: string;
  };
  tags?: string[];
  attachments?: number;
  comments?: number;
}

export interface KanbanColumn {
  id: string;
  title: string;
  items: KanbanItem[];
  color?: string;
  limit?: number;
}

export interface KanbanBoardProps {
  columns: KanbanColumn[];
  onColumnUpdate?: (columns: KanbanColumn[]) => void;
  onAddItem?: (columnId: string) => void;
  onEditItem?: (columnId: string, item: KanbanItem) => void;
  onDeleteItem?: (columnId: string, itemId: string) => void;
  onAddColumn?: () => void;
  onEditColumn?: (columnId: string, title: string) => void;
  onDeleteColumn?: (columnId: string) => void;
  loading?: boolean;
  className?: string;
}

export function KanbanBoard({
  columns: initialColumns,
  onColumnUpdate,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onAddColumn,
  onEditColumn,
  onDeleteColumn,
  loading = false,
  className,
}: KanbanBoardProps) {
  const [columns, setColumns] = React.useState<KanbanColumn[]>(initialColumns);
  const [editingColumn, setEditingColumn] = React.useState<string | null>(null);
  const [editingColumnTitle, setEditingColumnTitle] =
    React.useState<string>("");

  React.useEffect(() => {
    setColumns(initialColumns);
  }, [initialColumns]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // If dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Clone the columns to avoid direct state mutation
    const newColumns = [...columns];

    // Find source and destination column indices
    const sourceColIndex = newColumns.findIndex(
      (col) => col.id === source.droppableId
    );
    const destColIndex = newColumns.findIndex(
      (col) => col.id === destination.droppableId
    );

    // Check if destination column has a limit and would exceed it
    if (
      source.droppableId !== destination.droppableId &&
      newColumns[destColIndex].limit &&
      newColumns[destColIndex].items.length >= newColumns[destColIndex].limit
    ) {
      // Don't allow the drop if it would exceed the limit
      return;
    }

    // Get the item being dragged
    const [movedItem] = newColumns[sourceColIndex].items.splice(
      source.index,
      1
    );

    // Insert the item at the destination
    newColumns[destColIndex].items.splice(destination.index, 0, movedItem);

    // Update state
    setColumns(newColumns);
    onColumnUpdate?.(newColumns);
  };

  const handleAddItem = (columnId: string) => {
    onAddItem?.(columnId);
  };

  const handleEditItem = (columnId: string, item: KanbanItem) => {
    onEditItem?.(columnId, item);
  };

  const handleDeleteItem = (columnId: string, itemId: string) => {
    onDeleteItem?.(columnId, itemId);
  };

  const handleEditColumnStart = (columnId: string, currentTitle: string) => {
    setEditingColumn(columnId);
    setEditingColumnTitle(currentTitle);
  };

  const handleEditColumnSave = (columnId: string) => {
    if (editingColumnTitle.trim() !== "") {
      onEditColumn?.(columnId, editingColumnTitle);
    }
    setEditingColumn(null);
  };

  const handleEditColumnCancel = () => {
    setEditingColumn(null);
  };

  const getColumnBackgroundColor = (color?: string) => {
    switch (color) {
      case "red":
        return "bg-red-50 dark:bg-red-950/20";
      case "green":
        return "bg-green-50 dark:bg-green-950/20";
      case "blue":
        return "bg-blue-50 dark:bg-blue-950/20";
      case "yellow":
        return "bg-yellow-50 dark:bg-yellow-950/20";
      case "purple":
        return "bg-purple-50 dark:bg-purple-950/20";
      default:
        return "bg-gray-50 dark:bg-gray-800/50";
    }
  };

  const getColumnHeaderColor = (color?: string) => {
    switch (color) {
      case "red":
        return "text-red-700 dark:text-red-400";
      case "green":
        return "text-green-700 dark:text-green-400";
      case "blue":
        return "text-blue-700 dark:text-blue-400";
      case "yellow":
        return "text-yellow-700 dark:text-yellow-400";
      case "purple":
        return "text-purple-700 dark:text-purple-400";
      default:
        return "text-gray-700 dark:text-gray-300";
    }
  };

  const getPriorityBadge = (priority?: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;

      case "medium":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900"
          >
            Medium
          </Badge>
        );

      case "low":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-900"
          >
            Low
          </Badge>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className={cn("flex gap-4 overflow-x-auto pb-4", className)}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex-shrink-0 w-80">
            <Card className="h-full">
              <CardHeader className="px-4 py-3 flex flex-row items-center justify-between space-y-0">
                <Skeleton className="h-6 w-24" />

                <Skeleton className="h-8 w-8 rounded-full" />
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
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={cn("flex gap-4 overflow-x-auto pb-4", className)}>
        {columns.map((column) => (
          <div key={column.id} className="flex-shrink-0 w-80">
            <Card
              className={cn(
                "h-full border",
                getColumnBackgroundColor(column.color)
              )}
            >
              <CardHeader className="px-4 py-3 flex flex-row items-center justify-between space-y-0">
                {editingColumn === column.id ? (
                  <div className="flex items-center space-x-2 flex-1">
                    <Input
                      value={editingColumnTitle}
                      onChange={(e) => setEditingColumnTitle(e.target.value)}
                      className="h-7 text-sm font-medium"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleEditColumnSave(column.id);
                        if (e.key === "Escape") handleEditColumnCancel();
                      }}
                    />

                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0"
                      onClick={() => handleEditColumnSave(column.id)}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0"
                      onClick={handleEditColumnCancel}
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <h3
                      className={cn(
                        "text-sm font-medium flex items-center",
                        getColumnHeaderColor(column.color)
                      )}
                    >
                      {column.title}
                      {column.limit && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          {column.items.length}/{column.limit}
                        </Badge>
                      )}
                    </h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            handleEditColumnStart(column.id, column.title)
                          }
                        >
                          <EditIcon className="mr-2 h-4 w-4" />
                          Edit Column
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDeleteColumn?.(column.id)}
                          className="text-red-600"
                        >
                          <TrashIcon className="mr-2 h-4 w-4" />
                          Delete Column
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                )}
              </CardHeader>
              <CardContent className="px-2 pt-0 pb-2">
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <ScrollArea className="h-[calc(100vh-13rem)]">
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="space-y-2 min-h-[200px] p-1"
                      >
                        {column.items.map((item, index) => (
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
                                className={cn(
                                  "rounded-md border bg-card text-card-foreground shadow-sm",
                                  snapshot.isDragging && "opacity-80"
                                )}
                              >
                                <CardContent className="p-3 space-y-2">
                                  <div className="flex justify-between items-start">
                                    <h4 className="text-sm font-medium">
                                      {item.title}
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
                                        <DropdownMenuItem
                                          onClick={() =>
                                            handleEditItem(column.id, item)
                                          }
                                        >
                                          <EditIcon className="mr-2 h-4 w-4" />
                                          Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() =>
                                            handleDeleteItem(column.id, item.id)
                                          }
                                          className="text-red-600"
                                        >
                                          <TrashIcon className="mr-2 h-4 w-4" />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                  {item.description && (
                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                      {item.description}
                                    </p>
                                  )}
                                  <div className="flex flex-wrap gap-1 pt-1">
                                    {item.tags?.map((tag) => (
                                      <Badge
                                        key={tag}
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                  <div className="flex justify-between items-center pt-2">
                                    <div className="flex items-center gap-2">
                                      {getPriorityBadge(item.priority)}
                                      {item.dueDate && (
                                        <div className="flex items-center text-xs text-muted-foreground">
                                          <ClockIcon className="mr-1 h-3 w-3" />

                                          {item.dueDate}
                                        </div>
                                      )}
                                    </div>
                                    {item.assignee && (
                                      <Avatar className="h-6 w-6">
                                        {item.assignee.avatar ? (
                                          <AvatarImage
                                            src={item.assignee.avatar}
                                            alt={item.assignee.name}
                                          />
                                        ) : (
                                          <AvatarFallback>
                                            {item.assignee.name.charAt(0)}
                                          </AvatarFallback>
                                        )}
                                      </Avatar>
                                    )}
                                  </div>
                                </CardContent>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    </ScrollArea>
                  )}
                </Droppable>
              </CardContent>
              <CardFooter className="p-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground text-sm h-9"
                  onClick={() => handleAddItem(column.id)}
                >
                  <PlusIcon className="mr-1 h-4 w-4" />
                  Add Item
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
        <div className="flex-shrink-0 w-80">
          <Button
            variant="outline"
            className="h-12 w-full border-dashed"
            onClick={onAddColumn}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Column
          </Button>
        </div>
      </div>
    </DragDropContext>
  );
}

// Helper components
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function KanbanItemDialog({
  open,
  onOpenChange,
  item,
  columnId,
  onSave,
  users,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: KanbanItem;
  columnId: string;
  onSave: (columnId: string, item: Partial<KanbanItem>) => void;
  users: { id: string; name: string; avatar?: string }[];
}) {
  const [title, setTitle] = React.useState(item?.title || "");
  const [description, setDescription] = React.useState(item?.description || "");
  const [priority, setPriority] = React.useState(item?.priority || "medium");
  const [dueDate, setDueDate] = React.useState(item?.dueDate || "");
  const [assigneeId, setAssigneeId] = React.useState(item?.assignee?.id || "");
  const [tags, setTags] = React.useState(item?.tags?.join(", ") || "");

  React.useEffect(() => {
    if (item) {
      setTitle(item.title || "");
      setDescription(item.description || "");
      setPriority(item.priority || "medium");
      setDueDate(item.dueDate || "");
      setAssigneeId(item.assignee?.id || "");
      setTags(item.tags?.join(", ") || "");
    } else {
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
      setAssigneeId("");
      setTags("");
    }
  }, [item]);

  const handleSave = () => {
    const assignee = assigneeId
      ? users.find((user) => user.id === assigneeId)
      : undefined;

    onSave(columnId, {
      id: item?.id,
      title,
      description,
      priority: priority as "low" | "medium" | "high",
      dueDate,
      assignee,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{item ? "Edit Item" : "Add Item"}</DialogTitle>
          <DialogDescription>
            {item
              ? "Update the details of this item"
              : "Create a new item for this column"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label htmlFor="priority" className="text-sm font-medium">
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="dueDate" className="text-sm font-medium">
                Due Date
              </label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <label htmlFor="assignee" className="text-sm font-medium">
              Assignee
            </label>
            <select
              id="assignee"
              value={assigneeId}
              onChange={(e) => setAssigneeId(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Unassigned</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="tags" className="text-sm font-medium">
              Tags (comma separated)
            </label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. frontend, bug, feature"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title.trim()}>
            {item ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function KanbanColumnDialog({
  open,
  onOpenChange,
  column,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  column?: KanbanColumn;
  onSave: (column: Partial<KanbanColumn>) => void;
}) {
  const [title, setTitle] = React.useState(column?.title || "");
  const [color, setColor] = React.useState(column?.color || "");
  const [limit, setLimit] = React.useState<number | undefined>(column?.limit);

  React.useEffect(() => {
    if (column) {
      setTitle(column.title || "");
      setColor(column.color || "");
      setLimit(column.limit);
    } else {
      setTitle("");
      setColor("");
      setLimit(undefined);
    }
  }, [column]);

  const handleSave = () => {
    onSave({
      id: column?.id,
      title,
      color,
      limit,
      items: column?.items || [],
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{column ? "Edit Column" : "Add Column"}</DialogTitle>
          <DialogDescription>
            {column
              ? "Update the details of this column"
              : "Create a new column for your board"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter column title"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="color" className="text-sm font-medium">
              Color
            </label>
            <select
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Default</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="yellow">Yellow</option>
              <option value="purple">Purple</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="limit" className="text-sm font-medium">
              Item Limit (optional)
            </label>
            <Input
              id="limit"
              type="number"
              min="0"
              value={limit === undefined ? "" : limit}
              onChange={(e) => {
                const val = e.target.value;
                setLimit(val === "" ? undefined : parseInt(val, 10));
              }}
              placeholder="No limit"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title.trim()}>
            {column ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function KanbanBoardWithDialogs({
  initialColumns,
  onColumnUpdate,
  loading = false,
  className,
}: {
  initialColumns: KanbanColumn[];
  onColumnUpdate?: (columns: KanbanColumn[]) => void;
  loading?: boolean;
  className?: string;
}) {
  const [columns, setColumns] = React.useState<KanbanColumn[]>(initialColumns);
  const [itemDialogOpen, setItemDialogOpen] = React.useState(false);
  const [columnDialogOpen, setColumnDialogOpen] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState<KanbanItem | undefined>(
    undefined
  );
  const [currentColumn, setCurrentColumn] = React.useState<
    KanbanColumn | undefined
  >(undefined);
  const [activeColumnId, setActiveColumnId] = React.useState<string>("");

  React.useEffect(() => {
    setColumns(initialColumns);
  }, [initialColumns]);

  // Sample users for the demo
  const users = [
    {
      id: "user1",
      name: "Alex Johnson",
      avatar: "https://github.com/yusufhilmi.png",
    },
    {
      id: "user2",
      name: "Sam Smith",
      avatar: "https://github.com/furkanksl.png",
    },
    {
      id: "user3",
      name: "Taylor Wilson",
      avatar: "https://github.com/kdrnp.png",
    },
    {
      id: "user4",
      name: "Jordan Lee",
      avatar: "https://github.com/yahyabedirhan.png",
    },
  ];

  const handleColumnUpdate = (newColumns: KanbanColumn[]) => {
    setColumns(newColumns);
    onColumnUpdate?.(newColumns);
  };

  const handleAddItem = (columnId: string) => {
    setCurrentItem(undefined);
    setActiveColumnId(columnId);
    setItemDialogOpen(true);
  };

  const handleEditItem = (columnId: string, item: KanbanItem) => {
    setCurrentItem(item);
    setActiveColumnId(columnId);
    setItemDialogOpen(true);
  };

  const handleDeleteItem = (columnId: string, itemId: string) => {
    const newColumns = columns.map((col) => {
      if (col.id === columnId) {
        return {
          ...col,
          items: col.items.filter((item) => item.id !== itemId),
        };
      }
      return col;
    });
    handleColumnUpdate(newColumns);
  };

  const handleSaveItem = (columnId: string, itemData: Partial<KanbanItem>) => {
    const newColumns = columns.map((col) => {
      if (col.id === columnId) {
        if (itemData.id) {
          // Edit existing item
          return {
            ...col,
            items: col.items.map((item) =>
              item.id === itemData.id
                ? ({ ...item, ...itemData } as KanbanItem)
                : item
            ),
          };
        } else {
          // Add new item
          const newItem: KanbanItem = {
            id: `item-${Date.now()}`,
            title: itemData.title || "New Item",
            description: itemData.description,
            priority: itemData.priority,
            dueDate: itemData.dueDate,
            assignee: itemData.assignee,
            tags: itemData.tags,
          };
          return {
            ...col,
            items: [...col.items, newItem],
          };
        }
      }
      return col;
    });
    handleColumnUpdate(newColumns);
  };

  const handleAddColumn = () => {
    setCurrentColumn(undefined);
    setColumnDialogOpen(true);
  };

  const handleEditColumn = (columnId: string, title: string) => {
    const newColumns = columns.map((col) => {
      if (col.id === columnId) {
        return { ...col, title };
      }
      return col;
    });
    handleColumnUpdate(newColumns);
  };

  const handleDeleteColumn = (columnId: string) => {
    const newColumns = columns.filter((col) => col.id !== columnId);
    handleColumnUpdate(newColumns);
  };

  const handleSaveColumn = (columnData: Partial<KanbanColumn>) => {
    if (columnData.id) {
      // Edit existing column
      const newColumns = columns.map((col) => {
        if (col.id === columnData.id) {
          return {
            ...col,
            title: columnData.title || col.title,
            color: columnData.color,
            limit: columnData.limit,
          };
        }
        return col;
      });
      handleColumnUpdate(newColumns);
    } else {
      // Add new column
      const newColumn: KanbanColumn = {
        id: `column-${Date.now()}`,
        title: columnData.title || "New Column",
        color: columnData.color,
        limit: columnData.limit,
        items: [],
      };
      handleColumnUpdate([...columns, newColumn]);
    }
  };

  return (
    <>
      <KanbanBoard
        columns={columns}
        onColumnUpdate={handleColumnUpdate}
        onAddItem={handleAddItem}
        onEditItem={handleEditItem}
        onDeleteItem={handleDeleteItem}
        onAddColumn={handleAddColumn}
        onEditColumn={handleEditColumn}
        onDeleteColumn={handleDeleteColumn}
        loading={loading}
        className={className}
      />

      <KanbanItemDialog
        open={itemDialogOpen}
        onOpenChange={setItemDialogOpen}
        item={currentItem}
        columnId={activeColumnId}
        onSave={handleSaveItem}
        users={users}
      />

      <KanbanColumnDialog
        open={columnDialogOpen}
        onOpenChange={setColumnDialogOpen}
        column={currentColumn}
        onSave={handleSaveColumn}
      />
    </>
  );
}
