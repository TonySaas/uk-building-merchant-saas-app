import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ORGANIZATIONS } from "@/polymet/data/organization-data";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AlertCircleIcon, CheckCircleIcon, InfoIcon } from "lucide-react";

// Organization theme definitions
const organizationThemes = {
  toolbank: {
    name: "Toolbank",
    primary: "blue-700",
    secondary: "blue-500",
    accent: "amber-500",
    error: "red-500",
    success: "green-500",
    borderRadius: "0.375rem",
    fontFamily: "Inter, sans-serif",
  },
  nmbs: {
    name: "NMBS",
    primary: "indigo-700",
    secondary: "indigo-500",
    accent: "violet-500",
    error: "red-600",
    success: "emerald-500",
    borderRadius: "0.5rem",
    fontFamily: "Inter, sans-serif",
  },
  ibc: {
    name: "IBC",
    primary: "emerald-700",
    secondary: "emerald-500",
    accent: "sky-500",
    error: "rose-600",
    success: "green-600",
    borderRadius: "0.25rem",
    fontFamily: "Inter, sans-serif",
  },
  bmf: {
    name: "BMF",
    primary: "orange-700",
    secondary: "orange-500",
    accent: "amber-500",
    error: "red-500",
    success: "green-600",
    borderRadius: "0.375rem",
    fontFamily: "Inter, sans-serif",
  },
};

// Input states for demonstration
const inputStates = [
  { name: "Default", focused: false, error: false, disabled: false },
  { name: "Focused", focused: true, error: false, disabled: false },
  { name: "Error", focused: false, error: true, disabled: false },
  { name: "Disabled", focused: false, error: false, disabled: true },
];

