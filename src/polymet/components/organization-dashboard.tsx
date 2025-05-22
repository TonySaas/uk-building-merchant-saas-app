import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircleIcon,
  BellIcon,
  BuildingIcon,
  FileTextIcon,
  GlobeIcon,
  KeyIcon,
  LayoutIcon,
  LockIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import OrganizationProfileEditor from "@/polymet/components/organization-profile-editor";
import PermissionManagementInterface from "@/polymet/components/permission-management-interface";

interface OrganizationDashboardProps {
  organizationId: string;
  organizationName: string;
  organizationLogo?: string;
}

export default function OrganizationDashboard({
  organizationId,
  organizationName,
  organizationLogo,
}: OrganizationDashboardProps) {
  const [activeTab, setActiveTab] = useState("profile");

  // Sample settings sections
  const settingsSections = [
    {
      id: "profile",
      title: "Organization Profile",
      icon: <BuildingIcon className="h-5 w-5" />,

      description: "Manage organization details and branding",
    },
    {
      id: "members",
      title: "Members",
      icon: <UsersIcon className="h-5 w-5" />,

      description: "Manage organization members and roles",
      badge: "12",
    },
    {
      id: "permissions",
      title: "Permissions",
      icon: <LockIcon className="h-5 w-5" />,

      description: "Configure role-based access controls",
      badge: "Alert",
      badgeVariant: "destructive",
    },
    {
      id: "domains",
      title: "Domains",
      icon: <GlobeIcon className="h-5 w-5" />,

      description: "Manage domains and email settings",
    },
    {
      id: "billing",
      title: "Billing",
      icon: <FileTextIcon className="h-5 w-5" />,

      description: "Subscription and payment information",
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: <BellIcon className="h-5 w-5" />,

      description: "Configure notification preferences",
      badge: "New",
      badgeVariant: "default",
    },
    {
      id: "branding",
      title: "Branding & Theme",
      icon: <LayoutIcon className="h-5 w-5" />,

      description: "Customize organization appearance",
    },
    {
      id: "api",
      title: "API & Integrations",
      icon: <KeyIcon className="h-5 w-5" />,

      description: "Manage API keys and third-party integrations",
    },
  ];

  // Sample organization data
  const sampleOrganization = {
    id: organizationId,
    name: organizationName,
    description:
      "Leading distributor of hand tools, power tools, and associated products to the UK and Ireland's hardware retail and merchant trade.",
    logo: organizationLogo || "https://picsum.photos/seed/toolbank/200/200",
    website: "https://www.toolbank.com",
    primaryColor: "#E11D48",
    secondaryColor: "#0F172A",
    accentColor: "#FBBF24",
    contactEmail: "info@toolbank.com",
    contactPhone: "+44 1322 321 321",
    address:
      "Toolbank House, Springwood Drive\nHead Office, Braintree, Essex\nCM7 2YN, United Kingdom",
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        {organizationLogo && (
          <img
            src={organizationLogo}
            alt={`${organizationName} logo`}
            className="h-12 w-12 rounded-md object-contain bg-muted p-1"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold">{organizationName} Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your organization settings and members
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BuildingIcon className="h-5 w-5 text-primary" />

              <span>Organization</span>
            </CardTitle>
            <CardDescription>Configure your organization</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <nav className="space-y-1 px-2">
              {settingsSections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeTab === section.id ? "secondary" : "ghost"}
                  className="w-full justify-start h-auto py-3"
                  onClick={() => setActiveTab(section.id)}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      {section.icon}
                      <span>{section.title}</span>
                    </div>
                    {section.badge && (
                      <Badge variant={section.badgeVariant || "outline"}>
                        {section.badge}
                      </Badge>
                    )}
                  </div>
                </Button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <Card className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="hidden">
              {settingsSections.map((section) => (
                <TabsTrigger key={section.id} value={section.id}>
                  {section.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <CardHeader>
                <CardTitle>Organization Profile</CardTitle>
                <CardDescription>
                  Manage your organization's details and branding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OrganizationProfileEditor
                  organization={sampleOrganization}
                  onSave={(org) => console.log("Saved organization:", org)}
                />
              </CardContent>
            </TabsContent>

            {/* Members Tab */}
            <TabsContent value="members">
              <CardHeader>
                <CardTitle>Members</CardTitle>
                <CardDescription>
                  Manage organization members and roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-md">
                  <UsersIcon className="h-12 w-12 text-muted-foreground mb-4" />

                  <h3 className="text-lg font-medium">Member Management</h3>
                  <p className="text-muted-foreground text-center max-w-md mt-2">
                    This section allows you to manage organization members,
                    invite new users, and assign roles.
                  </p>
                </div>
              </CardContent>
            </TabsContent>

            {/* Permissions Tab */}
            <TabsContent value="permissions">
              <CardHeader>
                <CardTitle>Permissions</CardTitle>
                <CardDescription>
                  Configure role-based access controls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PermissionManagementInterface
                  organizationId={organizationId}
                  organizationName={organizationName}
                />
              </CardContent>
            </TabsContent>

            {/* Other tabs would be implemented similarly */}
            {settingsSections
              .filter(
                (section) =>
                  !["profile", "members", "permissions"].includes(section.id)
              )
              .map((section) => (
                <TabsContent key={section.id} value={section.id}>
                  <CardHeader>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-md">
                      <div className="text-center">
                        {section.icon && (
                          <div className="mx-auto h-12 w-12 text-muted-foreground">
                            {section.icon}
                          </div>
                        )}
                        <h3 className="mt-2 text-lg font-medium">
                          {section.title} Settings
                        </h3>
                        <p className="mt-1 text-muted-foreground">
                          This section is under development
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </TabsContent>
              ))}
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
