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

interface OrganizationSettingsDashboardProps {
  organizationId: string;
  organizationName: string;
  organizationLogo?: string;
}

export default function OrganizationSettingsDashboard({
  organizationId,
  organizationName,
  organizationLogo,
}: OrganizationSettingsDashboardProps) {
  const [activeTab, setActiveTab] = useState("general");

  // Sample settings sections
  const settingsSections = [
    {
      id: "general",
      title: "General",
      icon: <SettingsIcon className="h-5 w-5" />,

      description: "Basic organization settings and preferences",
    },
    {
      id: "branding",
      title: "Branding",
      icon: <LayoutIcon className="h-5 w-5" />,

      description: "Customize your organization's appearance",
    },
    {
      id: "members",
      title: "Members",
      icon: <UsersIcon className="h-5 w-5" />,

      description: "Manage organization members and roles",
      badge: "12",
    },
    {
      id: "security",
      title: "Security",
      icon: <LockIcon className="h-5 w-5" />,

      description: "Security settings and access controls",
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
      id: "api",
      title: "API & Integrations",
      icon: <KeyIcon className="h-5 w-5" />,

      description: "Manage API keys and third-party integrations",
    },
  ];

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
          <h1 className="text-3xl font-bold">{organizationName} Settings</h1>
          <p className="text-muted-foreground">
            Manage your organization settings and preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BuildingIcon className="h-5 w-5 text-primary" />

              <span>Settings</span>
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

            {/* General Settings */}
            <TabsContent value="general">
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Basic organization settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">Organization Details</h3>
                  <p className="text-sm text-muted-foreground">
                    Update your organization's basic information
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Organization ID
                    </label>
                    <div className="p-2 bg-muted rounded-md text-sm font-mono">
                      {organizationId}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Created</label>
                    <div className="p-2 bg-muted rounded-md text-sm">
                      January 15, 2023
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">Preferences</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure organization-wide preferences
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Time Zone</h4>
                        <p className="text-xs text-muted-foreground">
                          Current: GMT+1 (British Summer Time)
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Change
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Language</h4>
                        <p className="text-xs text-muted-foreground">
                          Current: English (UK)
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Change
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">Advanced</h3>
                    <p className="text-sm text-muted-foreground">
                      Advanced organization settings
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">
                          Organization Visibility
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Control how your organization appears to others
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-destructive">
                          Delete Organization
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Permanently delete this organization and all its data
                        </p>
                      </div>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Security settings and access controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert variant="destructive">
                  <AlertCircleIcon className="h-4 w-4" />

                  <AlertTitle>Security Alert</AlertTitle>
                  <AlertDescription>
                    Your organization's security settings need attention. Please
                    review the recommendations below.
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">Authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure authentication methods and requirements
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">
                          Two-Factor Authentication
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Require 2FA for all organization members
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">
                          Single Sign-On (SSO)
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Set up SSO with your identity provider
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">Access Control</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage access controls and permissions
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">IP Restrictions</h4>
                        <p className="text-xs text-muted-foreground">
                          Limit access to specific IP addresses
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">
                          Session Settings
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Configure session timeout and security
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">Audit & Compliance</h3>
                    <p className="text-sm text-muted-foreground">
                      Review security logs and compliance settings
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Security Logs</h4>
                        <p className="text-xs text-muted-foreground">
                          View security events and activity logs
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Logs
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">
                          Compliance Settings
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Configure compliance requirements
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </TabsContent>

            {/* Other tabs would be implemented similarly */}
            {settingsSections
              .filter(
                (section) => !["general", "security"].includes(section.id)
              )
              .map((section) => (
                <TabsContent key={section.id} value={section.id}>
                  <CardHeader>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-md">
                      <div className="text-center">
                        <section.icon.type
                          className="mx-auto h-10 w-10 text-muted-foreground"
                          strokeWidth={1.5}
                        />

                        <h3 className="mt-2 text-sm font-medium">
                          {section.title} Settings
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
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