export default function OrganizationInputTheming() {
  const [activeOrg, setActiveOrg] = useState("toolbank");
  const [darkMode, setDarkMode] = useState(false);
  const organizationTheme = organizationThemes[activeOrg];

  // Example input component with organization theming
  const ThemedInput = ({ state, label, placeholder, value }) => {
    const { focused, error, disabled } = state;

    // Dynamic classes based on organization theme and state
    const inputClasses = `w-full border rounded-md px-3 py-2 transition-all
      ${focused ? `ring-2 ring-${organizationTheme.primary}/30 border-${organizationTheme.primary}` : ""}
      ${error ? `border-${organizationTheme.error} bg-${organizationTheme.error}/10` : ""}
      ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-500" : ""}
      ${!error && !focused ? `border-gray-300 dark:border-gray-700` : ""}
      ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`;

    const labelClasses = `block text-sm font-medium mb-1
      ${error ? `text-${organizationTheme.error}` : "text-gray-700 dark:text-gray-300"}
      ${disabled ? "text-gray-400 dark:text-gray-500" : ""}`;

    const errorMessageClasses = `mt-1 text-sm text-${organizationTheme.error}`;

    return (
      <div className="mb-4">
        <label className={labelClasses}>{label}</label>
        <input
          type="text"
          className={inputClasses}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          readOnly
        />

        {error && <p className={errorMessageClasses}>This field is required</p>}
      </div>
    );
  };

  // Code example for the current organization theme
  const codeExample = `// Organization theme for ${organizationTheme.name}
const ${activeOrg}Theme = {
  primary: "${organizationTheme.primary}",
  secondary: "${organizationTheme.secondary}",
  accent: "${organizationTheme.accent}",
  error: "${organizationTheme.error}",
  success: "${organizationTheme.success}",
  borderRadius: "${organizationTheme.borderRadius}",
  fontFamily: "${organizationTheme.fontFamily}"
};

// Input component with ${organizationTheme.name} theming
const inputClasses = \`border rounded-md px-3 py-2 transition-all
  \${focused ? \`ring-2 ring-${organizationTheme.primary}/30 border-${organizationTheme.primary}\` : ''}
  \${error ? \`border-${organizationTheme.error} bg-${organizationTheme.error}/10\` : ''}
  \${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
  \${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
\`;`;

  return (
    <div className={`container mx-auto p-6 ${darkMode ? "dark" : ""}`}>
      <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none mb-8">
        <h1 className="text-3xl font-bold mb-2">Organization Input Theming</h1>
        <p className="text-muted-foreground">
          Demonstration of how organization themes are applied to input
          components in the BuildConnect application.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1">
          <Card className="dark:bg-gray-900">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Theme Preview</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Dark Mode
                  </span>
                  <button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                      darkMode ? "bg-gray-900" : "bg-gray-200"
                    }`}
                    onClick={() => setDarkMode(!darkMode)}
                  >
                    <span
                      className={`${
                        darkMode
                          ? "translate-x-6 bg-white"
                          : "translate-x-1 bg-white"
                      } inline-block h-4 w-4 transform rounded-full transition-transform`}
                    />
                  </button>
                </div>
              </div>
              <CardDescription>
                Select an organization to preview its input theming
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Select value={activeOrg} onValueChange={setActiveOrg}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select organization" />
                  </SelectTrigger>
                  <SelectContent>
                    {ORGANIZATIONS.map((org) => (
                      <SelectItem key={org.id} value={org.id}>
                        <div className="flex items-center gap-2">
                          <img
                            src={org.logo}
                            alt={`${org.name} logo`}
                            className="h-5 w-5 object-contain"
                          />

                          <span>{org.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div
                className={`rounded-lg p-4 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={
                      ORGANIZATIONS.find((org) => org.id === activeOrg)?.logo
                    }
                    alt={`${organizationTheme.name} logo`}
                    className="h-8 w-8 rounded-md object-contain bg-white p-1"
                  />

                  <div>
                    <h3 className="font-medium">
                      {organizationTheme.name} Theme
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Input component styling
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {inputStates.map((state) => (
                    <div key={state.name} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-normal">
                          {state.name}
                        </Badge>
                        {state.error && (
                          <AlertCircleIcon
                            className={`h-4 w-4 text-${organizationTheme.error}`}
                          />
                        )}
                        {state.disabled && (
                          <InfoIcon className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                      <ThemedInput
                        state={state}
                        label="Input Label"
                        placeholder="Enter text..."
                        value={
                          state.error
                            ? ""
                            : state.disabled
                              ? "Disabled value"
                              : "Input value"
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          <Card className="dark:bg-gray-900">
            <CardHeader>
              <CardTitle>Implementation Details</CardTitle>
              <CardDescription>
                How organization theming is applied to input components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Theme Variables</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-4 w-4 rounded-full bg-${organizationTheme.primary}`}
                      ></div>
                      <span className="text-sm">
                        Primary: {organizationTheme.primary}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-4 w-4 rounded-full bg-${organizationTheme.secondary}`}
                      ></div>
                      <span className="text-sm">
                        Secondary: {organizationTheme.secondary}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-4 w-4 rounded-full bg-${organizationTheme.error}`}
                      ></div>
                      <span className="text-sm">
                        Error: {organizationTheme.error}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-4 w-4 rounded-full bg-${organizationTheme.success}`}
                      ></div>
                      <span className="text-sm">
                        Success: {organizationTheme.success}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">Code Example</h3>
                  <pre className="p-4 rounded-md bg-gray-900 text-gray-100 text-sm overflow-x-auto">
                    <code>{codeExample}</code>
                  </pre>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Implementation Notes
                  </h3>
                  <ul className="space-y-2 list-disc pl-5 text-sm">
                    <li>
                      Organization theme is determined by the user's
                      authentication context
                    </li>
                    <li>
                      Theme variables are applied using CSS variables or
                      Tailwind utility classes
                    </li>
                    <li>
                      Input states (focus, error, disabled) are styled
                      consistently across organizations
                    </li>
                    <li>
                      Dark mode support is maintained regardless of organization
                      theme
                    </li>
                  </ul>
                </div>

                <div className="rounded-md bg-blue-50 dark:bg-blue-900/20 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />

                    <div>
                      <h4 className="font-medium text-blue-800 dark:text-blue-300">
                        Best Practice
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        Use organization context to automatically apply the
                        correct theme to all form components. This ensures
                        consistent branding across the application.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="dark:bg-gray-900">
        <CardHeader>
          <CardTitle>Theme Application Process</CardTitle>
          <CardDescription>
            How organization themes are applied to components in the
            BuildConnect application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-md p-4 dark:border-gray-700">
                <h3 className="font-medium mb-2">1. Theme Detection</h3>
                <p className="text-sm text-muted-foreground">
                  The application detects the organization context from user
                  authentication and loads the appropriate theme variables.
                </p>
              </div>
              <div className="border rounded-md p-4 dark:border-gray-700">
                <h3 className="font-medium mb-2">2. CSS Variable Injection</h3>
                <p className="text-sm text-muted-foreground">
                  Theme variables are injected as CSS variables or applied via
                  Tailwind utility classes to components.
                </p>
              </div>
              <div className="border rounded-md p-4 dark:border-gray-700">
                <h3 className="font-medium mb-2">3. Component Styling</h3>
                <p className="text-sm text-muted-foreground">
                  Components use these variables for styling, ensuring
                  consistent branding across the entire application.
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-4">
                CSS Implementation Example
              </h3>
              <pre className="p-4 rounded-md bg-gray-900 text-gray-100 text-sm overflow-x-auto">
                <code>
                  {`:root {
  /* Base theme variables */
  --primary: 221 83% 53%;
  --primary-foreground: 210 40% 98%;
  --error: 0 84% 60%;
  
  /* Organization-specific overrides */
  .theme-toolbank {
    --primary: 217 91% 60%;
    --error: 0 84% 60%;
    --border-radius: 0.375rem;
  }
  
  .theme-nmbs {
    --primary: 245 79% 52%;
    --error: 0 84% 65%;
    --border-radius: 0.5rem;
  }
}`}
                </code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
