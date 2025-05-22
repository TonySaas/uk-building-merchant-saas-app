import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export default function ComponentDocumentation() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Component data organized by type
  const layouts = [
    {
      id: "layout-01",
      name: "main-layout",
      location: "layouts",
      dependencies: "header, footer",
      description:
        "Main application layout with header and footer for authenticated pages",
    },
    {
      id: "layout-02",
      name: "auth-layout",
      location: "layouts",
      dependencies: "",
      description:
        "Two-column authentication layout with branding and form sections",
    },
  ];

  const pages = [
    {
      id: "page-01",
      name: "home-page",
      location: "pages",
      dependencies:
        "hero-section, feature-highlights, testimonial-section, user-type-cards, organization-selector, supplier-selector, merchant-selector",
      description:
        "Landing page showcasing the platform's features and selection options",
    },
    {
      id: "page-02",
      name: "login-page",
      location: "pages",
      dependencies: "auth-section, organization-data",
      description: "Authentication page with login and registration forms",
    },
  ];

  const formComponents = [
    {
      id: "form-01",
      name: "input-base",
      location: "components",
      dependencies: "",
      description:
        "Base input component serving as foundation for all input types",
    },
    {
      id: "form-02",
      name: "text-input",
      location: "components",
      dependencies: "input-base",
      description:
        "Specialized text input component with floating labels and validation",
    },
    {
      id: "form-03",
      name: "number-input",
      location: "components",
      dependencies: "input-base",
      description:
        "Number input with increment/decrement controls and validation",
    },
    {
      id: "form-04",
      name: "textarea-input",
      location: "components",
      dependencies: "",
      description: "Multi-line text input with character counting and resizing",
    },
    {
      id: "form-05",
      name: "password-input",
      location: "components",
      dependencies: "input-base",
      description:
        "Password input with show/hide toggle and strength indicator",
    },
    {
      id: "form-06",
      name: "email-input",
      location: "components",
      dependencies: "input-base",
      description: "Email input with validation and mail icon",
    },
    {
      id: "form-07",
      name: "phone-input",
      location: "components",
      dependencies: "input-base",
      description: "Phone input with country code selection and validation",
    },
    {
      id: "form-08",
      name: "input-showcase",
      location: "components",
      dependencies:
        "text-input, number-input, textarea-input, password-input, email-input, phone-input",
      description: "Comprehensive showcase of all input components",
    },
    {
      id: "form-09",
      name: "auth-section",
      location: "components",
      dependencies: "",
      description:
        "Tabbed authentication component with login and registration forms",
    },
  ];

  const selectionComponents = [
    {
      id: "select-01",
      name: "select",
      location: "components",
      dependencies: "",
      description:
        "Comprehensive select component system with basic, searchable, and multi-select variants",
    },
    {
      id: "select-02",
      name: "radio-group",
      location: "components",
      dependencies: "",
      description:
        "Flexible radio group component with horizontal and vertical layouts",
    },
    {
      id: "select-03",
      name: "checkbox-group",
      location: "components",
      dependencies: "",
      description:
        "Checkbox group with select-all functionality and indeterminate states",
    },
    {
      id: "select-04",
      name: "toggle-switch",
      location: "components",
      dependencies: "",
      description:
        "Toggle switch component with labels and group functionality",
    },
    {
      id: "select-05",
      name: "segmented-control",
      location: "components",
      dependencies: "",
      description:
        "Modern segmented control with smooth animations for mutually exclusive options",
    },
    {
      id: "select-06",
      name: "organization-merchant-selector",
      location: "components",
      dependencies: "supplier-data, organization-data",
      description:
        "Specialized selector for organizations, merchants, and suppliers",
    },
    {
      id: "select-07",
      name: "organization-selector",
      location: "components",
      dependencies: "",
      description: "Grid of organization cards for selection",
    },
    {
      id: "select-08",
      name: "merchant-selector",
      location: "components",
      dependencies: "supplier-data",
      description: "Grid of merchant cards for selection",
    },
    {
      id: "select-09",
      name: "supplier-selector",
      location: "components",
      dependencies: "supplier-data",
      description: "Grid of supplier cards for selection",
    },
    {
      id: "select-10",
      name: "category-selector",
      location: "components",
      dependencies: "checkbox-group",
      description: "Hierarchical category selector with nested categories",
    },
  ];

  const dateTimeComponents = [
    {
      id: "date-01",
      name: "date-picker",
      location: "components",
      dependencies: "",
      description: "Calendar interface for date selection",
    },
    {
      id: "date-02",
      name: "time-picker",
      location: "components",
      dependencies: "",
      description: "Time selection with hour and minute precision",
    },
    {
      id: "date-03",
      name: "date-range-picker",
      location: "components",
      dependencies: "date-picker",
      description: "Date range selection with validation",
    },
    {
      id: "date-04",
      name: "date-time-picker",
      location: "components",
      dependencies: "date-picker, time-picker",
      description: "Combined date and time selection interface",
    },
    {
      id: "date-05",
      name: "mini-calendar",
      location: "components",
      dependencies: "",
      description: "Compact calendar for quick date selection",
    },
    {
      id: "date-06",
      name: "relative-date-selector",
      location: "components",
      dependencies: "date-picker, date-range-picker",
      description: "Natural language date selection (Today, Tomorrow, etc.)",
    },
    {
      id: "date-07",
      name: "schedule-builder",
      location: "components",
      dependencies: "date-picker, time-picker",
      description: "Comprehensive schedule builder for recurring events",
    },
  ];

  const uiComponents = [
    {
      id: "ui-01",
      name: "style-guide",
      location: "components",
      dependencies: "",
      description: "Comprehensive documentation of design system elements",
    },
    {
      id: "ui-02",
      name: "user-type-cards",
      location: "components",
      dependencies: "",
      description: "Cards representing different user types with features",
    },
  ];

  const sectionComponents = [
    {
      id: "section-01",
      name: "hero-section",
      location: "components",
      dependencies: "",
      description: "Visually striking hero section with gradient background",
    },
    {
      id: "section-02",
      name: "feature-highlights",
      location: "components",
      dependencies: "",
      description: "Grid of feature cards highlighting platform capabilities",
    },
    {
      id: "section-03",
      name: "testimonial-section",
      location: "components",
      dependencies: "",
      description: "Section displaying user reviews in card-based layout",
    },
  ];

  const navigationComponents = [
    {
      id: "nav-01",
      name: "header",
      location: "components",
      dependencies: "",
      description:
        "Responsive header with navigation links and authentication buttons",
    },
    {
      id: "nav-02",
      name: "footer",
      location: "components",
      dependencies: "",
      description:
        "Comprehensive footer with multiple columns and subscription form",
    },
  ];

  const dataComponents = [
    {
      id: "data-01",
      name: "supplier-data",
      location: "data",
      dependencies: "",
      description: "Mock data for suppliers and merchants",
    },
    {
      id: "data-02",
      name: "organization-data",
      location: "data",
      dependencies: "",
      description:
        "Mock data for organizations, user types, testimonials, and features",
    },
  ];

  const documentationComponents = [
    {
      id: "doc-01",
      name: "component-documentation",
      location: "components",
      dependencies: "",
      description: "Comprehensive documentation for all components",
    },
    {
      id: "doc-02",
      name: "page-documentation",
      location: "components",
      dependencies: "",
      description: "Detailed documentation for all pages",
    },
    {
      id: "doc-03",
      name: "documentation-download",
      location: "components",
      dependencies: "",
      description: "Interface for downloading documentation files",
    },
    {
      id: "doc-04",
      name: "documentation-enhancements",
      location: "components",
      dependencies: "",
      description:
        "Detailed component prop, state, theme, and accessibility documentation",
    },
  ];

  const prototypes = [
    {
      id: "proto-01",
      name: "build-connect-app",
      location: "prototypes",
      dependencies:
        "main-layout, auth-layout, home-page, login-page, documentation-hub",
      description: "Main application prototype with routing structure",
    },
  ];

  // Filter components based on search query
  const filterComponents = (components) => {
    if (!searchQuery) return components;
    return components.filter(
      (component) =>
        component.name.toLowerCase().includes(searchQuery) ||
        component.description.toLowerCase().includes(searchQuery) ||
        component.dependencies.toLowerCase().includes(searchQuery)
    );
  };

  // Render a table of components
  const renderComponentTable = (components) => {
    if (components.length === 0)
      return <p className="text-muted-foreground">No components found.</p>;

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="border p-2 text-left">Component ID</th>
              <th className="border p-2 text-left">Component Name</th>
              <th className="border p-2 text-left">Location</th>
              <th className="border p-2 text-left">Dependencies</th>
              <th className="border p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {components.map((component) => (
              <tr key={component.id}>
                <td className="border p-2">{component.id}</td>
                <td className="border p-2">{component.name}</td>
                <td className="border p-2">{component.location}</td>
                <td className="border p-2">{component.dependencies}</td>
                <td className="border p-2">{component.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-6">
          BuildConnect Component and Page Documentation
        </h1>
        <p className="text-muted-foreground mb-6">
          This document provides a comprehensive overview of all components,
          pages, layouts, and their dependencies in the BuildConnect
          application.
        </p>

        <div className="relative w-full max-w-md mb-8">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />

          <Input
            placeholder="Search components, dependencies, or descriptions..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <Tabs defaultValue="layouts" className="w-full">
          <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-6">
            <TabsTrigger value="layouts">Layouts</TabsTrigger>
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="form">Form</TabsTrigger>
            <TabsTrigger value="selection">Selection</TabsTrigger>
            <TabsTrigger value="datetime">Date & Time</TabsTrigger>
            <TabsTrigger value="ui">UI</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
          </TabsList>

          <TabsContent value="layouts" className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">Layouts</h2>
            {renderComponentTable(filterComponents(layouts))}
          </TabsContent>

          <TabsContent value="pages" className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">Pages</h2>
            {renderComponentTable(filterComponents(pages))}
          </TabsContent>

          <TabsContent value="form" className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">
              Form Components
            </h2>
            {renderComponentTable(filterComponents(formComponents))}
          </TabsContent>

          <TabsContent value="selection" className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">
              Selection Components
            </h2>
            {renderComponentTable(filterComponents(selectionComponents))}
          </TabsContent>

          <TabsContent value="datetime" className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">
              Date and Time Components
            </h2>
            {renderComponentTable(filterComponents(dateTimeComponents))}
          </TabsContent>

          <TabsContent value="ui" className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">UI Components</h2>
            {renderComponentTable(filterComponents(uiComponents))}
          </TabsContent>

          <TabsContent value="sections" className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">
              Section Components
            </h2>
            {renderComponentTable(filterComponents(sectionComponents))}
          </TabsContent>

          <TabsContent value="navigation" className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">
              Navigation Components
            </h2>
            {renderComponentTable(filterComponents(navigationComponents))}
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <h2 className="text-2xl font-bold border-b pb-2">Data Components</h2>
          {renderComponentTable(filterComponents(dataComponents))}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold border-b pb-2">
            Documentation Components
          </h2>
          {renderComponentTable(filterComponents(documentationComponents))}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold border-b pb-2">Prototypes</h2>
          {renderComponentTable(filterComponents(prototypes))}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold border-b pb-2">
            Component Dependency Graph
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>Main Application Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
                {`build-connect-app
├── main-layout
│   ├── header
│   ├── home-page
│   │   ├── hero-section
│   │   ├── feature-highlights
│   │   ├── testimonial-section
│   │   ├── user-type-cards
│   │   ├── organization-selector
│   │   ├── supplier-selector
│   │   └── merchant-selector
│   ├── documentation-hub
│   │   ├── component-documentation
│   │   ├── page-documentation
│   │   ├── documentation-download
│   │   └── documentation-enhancements
│   └── footer
└── auth-layout
    └── login-page
        └── auth-section`}
              </pre>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold border-b pb-2">
            Form Component Hierarchy
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>Input Components</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
                {`input-showcase
├── text-input
│   └── input-base
├── number-input
│   └── input-base
├── textarea-input
├── password-input
│   └── input-base
├── email-input
│   └── input-base
└── phone-input
    └── input-base`}
              </pre>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold border-b pb-2">Usage Guidelines</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Component Naming Conventions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    Use kebab-case for file names (e.g.,{" "}
                    <code>input-base.tsx</code>)
                  </li>
                  <li>
                    Use PascalCase for component names (e.g.,{" "}
                    <code>InputBase</code>)
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Component Organization</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    Components are organized by functionality in the{" "}
                    <code>@/polymet/components</code> directory
                  </li>
                  <li>
                    Layouts are stored in the <code>@/polymet/layouts</code>{" "}
                    directory
                  </li>
                  <li>
                    Pages are stored in the <code>@/polymet/pages</code>{" "}
                    directory
                  </li>
                  <li>
                    Mock data is stored in the <code>@/polymet/data</code>{" "}
                    directory
                  </li>
                  <li>
                    Prototypes are stored in the{" "}
                    <code>@/polymet/prototypes</code> directory
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
