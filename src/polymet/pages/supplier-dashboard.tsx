import { useState } from "react";
import { OrganizationSwitcher } from "@/polymet/components/organization-switcher";
import DashboardStatsCard from "@/polymet/components/dashboard-stats-card";
import DashboardActionCard from "@/polymet/components/dashboard-action-card";
import RecentOffersTable from "@/polymet/components/recent-offers-table";
import PerformanceMetricsPreview from "@/polymet/components/performance-metrics-preview";
import { ORGANIZATIONS } from "@/polymet/data/organization-data";
import { Badge } from "@/components/ui/badge";
import {
  BarChartIcon,
  ShoppingCartIcon,
  UsersIcon,
  TagIcon,
  PlusIcon,
  PackageIcon,
  CalendarIcon,
  BellIcon,
} from "lucide-react";
import { useParams } from "react-router-dom";

// Sample data for the dashboard
const mockOffers = [
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
];

export default function SupplierDashboard() {
  const { orgId = "toolbank" } = useParams();
  const [currentOrganizationId, setCurrentOrganizationId] = useState(orgId);
  const [isLoading, setIsLoading] = useState(false);

  // Find the current organization from the mock data
  const currentOrg =
    ORGANIZATIONS.find((org) => org.id === currentOrganizationId) ||
    ORGANIZATIONS[0];

  // Function to simulate loading when switching organizations
  const handleOrganizationChange = (orgId: string) => {
    setIsLoading(true);
    setCurrentOrganizationId(orgId);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Get organization-specific theme color
  const getOrgThemeColor = () => {
    switch (currentOrganizationId) {
      case "toolbank":
        return "primary"; // Red
      case "nmbs":
        return "blue";
      case "ibc":
        return "green";
      case "bmf":
        return "purple";
      default:
        return "primary";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">Supplier Dashboard</h1>
            <Badge variant="outline" className="text-xs">
              Supplier
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Welcome back to your supplier portal
          </p>
        </div>

        <OrganizationSwitcher
          organizations={ORGANIZATIONS}
          currentOrganizationId={currentOrganizationId}
          onOrganizationChange={handleOrganizationChange}
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardStatsCard
          title="Total Offers"
          value="24"
          change={{ value: 12, isPositive: true, label: "vs last month" }}
          icon={<TagIcon className="h-5 w-5" />}
          color={getOrgThemeColor()}
        />

        <DashboardStatsCard
          title="Total Sales"
          value="£24,389"
          change={{ value: 8.5, isPositive: true, label: "vs last month" }}
          icon={<ShoppingCartIcon className="h-5 w-5" />}
          color="green"
        />

        <DashboardStatsCard
          title="Merchant Engagement"
          value="68%"
          change={{ value: 5.2, isPositive: false, label: "vs last month" }}
          icon={<UsersIcon className="h-5 w-5" />}
          color="blue"
        />

        <DashboardStatsCard
          title="Conversion Rate"
          value="3.2%"
          change={{ value: 1.1, isPositive: true, label: "vs last month" }}
          icon={<BarChartIcon className="h-5 w-5" />}
          color="purple"
          onViewAll={() => alert("View all analytics")}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardActionCard
          title="Create New Promotion"
          description="Set up a special offer for your products"
          icon={<PlusIcon className="h-5 w-5" />}
          primaryAction={{
            label: "Create Promotion",
            onClick: () => alert("Create promotion clicked"),
          }}
          secondaryAction={{
            label: "View Templates",
            onClick: () => alert("View templates clicked"),
          }}
          color={getOrgThemeColor()}
        />

        <DashboardActionCard
          title="Manage Products"
          description="Update your product catalog and inventory"
          icon={<PackageIcon className="h-5 w-5" />}
          primaryAction={{
            label: "Manage Products",
            onClick: () => alert("Manage products clicked"),
          }}
          color="blue"
        />

        <DashboardActionCard
          title="Schedule Promotions"
          description="Plan your upcoming promotional campaigns"
          icon={<CalendarIcon className="h-5 w-5" />}
          primaryAction={{
            label: "Schedule",
            onClick: () => alert("Schedule clicked"),
          }}
          color="green"
        />

        <DashboardActionCard
          title="Notifications"
          description={`You have 3 unread notifications`}
          icon={<BellIcon className="h-5 w-5" />}
          primaryAction={{
            label: "View Notifications",
            onClick: () => alert("View notifications clicked"),
          }}
          color="orange"
        />
      </div>

      {/* Recent Offers and Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOffersTable
            offers={mockOffers}
            isLoading={isLoading}
            onViewAll={() => alert("View all offers")}
            onViewOffer={(id) => alert(`View offer ${id}`)}
            onEditOffer={(id) => alert(`Edit offer ${id}`)}
            onDeleteOffer={(id) => alert(`Delete offer ${id}`)}
            onViewAnalytics={(id) => alert(`View analytics for offer ${id}`)}
          />
        </div>

        <div>
          <PerformanceMetricsPreview
            isLoading={isLoading}
            onViewDetails={() => alert("View details clicked")}
          />
        </div>
      </div>
    </div>
  );
}
