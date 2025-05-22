import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircleIcon,
  CheckCircleIcon,
  EditIcon,
  InfoIcon,
  LockIcon,
  PlusIcon,
  SearchIcon,
  ShieldIcon,
  TrashIcon,
  UsersIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Role {
  id: string;
  name: string;
  description: string;
  isDefault?: boolean;
  isSystem?: boolean;
  permissions: Permission[];
  memberCount: number;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  isGranted: boolean;
}

interface PermissionManagementInterfaceProps {
  organizationId: string;
  organizationName: string;
}

export default function PermissionManagementInterface({
  organizationId,
  organizationName,
}: PermissionManagementInterfaceProps) {
  // Sample permission categories and permissions
  const permissionCategories = [
    {
      id: "general",
      name: "General",
      permissions: [
        {
          id: "view_dashboard",
          name: "View Dashboard",
          description: "Can view the organization dashboard",
        },
        {
          id: "manage_organization_settings",
          name: "Manage Organization Settings",
          description: "Can modify organization settings",
        },
      ],
    },
    {
      id: "members",
      name: "Members",
      permissions: [
        {
          id: "view_members",
          name: "View Members",
          description: "Can view organization members",
        },
        {
          id: "invite_members",
          name: "Invite Members",
          description: "Can invite new members to the organization",
        },
        {
          id: "remove_members",
          name: "Remove Members",
          description: "Can remove members from the organization",
        },
      ],
    },
    {
      id: "roles",
      name: "Roles & Permissions",
      permissions: [
        {
          id: "view_roles",
          name: "View Roles",
          description: "Can view organization roles",
        },
        {
          id: "create_roles",
          name: "Create Roles",
          description: "Can create new roles",
        },
        {
          id: "edit_roles",
          name: "Edit Roles",
          description: "Can modify existing roles",
        },
        {
          id: "delete_roles",
          name: "Delete Roles",
          description: "Can delete roles",
        },
        {
          id: "assign_roles",
          name: "Assign Roles",
          description: "Can assign roles to members",
        },
      ],
    },
    {
      id: "content",
      name: "Content",
      permissions: [
        {
          id: "create_content",
          name: "Create Content",
          description: "Can create new content",
        },
        {
          id: "edit_content",
          name: "Edit Content",
          description: "Can edit existing content",
        },
        {
          id: "delete_content",
          name: "Delete Content",
          description: "Can delete content",
        },
        {
          id: "publish_content",
          name: "Publish Content",
          description: "Can publish content",
        },
      ],
    },
    {
      id: "billing",
      name: "Billing",
      permissions: [
        {
          id: "view_billing",
          name: "View Billing",
          description: "Can view billing information",
        },
        {
          id: "manage_billing",
          name: "Manage Billing",
          description: "Can manage billing settings and payments",
        },
      ],
    },
  ];

  // Sample roles
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "admin",
      name: "Administrator",
      description: "Full access to all organization features",
      isSystem: true,
      permissions: permissionCategories.flatMap((category) =>
        category.permissions.map((permission) => ({
          ...permission,
          category: category.name,
          isGranted: true,
        }))
      ),
      memberCount: 3,
    },
    {
      id: "member",
      name: "Member",
      description: "Standard member with limited permissions",
      isDefault: true,
      permissions: permissionCategories.flatMap((category) =>
        category.permissions.map((permission) => ({
          ...permission,
          category: category.name,
          isGranted:
            permission.id === "view_dashboard" ||
            permission.id === "view_members",
        }))
      ),
      memberCount: 12,
    },
    {
      id: "content_manager",
      name: "Content Manager",
      description: "Can create and manage content",
      permissions: permissionCategories.flatMap((category) =>
        category.permissions.map((permission) => ({
          ...permission,
          category: category.name,
          isGranted:
            permission.id === "view_dashboard" ||
            permission.id === "view_members" ||
            permission.id.includes("content"),
        }))
      ),
      memberCount: 5,
    },
    {
      id: "billing_admin",
      name: "Billing Administrator",
      description: "Can manage billing and payments",
      permissions: permissionCategories.flatMap((category) =>
        category.permissions.map((permission) => ({
          ...permission,
          category: category.name,
          isGranted:
            permission.id === "view_dashboard" ||
            permission.id === "view_members" ||
            permission.id.includes("billing"),
        }))
      ),
      memberCount: 2,
    },
  ]);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editedRole, setEditedRole] = useState<Role | null>(null);

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
  };

  const handleEditRole = (role: Role) => {
    setEditedRole({ ...role });
    setIsEditDialogOpen(true);
  };

  const handleCreateRole = () => {
    const newRole: Role = {
      id: `role_${Date.now()}`,
      name: "",
      description: "",
      permissions: permissionCategories.flatMap((category) =>
        category.permissions.map((permission) => ({
          ...permission,
          category: category.name,
          isGranted: false,
        }))
      ),
      memberCount: 0,
    };
    setEditedRole(newRole);
    setIsEditDialogOpen(true);
  };

  const handleSaveRole = () => {
    if (!editedRole) return;

    if (editedRole.id.startsWith("role_")) {
      // New role
      setRoles([...roles, editedRole]);
    } else {
      // Update existing role
      setRoles(
        roles.map((role) => (role.id === editedRole.id ? editedRole : role))
      );
    }

    setIsEditDialogOpen(false);
    setSelectedRole(editedRole);
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter((role) => role.id !== roleId));
    if (selectedRole?.id === roleId) {
      setSelectedRole(null);
    }
  };

  const handlePermissionChange = (permissionId: string, isGranted: boolean) => {
    if (!editedRole) return;

    setEditedRole({
      ...editedRole,
      permissions: editedRole.permissions.map((permission) =>
        permission.id === permissionId
          ? { ...permission, isGranted }
          : permission
      ),
    });
  };

  const handleCategoryPermissionChange = (
    category: string,
    isGranted: boolean
  ) => {
    if (!editedRole) return;

    setEditedRole({
      ...editedRole,
      permissions: editedRole.permissions.map((permission) =>
        permission.category === category
          ? { ...permission, isGranted }
          : permission
      ),
    });
  };

  // Filter roles based on search query
  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <ShieldIcon className="h-6 w-6 text-primary" />

        <h1 className="text-2xl font-bold">
          {organizationName} Roles & Permissions
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roles List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Roles</CardTitle>
              <Button
                size="sm"
                onClick={handleCreateRole}
                className="h-8 gap-1"
              >
                <PlusIcon className="h-4 w-4" />
                New Role
              </Button>
            </div>
            <CardDescription>
              Manage roles and their permissions
            </CardDescription>
            <div className="relative mt-2">
              <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder="Search roles..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[500px] overflow-y-auto">
              {filteredRoles.map((role) => (
                <div
                  key={role.id}
                  className={`px-4 py-3 border-b last:border-b-0 cursor-pointer transition-colors ${
                    selectedRole?.id === role.id
                      ? "bg-muted"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleRoleSelect(role)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {role.name}
                        {role.isSystem && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge
                                  variant="secondary"
                                  className="text-xs font-normal"
                                >
                                  System
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>System roles cannot be deleted</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                        {role.isDefault && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge
                                  variant="outline"
                                  className="text-xs font-normal"
                                >
                                  Default
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  Default role assigned to new organization
                                  members
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {role.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge variant="secondary" className="text-xs">
                        <UsersIcon className="h-3 w-3 mr-1" />

                        {role.memberCount}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}

              {filteredRoles.length === 0 && (
                <div className="px-4 py-8 text-center text-muted-foreground">
                  No roles found matching "{searchQuery}"
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Role Details */}
        <Card className="lg:col-span-2">
          {selectedRole ? (
            <>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {selectedRole.name}
                      {selectedRole.isSystem && (
                        <Badge
                          variant="secondary"
                          className="text-xs font-normal"
                        >
                          System
                        </Badge>
                      )}
                      {selectedRole.isDefault && (
                        <Badge
                          variant="outline"
                          className="text-xs font-normal"
                        >
                          Default
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {selectedRole.description}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditRole(selectedRole)}
                      disabled={selectedRole.isSystem}
                    >
                      <EditIcon className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteRole(selectedRole.id)}
                      disabled={selectedRole.isSystem}
                    >
                      <TrashIcon className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Permissions</h3>
                    <Badge variant="secondary">
                      <UsersIcon className="h-3 w-3 mr-1" />
                      {selectedRole.memberCount} members
                    </Badge>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Permission</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="w-[100px] text-right">
                          Status
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {permissionCategories.map((category) => (
                        <React.Fragment key={category.id}>
                          <TableRow className="bg-muted/50">
                            <TableCell colSpan={3} className="font-medium">
                              {category.name}
                            </TableCell>
                          </TableRow>
                          {category.permissions.map((permission) => {
                            const rolePermission =
                              selectedRole.permissions.find(
                                (p) => p.id === permission.id
                              );
                            const isGranted =
                              rolePermission?.isGranted || false;

                            return (
                              <TableRow key={permission.id}>
                                <TableCell className="font-medium">
                                  {permission.name}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                  {permission.description}
                                </TableCell>
                                <TableCell className="text-right">
                                  {isGranted ? (
                                    <Badge className="bg-green-500 hover:bg-green-500/90">
                                      <CheckCircleIcon className="h-3 w-3 mr-1" />
                                      Granted
                                    </Badge>
                                  ) : (
                                    <Badge
                                      variant="outline"
                                      className="text-muted-foreground"
                                    >
                                      <LockIcon className="h-3 w-3 mr-1" />
                                      Denied
                                    </Badge>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <ShieldIcon className="h-16 w-16 text-muted-foreground mb-4" />

              <h3 className="text-lg font-medium">No Role Selected</h3>
              <p className="text-muted-foreground text-center max-w-md mt-2">
                Select a role from the list to view and manage its permissions,
                or create a new role to get started.
              </p>
              <Button className="mt-6" onClick={handleCreateRole}>
                <PlusIcon className="h-4 w-4 mr-2" />
                Create New Role
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Edit Role Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editedRole?.id.startsWith("role_")
                ? "Create New Role"
                : "Edit Role"}
            </DialogTitle>
            <DialogDescription>
              {editedRole?.id.startsWith("role_")
                ? "Create a new role and define its permissions"
                : "Modify role details and permissions"}
            </DialogDescription>
          </DialogHeader>

          {editedRole && (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="role-name">Role Name</Label>
                  <Input
                    id="role-name"
                    value={editedRole.name}
                    onChange={(e) =>
                      setEditedRole({ ...editedRole, name: e.target.value })
                    }
                    placeholder="Enter role name"
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="role-description">Description</Label>
                  <Input
                    id="role-description"
                    value={editedRole.description}
                    onChange={(e) =>
                      setEditedRole({
                        ...editedRole,
                        description: e.target.value,
                      })
                    }
                    placeholder="Enter role description"
                  />
                </div>

                <div className="grid grid-cols-1 gap-2 mt-2">
                  <div className="flex items-center justify-between">
                    <Label>Role Type</Label>
                    {editedRole.isSystem && (
                      <Badge variant="secondary">System Role</Badge>
                    )}
                  </div>
                  <Select
                    value={editedRole.isDefault ? "default" : "custom"}
                    onValueChange={(value) =>
                      setEditedRole({
                        ...editedRole,
                        isDefault: value === "default",
                      })
                    }
                    disabled={editedRole.isSystem}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">
                        Default (assigned to new members)
                      </SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="my-2" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Permissions</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Configure which actions this role can perform within
                            the organization
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {permissionCategories.map((category) => (
                    <div key={category.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`category-${category.id}`}
                            checked={editedRole.permissions
                              .filter((p) => p.category === category.name)
                              .every((p) => p.isGranted)}
                            onCheckedChange={(checked) =>
                              handleCategoryPermissionChange(
                                category.name,
                                !!checked
                              )
                            }
                          />

                          <Label
                            htmlFor={`category-${category.id}`}
                            className="text-base font-medium"
                          >
                            {category.name}
                          </Label>
                        </div>
                        <Badge variant="outline" className="font-normal">
                          {
                            category.permissions.filter((p) =>
                              editedRole.permissions.find(
                                (rp) =>
                                  rp.id === p.id &&
                                  rp.category === category.name &&
                                  rp.isGranted
                              )
                            ).length
                          }{" "}
                          / {category.permissions.length}
                        </Badge>
                      </div>

                      <div className="ml-6 space-y-2">
                        {category.permissions.map((permission) => {
                          const rolePermission = editedRole.permissions.find(
                            (p) => p.id === permission.id
                          );
                          return (
                            <div
                              key={permission.id}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id={permission.id}
                                  checked={rolePermission?.isGranted || false}
                                  onCheckedChange={(checked) =>
                                    handlePermissionChange(
                                      permission.id,
                                      !!checked
                                    )
                                  }
                                />

                                <Label
                                  htmlFor={permission.id}
                                  className="font-normal"
                                >
                                  {permission.name}
                                </Label>
                              </div>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{permission.description}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveRole}>
                  {editedRole.id.startsWith("role_")
                    ? "Create Role"
                    : "Save Changes"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
