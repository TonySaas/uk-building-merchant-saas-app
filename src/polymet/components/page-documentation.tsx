import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SearchIcon,
  FileTextIcon,
  LayoutIcon,
  ComponentIcon,
} from "lucide-react";

export default function PageDocumentation() {
  const [searchQuery, setSearchQuery] = useState("");

  const pages = [
    {
      id: "page-01",
      name: "Home Page",
      fileName: "home-page",
      route: "/",
      layout: "main-layout",
      purpose: "Landing page showcasing the BuildConnect platform",
      components: [
        "hero-section",
        "feature-highlights",
        "testimonial-section",
        "user-type-cards",
        "organization-selector",
        "supplier-selector",
        "merchant-selector",
      ],
    },
    {
      id: "page-02",
      name: "Login Page",
      fileName: "login-page",
      route: "/login",
      layout: "auth-layout",
      purpose: "Authentication page with login and registration forms",
      components: ["auth-section"],
    },
    {
      id: "page-03",
      name: "Documentation Hub",
      fileName: "documentation-hub",
      route: "/documentation",
      layout: "main-layout",
      purpose: "Central documentation hub for the BuildConnect platform",
      components: [
        "component-documentation",
        "page-documentation",
        "documentation-download",
      ],
    },
  ];

  const layouts = [
    {
      id: "layout-01",
      name: "Main Layout",
      fileName: "main-layout",
      components: ["header", "footer"],
      description: "Standard layout with header and footer for most pages",
    },
    {
      id: "layout-02",
      name: "Auth Layout",
      fileName: "auth-layout",
      components: [],
      description: "Two-column layout for authentication pages",
    },
  ];

  const filteredPages = pages.filter(
    (page) =>
      page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.components.some((component) =>
        component.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">BuildConnect Page Documentation</h1>
        <div className="relative w-64">
          <SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search pages..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="pages" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pages" className="flex items-center gap-2">
            <FileTextIcon className="h-4 w-4" />
            Pages
          </TabsTrigger>
          <TabsTrigger value="layouts" className="flex items-center gap-2">
            <LayoutIcon className="h-4 w-4" />
            Layouts
          </TabsTrigger>
          <TabsTrigger value="routing" className="flex items-center gap-2">
            <ComponentIcon className="h-4 w-4" />
            Routing Structure
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="space-y-4">
          {filteredPages.length > 0 ? (
            filteredPages.map((page) => (
              <Card key={page.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileTextIcon className="h-5 w-5 text-primary" />

                    {page.name}
                  </CardTitle>
                  <CardDescription>
                    <span className="font-medium">Route:</span> {page.route} |{" "}
                    <span className="font-medium">Layout:</span> {page.layout}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Purpose
                      </h3>
                      <p>{page.purpose}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Components Used
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {page.components.map((component) => (
                          <div
                            key={component}
                            className="rounded-full bg-secondary px-3 py-1 text-xs"
                          >
                            {component}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="flex h-[200px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
              <div className="text-muted-foreground">
                No pages found matching "{searchQuery}"
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="layouts" className="space-y-4">
          {layouts.map((layout) => (
            <Card key={layout.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LayoutIcon className="h-5 w-5 text-primary" />

                  {layout.name}
                </CardTitle>
                <CardDescription>File: {layout.fileName}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Description
                    </h3>
                    <p>{layout.description}</p>
                  </div>
                  {layout.components.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Components Used
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {layout.components.map((component) => (
                          <div
                            key={component}
                            className="rounded-full bg-secondary px-3 py-1 text-xs"
                          >
                            {component}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="routing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Routing Structure</CardTitle>
              <CardDescription>
                Overview of how routes are organized in the BuildConnect
                application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Path</TableHead>
                    <TableHead>Page</TableHead>
                    <TableHead>Layout</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">/</TableCell>
                    <TableCell>home-page</TableCell>
                    <TableCell>main-layout</TableCell>
                    <TableCell>Landing page</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">/login</TableCell>
                    <TableCell>login-page</TableCell>
                    <TableCell>auth-layout</TableCell>
                    <TableCell>Authentication page</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      /documentation
                    </TableCell>
                    <TableCell>documentation-hub</TableCell>
                    <TableCell>main-layout</TableCell>
                    <TableCell>Documentation hub</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Route Implementation</h3>
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm">
                    {`import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "@/polymet/layouts/main-layout";
import AuthLayout from "@/polymet/layouts/auth-layout";
import HomePage from "@/polymet/pages/home-page";
import LoginPage from "@/polymet/pages/login-page";
import DocumentationHub from "@/polymet/pages/documentation-hub";

export default function BuildConnectApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
        <Route path="/documentation" element={<MainLayout><DocumentationHub /></MainLayout>} />
      </Routes>
    </Router>
  );
}`}
                  </pre>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium">
                  Future Page Considerations
                </h3>
                <ul className="mt-2 list-disc pl-5 text-muted-foreground">
                  <li>Dashboard page for logged-in users</li>
                  <li>Product catalog page</li>
                  <li>Promotion management page</li>
                  <li>User profile and settings page</li>
                  <li>Analytics and reporting page</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
