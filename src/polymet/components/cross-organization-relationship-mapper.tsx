import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRightIcon,
  BuildingIcon,
  EditIcon,
  LinkIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
  UnlinkIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Organization {
  id: string;
  name: string;
  logo: string;
  type: string;
}

interface Relationship {
  id: string;
  sourceOrgId: string;
  targetOrgId: string;
  type: string;
  status: "active" | "pending" | "inactive";
  permissions: string[];
  createdAt: string;
}

interface CrossOrganizationRelationshipMapperProps {
  currentOrganizationId: string;
  currentOrganizationName: string;
}

export default function CrossOrganizationRelationshipMapper({
  currentOrganizationId,
  currentOrganizationName,
}: CrossOrganizationRelationshipMapperProps) {
  // Sample organizations data
  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: "org1",
      name: "Toolbank",
      logo: "https://picsum.photos/seed/toolbank/200/200",
      type: "Distributor",
    },
    {
      id: "org2",
      name: "NMBS",
      logo: "https://picsum.photos/seed/nmbs/200/200",
      type: "Buying Group",
    },
    {
      id: "org3",
      name: "IBC",
      logo: "https://picsum.photos/seed/ibc/200/200",
      type: "Buying Consortium",
    },
    {
      id: "org4",
      name: "BMF",
      logo: "https://picsum.photos/seed/bmf/200/200",
      type: "Trade Association",
    },
    {
      id: "org5",
      name: "Screwfix",
      logo: "https://picsum.photos/seed/screwfix/200/200",
      type: "Retailer",
    },
    {
      id: "org6",
      name: "Travis Perkins",
      logo: "https://picsum.photos/seed/travisperkins/200/200",
      type: "Merchant",
    },
  ]);

  // Sample relationships data
  const [relationships, setRelationships] = useState<Relationship[]>([
    {
      id: "rel1",
      sourceOrgId: "org1", // Toolbank
      targetOrgId: "org2", // NMBS
      type: "Supplier",
      status: "active",
      permissions: ["view_catalog", "place_orders"],
      createdAt: "2023-01-15T10:30:00",
    },
    {
      id: "rel2",
      sourceOrgId: "org1", // Toolbank
      targetOrgId: "org3", // IBC
      type: "Supplier",
      status: "active",
      permissions: ["view_catalog", "place_orders", "view_pricing"],
      createdAt: "2023-02-20T14:45:00",
    },
    {
      id: "rel3",
      sourceOrgId: "org4", // BMF
      targetOrgId: "org1", // Toolbank
      type: "Member",
      status: "active",
      permissions: ["view_resources", "attend_events"],
      createdAt: "2023-03-10T09:15:00",
    },
    {
      id: "rel4",
      sourceOrgId: "org5", // Screwfix
      targetOrgId: "org1", // Toolbank
      type: "Customer",
      status: "pending",
      permissions: ["view_catalog"],
      createdAt: "2023-06-05T16:20:00",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRelationship, setSelectedRelationship] =
    useState<Relationship | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get organization by ID
  const getOrganizationById = (id: string) => {
    return organizations.find((org) => org.id === id);
  };

  // Filter relationships based on search query and filter type
  const filteredRelationships = relationships.filter((rel) => {
    const sourceOrg = getOrganizationById(rel.sourceOrgId);
    const targetOrg = getOrganizationById(rel.targetOrgId);

    // Filter by search query
    const matchesSearch =
      !searchQuery ||
      sourceOrg?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      targetOrg?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rel.type.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by relationship type
    const matchesType =
      filterType === "all" ||
      (filterType === "inbound" && rel.targetOrgId === currentOrganizationId) ||
      (filterType === "outbound" && rel.sourceOrgId === currentOrganizationId);

    return matchesSearch && matchesType;
  });

  // Get relationships where current organization is involved
  const currentOrgRelationships = relationships.filter(
    (rel) =>
      rel.sourceOrgId === currentOrganizationId ||
      rel.targetOrgId === currentOrganizationId
  );

  // Handle adding a new relationship
  const handleAddRelationship = (formData: {
    targetOrgId: string;
    type: string;
    permissions: string[];
  }) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newRelationship: Relationship = {
        id: `rel${relationships.length + 1}`,
        sourceOrgId: currentOrganizationId,
        targetOrgId: formData.targetOrgId,
        type: formData.type,
        status: "pending",
        permissions: formData.permissions,
        createdAt: new Date().toISOString(),
      };
      setRelationships([...relationships, newRelationship]);
      setIsAddDialogOpen(false);
      setIsLoading(false);
    }, 1000);
  };

  // Handle editing an existing relationship
  const handleEditRelationship = (relationship: Relationship) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setRelationships(
        relationships.map((rel) =>
          rel.id === relationship.id ? relationship : rel
        )
      );
      setIsEditDialogOpen(false);
      setSelectedRelationship(null);
      setIsLoading(false);
    }, 1000);
  };

  // Handle deleting a relationship
  const handleDeleteRelationship = (relationshipId: string) => {
    setRelationships(relationships.filter((rel) => rel.id !== relationshipId));
  };

  // Get status badge based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
          >
            Active
          </Badge>
        );

      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800"
          >
            Pending
          </Badge>
        );

      case "inactive":
        return (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800"
          >
            Inactive
          </Badge>
        );

      default:
        return null;
    }
  };

  // Available permission options
  const permissionOptions = [
    { id: "view_catalog", label: "View Product Catalog" },
    { id: "view_pricing", label: "View Pricing Information" },
    { id: "place_orders", label: "Place Orders" },
    { id: "view_resources", label: "Access Resources" },
    { id: "attend_events", label: "Attend Events" },
    { id: "api_access", label: "API Access" },
    { id: "data_sharing", label: "Data Sharing" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Organization Relationships</h2>
          <p className="text-muted-foreground">
            Manage relationships between {currentOrganizationName} and other
            organizations
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <LinkIcon className="h-4 w-4 mr-2" />
              Create Relationship
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Relationship</DialogTitle>
              <DialogDescription>
                Establish a relationship with another organization and set
                permissions.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const targetOrgId = formData.get("targetOrgId") as string;
                const type = formData.get("type") as string;
                const permissions = permissionOptions
                  .filter((option) => formData.get(option.id) === "on")
                  .map((option) => option.id);

                handleAddRelationship({
                  targetOrgId,
                  type,
                  permissions,
                });
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="targetOrgId">Target Organization</Label>
                  <Select name="targetOrgId" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an organization" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizations
                        .filter((org) => org.id !== currentOrganizationId)
                        .map((org) => (
                          <SelectItem key={org.id} value={org.id}>
                            <div className="flex items-center gap-2">
                              <img
                                src={org.logo}
                                alt={org.name}
                                className="h-5 w-5 rounded-full object-cover"
                              />

                              <span>{org.name}</span>
                              <span className="text-xs text-muted-foreground">
                                ({org.type})
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Relationship Type</Label>
                  <Select name="type" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Supplier">Supplier</SelectItem>
                      <SelectItem value="Customer">Customer</SelectItem>
                      <SelectItem value="Partner">Partner</SelectItem>
                      <SelectItem value="Member">Member</SelectItem>
                      <SelectItem value="Affiliate">Affiliate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Permissions</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border rounded-md p-3">
                    {permissionOptions.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox id={option.id} name={option.id} />

                        <Label
                          htmlFor={option.id}
                          className="text-sm font-normal"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Relationship"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search organizations or relationship types..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter relationships" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Relationships</SelectItem>
            <SelectItem value="inbound">Inbound</SelectItem>
            <SelectItem value="outbound">Outbound</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source Organization</TableHead>
                <TableHead className="w-10 text-center"></TableHead>
                <TableHead>Target Organization</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRelationships.length > 0 ? (
                filteredRelationships.map((relationship) => {
                  const sourceOrg = getOrganizationById(
                    relationship.sourceOrgId
                  );
                  const targetOrg = getOrganizationById(
                    relationship.targetOrgId
                  );

                  if (!sourceOrg || !targetOrg) return null;

                  return (
                    <TableRow key={relationship.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img
                            src={sourceOrg.logo}
                            alt={sourceOrg.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />

                          <div>
                            <div className="font-medium">{sourceOrg.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {sourceOrg.type}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <ArrowRightIcon className="h-4 w-4 mx-auto" />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img
                            src={targetOrg.logo}
                            alt={targetOrg.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />

                          <div>
                            <div className="font-medium">{targetOrg.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {targetOrg.type}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{relationship.type}</Badge>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(relationship.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {relationship.permissions.length > 0 ? (
                            relationship.permissions.length > 2 ? (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Badge variant="secondary">
                                      {relationship.permissions.length}{" "}
                                      permissions
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <ul className="list-disc pl-4 space-y-1">
                                      {relationship.permissions.map((perm) => (
                                        <li key={perm}>
                                          {permissionOptions.find(
                                            (p) => p.id === perm
                                          )?.label || perm}
                                        </li>
                                      ))}
                                    </ul>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ) : (
                              relationship.permissions.map((perm) => (
                                <Badge
                                  key={perm}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {permissionOptions.find((p) => p.id === perm)
                                    ?.label || perm}
                                </Badge>
                              ))
                            )
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              None
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(relationship.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {
                                    setSelectedRelationship(relationship);
                                    setIsEditDialogOpen(true);
                                  }}
                                >
                                  <EditIcon className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit Relationship</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                                  onClick={() =>
                                    handleDeleteRelationship(relationship.id)
                                  }
                                >
                                  <UnlinkIcon className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                Remove Relationship
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <BuildingIcon className="h-10 w-10 text-muted-foreground mb-2" />

                      <p className="text-muted-foreground">
                        No relationships found matching your search criteria
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Relationship Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Relationship</DialogTitle>
            <DialogDescription>
              Update relationship details and permissions
            </DialogDescription>
          </DialogHeader>
          {selectedRelationship && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const type = formData.get("type") as string;
                const status = formData.get("status") as
                  | "active"
                  | "pending"
                  | "inactive";
                const permissions = permissionOptions
                  .filter((option) => formData.get(option.id) === "on")
                  .map((option) => option.id);

                handleEditRelationship({
                  ...selectedRelationship,
                  type,
                  status,
                  permissions,
                });
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Source Organization</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <img
                        src={
                          getOrganizationById(selectedRelationship.sourceOrgId)
                            ?.logo
                        }
                        alt={
                          getOrganizationById(selectedRelationship.sourceOrgId)
                            ?.name
                        }
                        className="h-8 w-8 rounded-full object-cover"
                      />

                      <div>
                        <div className="font-medium">
                          {
                            getOrganizationById(
                              selectedRelationship.sourceOrgId
                            )?.name
                          }
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {
                            getOrganizationById(
                              selectedRelationship.sourceOrgId
                            )?.type
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label>Target Organization</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <img
                        src={
                          getOrganizationById(selectedRelationship.targetOrgId)
                            ?.logo
                        }
                        alt={
                          getOrganizationById(selectedRelationship.targetOrgId)
                            ?.name
                        }
                        className="h-8 w-8 rounded-full object-cover"
                      />

                      <div>
                        <div className="font-medium">
                          {
                            getOrganizationById(
                              selectedRelationship.targetOrgId
                            )?.name
                          }
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {
                            getOrganizationById(
                              selectedRelationship.targetOrgId
                            )?.type
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-type">Relationship Type</Label>
                  <Select name="type" defaultValue={selectedRelationship.type}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Supplier">Supplier</SelectItem>
                      <SelectItem value="Customer">Customer</SelectItem>
                      <SelectItem value="Partner">Partner</SelectItem>
                      <SelectItem value="Member">Member</SelectItem>
                      <SelectItem value="Affiliate">Affiliate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    name="status"
                    defaultValue={selectedRelationship.status}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Permissions</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border rounded-md p-3">
                    {permissionOptions.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={option.id}
                          name={option.id}
                          defaultChecked={selectedRelationship.permissions.includes(
                            option.id
                          )}
                        />

                        <Label
                          htmlFor={option.id}
                          className="text-sm font-normal"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
