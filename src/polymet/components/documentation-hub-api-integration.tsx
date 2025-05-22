import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpenIcon,
  CodeIcon,
  DownloadIcon,
  FileTextIcon,
  LayoutIcon,
  SearchIcon,
} from "lucide-react";
import ComponentDocumentation from "@/polymet/components/component-documentation";
import PageDocumentation from "@/polymet/components/page-documentation";
import DocumentationDownload from "@/polymet/components/documentation-download";
import EnhancedComponentDocumentation from "@/polymet/components/enhanced-component-documentation";
import OrganizationTheming from "@/polymet/components/organization-theming";

export default function DocumentationHubAPIIntegration() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight">
          BuildConnect Documentation Hub
        </h1>
        <p className="text-muted-foreground">
          Comprehensive documentation for the BuildConnect application
        </p>
      </div>

      <div className="mb-8 flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

          <Input
            type="search"
            placeholder="Search documentation..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BookOpenIcon className="h-4 w-4" />

            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="components" className="flex items-center gap-2">
            <CodeIcon className="h-4 w-4" />

            <span className="hidden sm:inline">Components</span>
          </TabsTrigger>
          <TabsTrigger value="pages" className="flex items-center gap-2">
            <FileTextIcon className="h-4 w-4" />

            <span className="hidden sm:inline">Pages</span>
          </TabsTrigger>
          <TabsTrigger value="downloads" className="flex items-center gap-2">
            <DownloadIcon className="h-4 w-4" />

            <span className="hidden sm:inline">Downloads</span>
          </TabsTrigger>
          <TabsTrigger
            value="component-api"
            className="flex items-center gap-2"
          >
            <LayoutIcon className="h-4 w-4" />

            <span className="hidden sm:inline">Component API</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>
                  Learn the basics of the BuildConnect application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    BuildConnect is a unified platform bringing together
                    suppliers, merchants, and consumers in the UK building
                    merchant ecosystem.
                  </p>
                  <div className="rounded-md bg-muted p-4">
                    <pre className="text-sm">
                      <code>
                        {`// Example component usage
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  return (
    <form className="space-y-4">
      <Input placeholder="Email" type="email" />
      <Input placeholder="Password" type="password" />
      <Button type="submit">Sign In</Button>
    </form>
  );
}`}
                      </code>
                    </pre>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" asChild>
                      <Link to="/documentation">View Full Documentation</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Design System</CardTitle>
                <CardDescription>
                  Explore the BuildConnect design system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    The BuildConnect design system provides a consistent set of
                    components, patterns, and guidelines for building user
                    interfaces.
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex h-16 items-center justify-center rounded-md bg-primary text-primary-foreground">
                      Primary
                    </div>
                    <div className="flex h-16 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                      Secondary
                    </div>
                    <div className="flex h-16 items-center justify-center rounded-md bg-accent text-accent-foreground">
                      Accent
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline">View Style Guide</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Organization Theming</CardTitle>
                <CardDescription>
                  Multi-organization architecture with unique branding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    BuildConnect supports multiple organizations (Toolbank,
                    NMBS, IBC, BMF) with unique branding while maintaining a
                    consistent user experience.
                  </p>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="flex flex-col items-center rounded-md border p-4">
                      <div className="h-8 w-8 rounded-full bg-blue-700"></div>
                      <span className="mt-2 text-sm font-medium">Toolbank</span>
                    </div>
                    <div className="flex flex-col items-center rounded-md border p-4">
                      <div className="h-8 w-8 rounded-full bg-indigo-700"></div>
                      <span className="mt-2 text-sm font-medium">NMBS</span>
                    </div>
                    <div className="flex flex-col items-center rounded-md border p-4">
                      <div className="h-8 w-8 rounded-full bg-emerald-700"></div>
                      <span className="mt-2 text-sm font-medium">IBC</span>
                    </div>
                    <div className="flex flex-col items-center rounded-md border p-4">
                      <div className="h-8 w-8 rounded-full bg-orange-700"></div>
                      <span className="mt-2 text-sm font-medium">BMF</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline">View Theming Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
                <CardDescription>
                  Jump to key documentation sections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  <Button variant="outline" className="justify-start" asChild>
                    <Link to="/documentation/api">Component API</Link>
                  </Button>
                  <Button variant="outline" className="justify-start">
                    Form Components
                  </Button>
                  <Button variant="outline" className="justify-start">
                    Authentication
                  </Button>
                  <Button variant="outline" className="justify-start">
                    Data Fetching
                  </Button>
                  <Button variant="outline" className="justify-start">
                    Routing
                  </Button>
                  <Button variant="outline" className="justify-start">
                    State Management
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="components" className="mt-6">
          <ComponentDocumentation />
        </TabsContent>

        <TabsContent value="pages" className="mt-6">
          <PageDocumentation />
        </TabsContent>

        <TabsContent value="downloads" className="mt-6">
          <DocumentationDownload />
        </TabsContent>

        <TabsContent value="component-api" className="mt-6">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Component API Documentation</CardTitle>
                <CardDescription>
                  Detailed API documentation for BuildConnect components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  This section provides comprehensive API documentation for all
                  components in the BuildConnect application. Each component's
                  documentation includes props, state management, theme
                  customization options, and accessibility considerations.
                </p>
              </CardContent>
            </Card>

            <EnhancedComponentDocumentation />

            <Card>
              <CardHeader>
                <CardTitle>Organization Theming System</CardTitle>
                <CardDescription>
                  How multi-organization architecture affects component visual
                  design
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <OrganizationTheming />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
