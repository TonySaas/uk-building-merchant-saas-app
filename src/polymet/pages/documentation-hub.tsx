import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  SearchIcon,
  BookIcon,
  ComponentIcon,
  FileTextIcon,
  DownloadIcon,
  CodeIcon,
} from "lucide-react";
import ComponentDocumentation from "@/polymet/components/component-documentation";
import PageDocumentation from "@/polymet/components/page-documentation";
import DocumentationDownload from "@/polymet/components/documentation-download";
import DocumentationEnhancements from "@/polymet/components/documentation-enhancements";

export default function DocumentationHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data for component enhancements
  const buttonProps = [
    {
      name: "variant",
      type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
      required: false,
      defaultValue: "'default'",
      description: "Controls the visual style of the button",
    },
    {
      name: "size",
      type: "'default' | 'sm' | 'lg' | 'icon'",
      required: false,
      defaultValue: "'default'",
      description: "Controls the size of the button",
    },
    {
      name: "asChild",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description:
        "When true, the component will render its child as the root element",
    },
  ];

  const buttonState = [
    {
      name: "isLoading",
      type: "boolean",
      initialValue: "false",
      description: "Controls the loading state of the button",
    },
  ];

  const buttonThemes = [
    {
      name: "Custom Brand Colors",
      description:
        "Button colors can be customized to match your organization's brand",
      properties: [
        "backgroundColor",
        "textColor",
        "hoverColor",
        "focusRingColor",
      ],
    },
  ];

  const buttonAccessibility = [
    {
      type: "keyboard",
      description:
        "Buttons are focusable and can be activated with Enter or Space keys",
      importance: "critical",
    },
    {
      type: "aria",
      description:
        "Use aria-disabled instead of the disabled attribute when you want to keep the button focusable",
      importance: "important",
    },
  ];

  // Sample data for input component enhancements
  const inputProps = [
    {
      name: "value",
      type: "string",
      required: false,
      description: "The controlled value of the input",
    },
    {
      name: "defaultValue",
      type: "string",
      required: false,
      description: "The default value of the input",
    },
    {
      name: "placeholder",
      type: "string",
      required: false,
      description: "Placeholder text when the input is empty",
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Whether the input is disabled",
    },
    {
      name: "required",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Whether the input is required",
    },
  ];

  const inputState = [
    {
      name: "isFocused",
      type: "boolean",
      initialValue: "false",
      description: "Tracks whether the input is currently focused",
    },
    {
      name: "isDirty",
      type: "boolean",
      initialValue: "false",
      description: "Tracks whether the input value has been changed",
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">BuildConnect Documentation Hub</h1>
        <p className="text-muted-foreground">
          Comprehensive documentation for the BuildConnect application
          components, pages, and implementation guidelines
        </p>

        <div className="relative w-full max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search documentation..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BookIcon className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="components" className="flex items-center gap-2">
            <ComponentIcon className="h-4 w-4" />
            Components
          </TabsTrigger>
          <TabsTrigger value="pages" className="flex items-center gap-2">
            <FileTextIcon className="h-4 w-4" />
            Pages
          </TabsTrigger>
          <TabsTrigger value="downloads" className="flex items-center gap-2">
            <DownloadIcon className="h-4 w-4" />
            Downloads
          </TabsTrigger>
          <TabsTrigger value="enhancements" className="flex items-center gap-2">
            <CodeIcon className="h-4 w-4" />
            Enhancements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Introduction to the BuildConnect documentation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  Welcome to BuildConnect
                </h3>
                <p className="text-muted-foreground">
                  BuildConnect is a comprehensive platform connecting the UK
                  Building Merchant ecosystem. This documentation provides
                  detailed information about all components, pages, and
                  implementation guidelines.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <ComponentIcon className="h-4 w-4" />
                      Component Library
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Browse our extensive component library with detailed usage
                    examples and prop documentation.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileTextIcon className="h-4 w-4" />
                      Page Templates
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Explore pre-built page templates and understand their
                    structure and component composition.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <CodeIcon className="h-4 w-4" />
                      Implementation Guide
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Learn best practices for implementing components and pages
                    in your BuildConnect application.
                  </CardContent>
                </Card>
              </div>

              <div className="rounded-md bg-muted p-4">
                <h3 className="text-lg font-medium mb-2">
                  Code Example: Basic Component Usage
                </h3>
                <pre className="overflow-x-auto rounded-md bg-secondary p-4 text-sm">
                  {`import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExampleComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is an example of how to use BuildConnect components.</p>
        <Button className="mt-4">Click Me</Button>
      </CardContent>
    </Card>
  );
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components">
          <ComponentDocumentation />
        </TabsContent>

        <TabsContent value="pages">
          <PageDocumentation />
        </TabsContent>

        <TabsContent value="downloads">
          <DocumentationDownload />
        </TabsContent>

        <TabsContent value="enhancements" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Component Enhancements</CardTitle>
              <CardDescription>
                Additional documentation for component implementation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <DocumentationEnhancements
                  componentName="Button"
                  propDefinitions={buttonProps}
                  stateDefinitions={buttonState}
                  themeVariations={buttonThemes}
                  accessibilityNotes={buttonAccessibility}
                />

                <DocumentationEnhancements
                  componentName="Input"
                  propDefinitions={inputProps}
                  stateDefinitions={inputState}
                  themeVariations={[
                    {
                      name: "Input Styling",
                      description:
                        "Input components can be styled to match your organization's design system",
                      properties: [
                        "borderColor",
                        "borderRadius",
                        "backgroundColor",
                        "focusRingColor",
                      ],
                    },
                  ]}
                  accessibilityNotes={[
                    {
                      type: "screen-reader",
                      description:
                        "Ensure inputs have associated labels with proper for/id relationships",
                      importance: "critical",
                    },
                    {
                      type: "aria",
                      description:
                        "Use aria-invalid and aria-describedby for error states",
                      importance: "important",
                    },
                  ]}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Implementation Best Practices</CardTitle>
              <CardDescription>
                Guidelines for implementing components and pages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  State Management Patterns
                </h3>
                <div className="rounded-md bg-muted p-4">
                  <pre className="overflow-x-auto text-sm">
                    {`// Example of component with local state
import { useState, useEffect } from "react";

export function ProductSelector({ onSelect }) {
  // Local state for UI concerns
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products based on search query
  useEffect(() => {
    async function fetchProducts() {
      if (!searchQuery) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(\`/api/products?q=\${searchQuery}\`);
        if (!response.ok) throw new Error("Failed to fetch products");
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    
    const debounce = setTimeout(fetchProducts, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  // Rest of component implementation...
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  Theme Customization
                </h3>
                <p className="text-muted-foreground mb-4">
                  BuildConnect components can be customized to match your
                  organization's branding by modifying the Tailwind CSS
                  configuration:
                </p>
                <div className="rounded-md bg-muted p-4">
                  <pre className="overflow-x-auto text-sm">
                    {`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Override primary colors with your brand colors
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // Add organization-specific colors
        brand: {
          blue: "#0056b3",
          orange: "#ff7700",
          green: "#28a745",
        },
      },
      // Custom border radius to match your design system
      borderRadius: {
        lg: "0.625rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
    },
  },
};`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  Accessibility Implementation
                </h3>
                <p className="text-muted-foreground mb-4">
                  Ensure your components are accessible by following these
                  guidelines:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>
                    Use semantic HTML elements appropriate for their purpose
                  </li>
                  <li>
                    Ensure all interactive elements can be operated with
                    keyboard
                  </li>
                  <li>
                    Provide text alternatives for non-text content (images,
                    icons)
                  </li>
                  <li>Use ARIA attributes only when necessary and correctly</li>
                  <li>
                    Ensure sufficient color contrast for text and important UI
                    elements
                  </li>
                  <li>Test with screen readers and keyboard-only navigation</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
