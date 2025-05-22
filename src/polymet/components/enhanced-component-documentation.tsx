import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import ComponentAPISection from "@/polymet/components/component-api-section";

// Component API data types
interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: string;
}

interface StateItem {
  name: string;
  type: string;
  initialValue: string;
  description: string;
}

interface ThemeOption {
  name: string;
  description: string;
  properties: string[];
}

interface AccessibilityItem {
  type: string;
  description: string;
  importance: "critical" | "important" | "recommended";
}

interface EventHandler {
  name: string;
  type: string;
  description: string;
  example?: string;
}

interface ComponentAPIData {
  componentName: string;
  description: string;
  props: PropDefinition[];
  state?: StateItem[];
  themeOptions?: ThemeOption[];
  accessibility?: AccessibilityItem[];
  eventHandlers?: EventHandler[];
  codeExample?: string;
  importStatement?: string;
}

// Component data for the documentation
interface ComponentData {
  id: string;
  name: string;
  description: string;
  location: string;
  dependencies: string;
  apiData?: ComponentAPIData;
}

export default function EnhancedComponentDocumentation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Sample component data
  const components: ComponentData[] = [
    {
      id: "text-input",
      name: "text-input",
      location: "components",
      dependencies: "input-base",
      description:
        "A specialized text input component with floating labels, validation states, and icon support.",
      apiData: {
        componentName: "TextInput",
        description:
          "A specialized text input component with floating labels, validation states, and icon support.",
        props: [
          {
            name: "label",
            type: "string",
            required: true,
            description: "The label text displayed above the input",
          },
          {
            name: "value",
            type: "string",
            required: true,
            description: "The current value of the input",
          },
          {
            name: "onChange",
            type: "(e: React.ChangeEvent<HTMLInputElement>) => void",
            required: true,
            description: "Callback fired when the input changes",
          },
          {
            name: "placeholder",
            type: "string",
            required: false,
            defaultValue: "''",
            description: "Placeholder text shown when the input is empty",
          },
          {
            name: "error",
            type: "string",
            required: false,
            description: "Error message to display below the input",
          },
          {
            name: "disabled",
            type: "boolean",
            required: false,
            defaultValue: "false",
            description: "Whether the input is disabled",
          },
          {
            name: "startIcon",
            type: "ReactNode",
            required: false,
            description: "Icon to display at the start of the input",
          },
          {
            name: "endIcon",
            type: "ReactNode",
            required: false,
            description: "Icon to display at the end of the input",
          },
        ],

        state: [
          {
            name: "focused",
            type: "boolean",
            initialValue: "false",
            description: "Tracks whether the input is currently focused",
          },
          {
            name: "touched",
            type: "boolean",
            initialValue: "false",
            description: "Tracks whether the input has been interacted with",
          },
        ],

        themeOptions: [
          {
            name: "Organization Branding",
            description:
              "The component adapts to the organization's branding colors and styles",
            properties: ["primaryColor", "borderRadius", "fontFamily"],
          },
          {
            name: "Error States",
            description: "Visual feedback for validation errors",
            properties: ["errorColor", "errorBorderStyle", "errorTextStyle"],
          },
        ],

        accessibility: [
          {
            type: "ARIA Attributes",
            description:
              "Uses aria-invalid for error states and aria-describedby to connect error messages with inputs",
            importance: "critical",
          },
          {
            type: "Keyboard Navigation",
            description:
              "Fully navigable using Tab key and supports all standard keyboard interactions",
            importance: "important",
          },
        ],

        eventHandlers: [
          {
            name: "onChange",
            type: "(e: React.ChangeEvent<HTMLInputElement>) => void",
            description: "Called when the input value changes",
            example: "onChange={(e) => setValue(e.target.value)}",
          },
          {
            name: "onFocus",
            type: "(e: React.FocusEvent<HTMLInputElement>) => void",
            description: "Called when the input receives focus",
            example: "onFocus={() => setFocused(true)}",
          },
        ],

        importStatement:
          "import { TextInput } from '@/polymet/components/text-input';",
        codeExample: `const [value, setValue] = useState('');
return (
  <TextInput
    label="Username"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Enter username"
  />
);`,
      },
    },
    {
      id: "email-input",
      name: "email-input",
      location: "components",
      dependencies: "input-base",
      description:
        "A specialized email input component with validation and mail icon.",
      apiData: {
        componentName: "EmailInput",
        description:
          "A specialized email input component with validation and mail icon.",
        props: [
          {
            name: "label",
            type: "string",
            required: true,
            description: "The label text displayed above the input",
          },
          {
            name: "value",
            type: "string",
            required: false,
            description: "The current value of the input",
          },
          {
            name: "onChange",
            type: "(e: React.ChangeEvent<HTMLInputElement>) => void",
            required: false,
            description: "Callback fired when the input changes",
          },
          {
            name: "validateOnChange",
            type: "boolean",
            required: false,
            defaultValue: "false",
            description: "Whether to validate the email as the user types",
          },
          {
            name: "validateOnBlur",
            type: "boolean",
            required: false,
            defaultValue: "true",
            description:
              "Whether to validate the email when the input loses focus",
          },
        ],

        state: [
          {
            name: "isValid",
            type: "boolean",
            initialValue: "true",
            description: "Tracks whether the email is valid",
          },
        ],

        accessibility: [
          {
            type: "Input Type",
            description:
              "Uses type='email' for better mobile keyboard support and basic browser validation",
            importance: "important",
          },
        ],

        importStatement:
          "import { EmailInput } from '@/polymet/components/email-input';",
      },
    },
    {
      id: "password-input",
      name: "password-input",
      location: "components",
      dependencies: "input-base",
      description:
        "A specialized password input component with show/hide toggle and strength indicator.",
      apiData: {
        componentName: "PasswordInput",
        description:
          "A specialized password input component with show/hide toggle and strength indicator.",
        props: [
          {
            name: "label",
            type: "string",
            required: true,
            description: "The label text displayed above the input",
          },
          {
            name: "value",
            type: "string",
            required: false,
            description: "The current value of the input",
          },
          {
            name: "onChange",
            type: "(e: React.ChangeEvent<HTMLInputElement>) => void",
            required: false,
            description: "Callback fired when the input changes",
          },
          {
            name: "strengthIndicator",
            type: "boolean",
            required: false,
            defaultValue: "false",
            description: "Whether to show the password strength indicator",
          },
          {
            name: "showToggle",
            type: "boolean",
            required: false,
            defaultValue: "true",
            description: "Whether to show the password visibility toggle",
          },
        ],

        state: [
          {
            name: "visible",
            type: "boolean",
            initialValue: "false",
            description: "Tracks whether the password is visible",
          },
          {
            name: "strength",
            type: "'weak' | 'medium' | 'strong'",
            initialValue: "'weak'",
            description: "The calculated strength of the password",
          },
        ],

        accessibility: [
          {
            type: "Toggle Button",
            description:
              "Password visibility toggle has appropriate aria-label that changes based on current state",
            importance: "critical",
          },
        ],

        importStatement:
          "import { PasswordInput } from '@/polymet/components/password-input';",
      },
    },
  ];

  // Filter components based on search query and active tab
  const filterComponents = () => {
    let filtered = components;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (component) =>
          component.name.toLowerCase().includes(query) ||
          component.description.toLowerCase().includes(query) ||
          component.dependencies.toLowerCase().includes(query)
      );
    }

    if (activeTab !== "all") {
      filtered = filtered.filter((component) => {
        if (activeTab === "form") {
          return [
            "text-input",
            "email-input",
            "password-input",
            "number-input",
            "textarea-input",
            "phone-input",
          ].includes(component.id);
        }
        if (activeTab === "selection") {
          return [
            "select",
            "radio-group",
            "checkbox-group",
            "toggle-switch",
            "segmented-control",
          ].includes(component.id);
        }
        if (activeTab === "date") {
          return [
            "date-picker",
            "time-picker",
            "date-range-picker",
            "date-time-picker",
            "mini-calendar",
            "schedule-builder",
          ].includes(component.id);
        }
        return false;
      });
    }

    return filtered;
  };

  const filteredComponents = filterComponents();

  return (
    <div className="container mx-auto p-6">
      <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-6">
          BuildConnect Component API Documentation
        </h1>
        <p className="text-muted-foreground mb-6">
          Comprehensive API documentation for all components in the BuildConnect
          application, including props, state management, theme customization,
          and accessibility considerations.
        </p>

        <div className="relative w-full max-w-md mb-8">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />

          <Input
            placeholder="Search components, props, or descriptions..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="all">All Components</TabsTrigger>
            <TabsTrigger value="form">Form Components</TabsTrigger>
            <TabsTrigger value="selection">Selection Components</TabsTrigger>
            <TabsTrigger value="date">Date & Time Components</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            {filteredComponents.length === 0 ? (
              <p className="text-muted-foreground">No components found.</p>
            ) : (
              filteredComponents.map((component) => (
                <div
                  key={component.id}
                  className="border rounded-lg p-6 bg-card"
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold">{component.name}</h2>
                    <p className="text-muted-foreground">
                      {component.description}
                    </p>
                    <div className="mt-2">
                      <span className="text-sm font-medium">
                        Dependencies:{" "}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {component.dependencies || "None"}
                      </span>
                    </div>
                  </div>

                  {component.apiData && (
                    <ComponentAPISection componentData={component.apiData} />
                  )}
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="form" className="space-y-8">
            {filteredComponents.length === 0 ? (
              <p className="text-muted-foreground">No form components found.</p>
            ) : (
              filteredComponents.map((component) => (
                <div
                  key={component.id}
                  className="border rounded-lg p-6 bg-card"
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold">{component.name}</h2>
                    <p className="text-muted-foreground">
                      {component.description}
                    </p>
                    <div className="mt-2">
                      <span className="text-sm font-medium">
                        Dependencies:{" "}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {component.dependencies || "None"}
                      </span>
                    </div>
                  </div>

                  {component.apiData && (
                    <ComponentAPISection componentData={component.apiData} />
                  )}
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="selection" className="space-y-8">
            {filteredComponents.length === 0 ? (
              <p className="text-muted-foreground">
                No selection components found.
              </p>
            ) : (
              filteredComponents.map((component) => (
                <div
                  key={component.id}
                  className="border rounded-lg p-6 bg-card"
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold">{component.name}</h2>
                    <p className="text-muted-foreground">
                      {component.description}
                    </p>
                    <div className="mt-2">
                      <span className="text-sm font-medium">
                        Dependencies:{" "}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {component.dependencies || "None"}
                      </span>
                    </div>
                  </div>

                  {component.apiData && (
                    <ComponentAPISection componentData={component.apiData} />
                  )}
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="date" className="space-y-8">
            {filteredComponents.length === 0 ? (
              <p className="text-muted-foreground">
                No date & time components found.
              </p>
            ) : (
              filteredComponents.map((component) => (
                <div
                  key={component.id}
                  className="border rounded-lg p-6 bg-card"
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold">{component.name}</h2>
                    <p className="text-muted-foreground">
                      {component.description}
                    </p>
                    <div className="mt-2">
                      <span className="text-sm font-medium">
                        Dependencies:{" "}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {component.dependencies || "None"}
                      </span>
                    </div>
                  </div>

                  {component.apiData && (
                    <ComponentAPISection componentData={component.apiData} />
                  )}
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
