import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  SearchIcon,
  PlusIcon,
  FilterIcon,
  GridIcon,
  ListIcon,
  PackageIcon,
  BarChartIcon,
  GlobeIcon,
  TagIcon,
} from "lucide-react";
import { DataTable } from "@/polymet/components/data-table";
import { ViewToggle } from "@/polymet/components/view-toggle";
import { OrganizationSwitcher } from "@/polymet/components/organization-switcher";
import { BreadcrumbNav } from "@/polymet/components/breadcrumb-nav";

// Mock data for products
const mockProducts = [
  {
    id: "1",
    name: "DeWalt 18V XR Brushless Combi Drill",
    category: "Power Tools",
    price: 149.99,
    stock: 24,
    status: "active",
    createdAt: "2023-04-12T09:00:00",
    organization: "Toolbank",
  },
  {
    id: "2",
    name: "Stanley Hammer Set",
    category: "Hand Tools",
    price: 39.99,
    stock: 42,
    status: "active",
    createdAt: "2023-04-10T14:30:00",
    organization: "NMBS",
  },
  {
    id: "3",
    name: "Bosch Circular Saw",
    category: "Power Tools",
    price: 129.99,
    stock: 8,
    status: "low_stock",
    createdAt: "2023-04-08T11:15:00",
    organization: "IBC",
  },
  {
    id: "4",
    name: "Makita Drill Bits",
    category: "Accessories",
    price: 24.99,
    stock: 0,
    status: "out_of_stock",
    createdAt: "2023-04-05T16:45:00",
    organization: "Toolbank",
  },
  {
    id: "5",
    name: "Milwaukee Tool Set",
    category: "Hand Tools",
    price: 199.99,
    stock: 15,
    status: "active",
    createdAt: "2023-04-03T10:20:00",
    organization: "BMF",
  },
];

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

// Table columns configuration
const columns = [
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div>£{row.getValue("price").toFixed(2)}</div>,
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => {
      const stock = row.getValue("stock");
      return (
        <div
          className={
            stock === 0 ? "text-red-500" : stock < 10 ? "text-amber-500" : ""
          }
        >
          {stock}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge
          variant={
            status === "active"
              ? "default"
              : status === "low_stock"
                ? "warning"
                : "destructive"
          }
        >
          {status === "active"
            ? "Active"
            : status === "low_stock"
              ? "Low Stock"
              : "Out of Stock"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "organization",
    header: "Organization",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="sm">
            Edit
          </Button>
          <Button variant="ghost" size="sm">
            View
          </Button>
        </div>
      );
    },
  },
];

export default function ProductManagement() {
  const { orgId = "all" } = useParams();
  const [view, setView] = useState("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentOrg, setCurrentOrg] = useState(orgId);

  // Filter products based on search query and selected organization
  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOrg =
      currentOrg === "all" ||
      product.organization.toLowerCase() === currentOrg.toLowerCase();
    return matchesSearch && matchesOrg;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header with breadcrumb */}
      <div className="mb-8">
        <BreadcrumbNav
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
          ]}
        />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Product Management</h1>
            <p className="text-muted-foreground">
              Manage your product catalog and inventory
            </p>
          </div>
          <OrganizationSwitcher
            organizations={organizations}
            currentOrganizationId={currentOrg}
            onOrganizationChange={setCurrentOrg}
          />
        </div>
      </div>

      {/* Main content tabs */}
      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <PackageIcon className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChartIcon className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="distribution" className="flex items-center gap-2">
            <GlobeIcon className="h-4 w-4" />
            Distribution
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <TagIcon className="h-4 w-4" />
            Categories
          </TabsTrigger>
        </TabsList>

        {/* Products Tab Content */}
        <TabsContent value="products" className="space-y-4">
          {/* Action bar with search, filter, and view toggle */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-1 gap-4 max-w-md">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <FilterIcon className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <ViewToggle
                view={view}
                onChange={setView}
                availableViews={["table", "grid", "list"]}
              />

              <Button className="ml-auto md:ml-0">
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>

          {/* Product filters */}
          <div className="flex flex-wrap gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="power-tools">Power Tools</SelectItem>
                <SelectItem value="hand-tools">Hand Tools</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="low_stock">Low Stock</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products list/grid/table view */}
          <div className="mt-6">
            {view === "table" ? (
              <DataTable
                columns={columns}
                data={filteredProducts}
                searchColumn="name"
              />
            ) : view === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription>{product.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="font-bold">
                          £{product.price.toFixed(2)}
                        </div>
                        <Badge
                          variant={
                            product.status === "active"
                              ? "default"
                              : product.status === "low_stock"
                                ? "warning"
                                : "destructive"
                          }
                        >
                          {product.status === "active"
                            ? "Active"
                            : product.status === "low_stock"
                              ? "Low Stock"
                              : "Out of Stock"}
                        </Badge>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        Stock: {product.stock} • {product.organization}
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button size="sm">View</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredProducts.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <div className="text-sm text-muted-foreground">
                          {product.category} • £{product.price.toFixed(2)} •
                          Stock: {product.stock}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            product.status === "active"
                              ? "default"
                              : product.status === "low_stock"
                                ? "warning"
                                : "destructive"
                          }
                        >
                          {product.status === "active"
                            ? "Active"
                            : product.status === "low_stock"
                              ? "Low Stock"
                              : "Out of Stock"}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Analytics Tab Content */}
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance Analytics</CardTitle>
              <CardDescription>
                View detailed analytics about your product performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-dashed rounded-md">
                <p className="text-muted-foreground">
                  Product analytics charts will be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Distribution Tab Content */}
        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>Organization Distribution Settings</CardTitle>
              <CardDescription>
                Manage how your products are distributed across organizations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-dashed rounded-md">
                <p className="text-muted-foreground">
                  Organization distribution settings will be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Tab Content */}
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Category Management</CardTitle>
              <CardDescription>
                Create and manage product categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-dashed rounded-md">
                <p className="text-muted-foreground">
                  Category management interface will be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
