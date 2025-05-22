import { useParams } from "react-router-dom";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher } from "@/polymet/components/organization-switcher";
import { BreadcrumbNav } from "@/polymet/components/breadcrumb-nav";
import DashboardStatsCard from "@/polymet/components/dashboard-stats-card";
import ActionCard from "@/polymet/components/action-card";
import { StatusIndicator } from "@/polymet/components/status-indicator";
import {
  BarChartIcon,
  ShoppingCartIcon,
  UsersIcon,
  TagIcon,
  PackageIcon,
  CalendarIcon,
  TrendingUpIcon,
  BellIcon,
  CheckCircleIcon,
  ClockIcon,
} from "lucide-react";

export default function MerchantDashboard() {
  const { orgId = "toolbank" } = useParams();
  const [currentOrg, setCurrentOrg] = useState(orgId);

  // Mock data for organizations
  const organizations = [
    {
      id: "toolbank",
      name: "Toolbank",
      logo: "https://assets.polymet.ai/legal-white-266853",
    },
    {
      id: "nmbs",
      name: "NMBS",
      logo: "https://assets.polymet.ai/polite-lavender-543133",
    },
    {
      id: "ibc",
      name: "IBC",
      logo: "https://picsum.photos/seed/ibc/200/200",
    },
    {
      id: "bmf",
      name: "BMF",
      logo: "https://picsum.photos/seed/bmf/200/200",
    },
  ];

  // Get current organization details
  const currentOrgDetails =
    organizations.find((org) => org.id === currentOrg) || organizations[0];

  // Organization-specific color mapping
  const orgColors = {
    toolbank: "red",
    nmbs: "blue",
    ibc: "green",
    bmf: "purple",
  };

  // Use organization-specific color for theming
  const orgColor = orgColors[currentOrg as keyof typeof orgColors] || "blue";

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Merchant Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your special offers and track performance
          </p>
        </div>

        <OrganizationSwitcher
          organizations={organizations}
          currentOrganizationId={currentOrg}
          onOrganizationChange={setCurrentOrg}
        />
      </div>

      <BreadcrumbNav
        items={[
          { label: "Home", href: "/" },
          { label: "Merchant Dashboard", href: "/merchant-dashboard" },
          {
            label: currentOrgDetails.name,
            href: `/merchant-dashboard/${currentOrg}`,
          },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <DashboardStatsCard
          title="Active Offers"
          value="12"
          change={{ value: 20, isPositive: true, label: "vs last month" }}
          icon={<TagIcon className="h-5 w-5" />}
          color={orgColor}
        />

        <DashboardStatsCard
          title="Total Sales"
          value="£8,942"
          change={{ value: 8, isPositive: true, label: "vs last month" }}
          icon={<ShoppingCartIcon className="h-5 w-5" />}
          color="green"
        />

        <DashboardStatsCard
          title="Customer Visits"
          value="1,234"
          change={{ value: 5, isPositive: false, label: "vs last month" }}
          icon={<UsersIcon className="h-5 w-5" />}
          color="blue"
        />

        <DashboardStatsCard
          title="Conversion Rate"
          value="3.2%"
          change={{ value: 0.5, isPositive: true, label: "vs last month" }}
          icon={<TrendingUpIcon className="h-5 w-5" />}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <ActionCard
          title="Manage Offers"
          description="View and manage your current special offers"
          icon={<TagIcon className="h-6 w-6" />}
          primaryAction={{
            label: "View Offers",
            onClick: () => console.log("View offers clicked"),
          }}
          secondaryAction={{
            label: "Create New",
            onClick: () => console.log("Create new clicked"),
          }}
          color={orgColor}
        />

        <ActionCard
          title="Inventory Status"
          description="Check stock levels and update inventory"
          icon={<PackageIcon className="h-6 w-6" />}
          primaryAction={{
            label: "View Inventory",
            onClick: () => console.log("View inventory clicked"),
          }}
          color="blue"
        />
      </div>

      <div className="mt-6">
        <Tabs defaultValue="promotions" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="promotions">Promotions</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="promotions" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Active Promotions</span>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      name: "Summer Sale",
                      status: "active",
                      startDate: "Jun 1",
                      endDate: "Aug 31",
                      discount: "15%",
                    },
                    {
                      id: 2,
                      name: "Clearance Items",
                      status: "active",
                      startDate: "Jul 15",
                      endDate: "Jul 31",
                      discount: "25%",
                    },
                    {
                      id: 3,
                      name: "Back to School",
                      status: "scheduled",
                      startDate: "Aug 15",
                      endDate: "Sep 15",
                      discount: "10%",
                    },
                  ].map((promo) => (
                    <div
                      key={promo.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <StatusIndicator
                          status={
                            promo.status === "active"
                              ? "approved"
                              : promo.status === "scheduled"
                                ? "pending"
                                : "neutral"
                          }
                          showIcon
                          size="sm"
                        />

                        <div>
                          <h4 className="font-medium">{promo.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {promo.startDate} - {promo.endDate}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          {promo.discount} OFF
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Recent Orders</span>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "ORD-1234",
                      customer: "John Smith",
                      date: "Jul 24, 2023",
                      status: "completed",
                      total: "£245.99",
                    },
                    {
                      id: "ORD-1235",
                      customer: "Sarah Johnson",
                      date: "Jul 23, 2023",
                      status: "processing",
                      total: "£112.50",
                    },
                    {
                      id: "ORD-1236",
                      customer: "Michael Brown",
                      date: "Jul 22, 2023",
                      status: "completed",
                      total: "£78.25",
                    },
                  ].map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {order.status === "completed" ? (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        ) : (
                          <ClockIcon className="h-5 w-5 text-amber-500" />
                        )}
                        <div>
                          <h4 className="font-medium">
                            {order.id} - {order.customer}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {order.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold">{order.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Performance Overview</span>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg">
                  <div className="text-center">
                    <BarChartIcon className="h-10 w-10 mx-auto text-muted-foreground" />

                    <h3 className="mt-2 font-medium">
                      Analytics Visualization
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Sales and traffic data would be displayed here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  title: "Supplier Meeting",
                  date: "Jul 28, 2023",
                  time: "10:00 AM",
                  type: "meeting",
                },
                {
                  id: 2,
                  title: "Inventory Audit",
                  date: "Jul 30, 2023",
                  time: "2:00 PM",
                  type: "task",
                },
                {
                  id: 3,
                  title: "New Promotion Launch",
                  date: "Aug 1, 2023",
                  time: "9:00 AM",
                  type: "event",
                },
              ].map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  <div className="p-2 bg-muted rounded-md">
                    <CalendarIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {event.date} at {event.time}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  message: "New supplier onboarded",
                  time: "2 hours ago",
                  isRead: false,
                },
                {
                  id: 2,
                  message: "Inventory alert: Low stock on 5 items",
                  time: "5 hours ago",
                  isRead: true,
                },
                {
                  id: 3,
                  message: "Summer promotion performing above target",
                  time: "1 day ago",
                  isRead: true,
                },
              ].map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 p-3 rounded-lg ${
                    notification.isRead ? "bg-background" : "bg-muted"
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      notification.isRead
                        ? "bg-muted text-muted-foreground"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <BellIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm ${
                        notification.isRead ? "" : "font-medium"
                      }`}
                    >
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
