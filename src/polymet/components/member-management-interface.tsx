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
  MailIcon,
  MoreVerticalIcon,
  PlusIcon,
  SearchIcon,
  ShieldIcon,
  TrashIcon,
  UserIcon,
  UserPlusIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "pending" | "inactive";
  lastActive?: string;
  avatar?: string;
}

interface MemberManagementInterfaceProps {
  organizationId: string;
  organizationName: string;
}

export default function MemberManagementInterface({
  organizationId,
  organizationName,
}: MemberManagementInterfaceProps) {
  const [members, setMembers] = useState<Member[]>([
    {
      id: "m1",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Admin",
      status: "active",
      lastActive: "2023-06-15T10:30:00",
      avatar: "https://github.com/yahyabedirhan.png",
    },
    {
      id: "m2",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Member",
      status: "active",
      lastActive: "2023-06-14T16:45:00",
      avatar: "https://github.com/furkanksl.png",
    },
    {
      id: "m3",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      role: "Content Manager",
      status: "active",
      lastActive: "2023-06-10T09:15:00",
      avatar: "https://github.com/kdrnp.png",
    },
    {
      id: "m4",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      role: "Billing Admin",
      status: "active",
      lastActive: "2023-06-12T14:20:00",
      avatar: "https://github.com/denizbuyuktas.png",
    },
    {
      id: "m5",
      name: "Emily Wilson",
      email: "emily.wilson@example.com",
      role: "Member",
      status: "pending",
      avatar: "",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter members based on search query
  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInviteMember = (formData: {
    email: string;
    role: string;
    name: string;
  }) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newMember: Member = {
        id: `m${members.length + 1}`,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: "pending",
      };
      setMembers([...members, newMember]);
      setIsInviteDialogOpen(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleEditMember = (member: Member) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setMembers(members.map((m) => (m.id === member.id ? member : m)));
      setIsEditDialogOpen(false);
      setSelectedMember(null);
      setIsLoading(false);
    }, 1000);
  };

  const handleDeleteMember = (memberId: string) => {
    setMembers(members.filter((member) => member.id !== memberId));
  };

  const handleResendInvite = (memberId: string) => {
    // Simulate API call
    alert(`Invitation resent to member with ID: ${memberId}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
          >
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Active
          </Badge>
        );

      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800"
          >
            <InfoIcon className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );

      case "inactive":
        return (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800"
          >
            <AlertCircleIcon className="h-3 w-3 mr-1" />
            Inactive
          </Badge>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Members</h2>
          <p className="text-muted-foreground">
            Manage members and their roles in {organizationName}
          </p>
        </div>
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlusIcon className="h-4 w-4 mr-2" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New Member</DialogTitle>
              <DialogDescription>
                Send an invitation to join {organizationName}. They will receive
                an email with instructions to accept.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleInviteMember({
                  email: formData.get("email") as string,
                  role: formData.get("role") as string,
                  name: formData.get("name") as string,
                });
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter member's full name"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select name="role" defaultValue="Member">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Member">Member</SelectItem>
                      <SelectItem value="Content Manager">
                        Content Manager
                      </SelectItem>
                      <SelectItem value="Billing Admin">
                        Billing Admin
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsInviteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Invitation"}
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
            placeholder="Search members by name, email, or role..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Members</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} />

                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {member.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          member.role === "Admin"
                            ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800"
                            : ""
                        }
                      >
                        {member.role === "Admin" && (
                          <ShieldIcon className="h-3 w-3 mr-1" />
                        )}
                        {member.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(member.status)}</TableCell>
                    <TableCell>
                      {member.lastActive
                        ? new Date(member.lastActive).toLocaleDateString()
                        : "Never"}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVerticalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedMember(member);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <EditIcon className="h-4 w-4 mr-2" />
                            Edit Member
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              window.open(`mailto:${member.email}`);
                            }}
                          >
                            <MailIcon className="h-4 w-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          {member.status === "pending" && (
                            <DropdownMenuItem
                              onClick={() => handleResendInvite(member.id)}
                            >
                              <UserPlusIcon className="h-4 w-4 mr-2" />
                              Resend Invite
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            className="text-red-600 dark:text-red-400"
                            onClick={() => handleDeleteMember(member.id)}
                          >
                            <TrashIcon className="h-4 w-4 mr-2" />
                            Remove Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <UserIcon className="h-10 w-10 text-muted-foreground mb-2" />

                      <p className="text-muted-foreground">
                        No members found matching your search criteria
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between py-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredMembers.length} of {members.length} members
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Edit Member Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
            <DialogDescription>
              Update member details and permissions
            </DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleEditMember({
                  ...selectedMember,
                  name: formData.get("name") as string,
                  email: formData.get("email") as string,
                  role: formData.get("role") as string,
                  status: formData.get("status") as
                    | "active"
                    | "pending"
                    | "inactive",
                });
              }}
            >
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    name="name"
                    defaultValue={selectedMember.name}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-email">Email Address</Label>
                  <Input
                    id="edit-email"
                    name="email"
                    type="email"
                    defaultValue={selectedMember.email}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-role">Role</Label>
                  <Select name="role" defaultValue={selectedMember.role}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Member">Member</SelectItem>
                      <SelectItem value="Content Manager">
                        Content Manager
                      </SelectItem>
                      <SelectItem value="Billing Admin">
                        Billing Admin
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select name="status" defaultValue={selectedMember.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
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
