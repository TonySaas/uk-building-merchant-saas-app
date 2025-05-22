import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ORGANIZATIONS } from "@/polymet/data/organization-data";
import {
  AlertCircle,
  CheckCircle,
  Code,
  Moon,
  Paintbrush,
  Sun,
} from "lucide-react";

// Theme definitions for each organization
const organizationThemes = {
  toolbank: {
    name: "Toolbank",
    primary: "#E11D48",
    secondary: "#0F172A",
    accent: "#FBBF24",
    error: "#EF4444",
    success: "#10B981",
    borderRadius: "0.25rem",
    fontFamily: "Montserrat, sans-serif",
  },
  nmbs: {
    name: "NMBS",
    primary: "#1E40AF",
    secondary: "#6B7280",
    accent: "#FBBF24",
    error: "#EF4444",
    success: "#10B981",
    borderRadius: "0.5rem",
    fontFamily: "Inter, sans-serif",
  },
  ibc: {
    name: "IBC",
    primary: "#047857",
    secondary: "#1F2937",
    accent: "#7C3AED",
    error: "#EF4444",
    success: "#10B981",
    borderRadius: "0.375rem",
    fontFamily: "Inter, sans-serif",
  },
  bmf: {
    name: "BMF",
    primary: "#4F46E5",
    secondary: "#64748B",
    accent: "#F59E0B",
    error: "#EF4444",
    success: "#10B981",
    borderRadius: "0.5rem",
    fontFamily: "Inter, sans-serif",
  },
};

export default function OrganizationThemeSwitcher() {
  const [activeOrg, setActiveOrg] = useState("toolbank");
  const [darkMode, setDarkMode] = useState(false);
  const [applyGlobally, setApplyGlobally] = useState(false);

  // Apply theme to document root when activeOrg changes or when applyGlobally is toggled
  useEffect(() => {
    if (!applyGlobally) return;

    const theme = organizationThemes[activeOrg];
    const root = document.documentElement;

    // Set CSS variables
    root.style.setProperty("--color-primary", theme.primary);
    root.style.setProperty("--color-secondary", theme.secondary);
    root.style.setProperty("--color-accent", theme.accent);
    root.style.setProperty("--color-error", theme.error);
    root.style.setProperty("--color-success", theme.success);
    root.style.setProperty("--font-family", theme.fontFamily);

    // Apply organization class
    root.classList.remove(
      "theme-toolbank",
      "theme-nmbs",
      "theme-ibc",
      "theme-bmf"
    );
    root.classList.add(`theme-${activeOrg}`);

    return () => {
      // Clean up when component unmounts
      if (applyGlobally) {
        root.classList.remove(
          "theme-toolbank",
          "theme-nmbs",
          "theme-ibc",
          "theme-bmf"
        );
        // Reset CSS variables to default
        root.style.removeProperty("--color-primary");
        root.style.removeProperty("--color-secondary");
        root.style.removeProperty("--color-accent");
        root.style.removeProperty("--color-error");
        root.style.removeProperty("--color-success");
        root.style.removeProperty("--font-family");
      }
    };
  }, [activeOrg, applyGlobally]);

  // Get current theme
  const currentTheme = organizationThemes[activeOrg];

  // Component style based on current theme
  const getThemedStyle = (component) => {
    switch (component) {
      case "button":
        return {
          backgroundColor: currentTheme.primary,
          color: "white",
          borderRadius: currentTheme.borderRadius,
          fontFamily: currentTheme.fontFamily,
        };
      case "input":
        return {
          borderColor: darkMode ? `${currentTheme.secondary}50` : "#e2e8f0",
          borderRadius: currentTheme.borderRadius,
          fontFamily: currentTheme.fontFamily,
        };
      case "card":
        return {
          borderRadius: currentTheme.borderRadius,
          fontFamily: currentTheme.fontFamily,
        };
      case "badge":
        return {
          backgroundColor: currentTheme.accent,
          color: "#000000",
          borderRadius: currentTheme.borderRadius,
          fontFamily: currentTheme.fontFamily,
        };
      default:
        return {};
    }
  };

  return (
    <div className={`container mx-auto p-6 ${darkMode ? "dark" : ""}`}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 dark:text-white">
          Organization Theme Switcher
        </h1>
        <p className="text-muted-foreground dark:text-gray-400">
          Preview and switch between different organization themes in the
          BuildConnect application
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Theme Selector */}
        <Card className="dark:bg-gray-900 border dark:border-gray-800">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="dark:text-white">Theme Selector</CardTitle>
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />

                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                  aria-label="Toggle dark mode"
                />

                <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
            <CardDescription className="dark:text-gray-400">
              Select an organization to preview its theme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ORGANIZATIONS.map((org) => (
                <div
                  key={org.id}
                  className={`flex items-center p-3 rounded-md cursor-pointer transition-colors ${
                    activeOrg === org.id
                      ? "bg-gray-100 dark:bg-gray-800"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                  onClick={() => setActiveOrg(org.id)}
                >
                  <div className="h-10 w-10 rounded-md bg-white flex items-center justify-center overflow-hidden mr-3">
                    <img
                      src={org.logo}
                      alt={`${org.name} logo`}
                      className="h-8 w-8 object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium dark:text-white">{org.name}</h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      {org.description}
                    </p>
                  </div>
                  {activeOrg === org.id && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
              ))}

              <Separator className="my-4" />

              <div className="flex items-center space-x-2">
                <Switch
                  id="apply-globally"
                  checked={applyGlobally}
                  onCheckedChange={setApplyGlobally}
                />

                <Label htmlFor="apply-globally" className="dark:text-white">
                  Apply theme globally
                </Label>
              </div>

              {applyGlobally && (
                <div className="text-sm p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900 rounded-md text-amber-800 dark:text-amber-300 flex items-start">
                  <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />

                  <span>
                    Theme will be applied to the entire application. This is for
                    demonstration purposes only.
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Theme Preview */}
        <Card className="col-span-1 lg:col-span-2 dark:bg-gray-900 border dark:border-gray-800">
          <CardHeader>
            <CardTitle className="dark:text-white">Theme Preview</CardTitle>
            <CardDescription className="dark:text-gray-400">
              See how components look with the {currentTheme.name} theme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="components" className="w-full">
              <TabsList className="mb-4 dark:bg-gray-800">
                <TabsTrigger
                  value="components"
                  className="dark:text-gray-300 dark:data-[state=active]:bg-gray-700"
                >
                  Components
                </TabsTrigger>
                <TabsTrigger
                  value="colors"
                  className="dark:text-gray-300 dark:data-[state=active]:bg-gray-700"
                >
                  Colors
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className="dark:text-gray-300 dark:data-[state=active]:bg-gray-700"
                >
                  Implementation
                </TabsTrigger>
              </TabsList>

              <TabsContent value="components" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Button Examples */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground dark:text-gray-400">
                      Buttons
                    </h3>
                    <div className="space-y-2">
                      <Button
                        style={getThemedStyle("button")}
                        className="w-full"
                      >
                        Primary Button
                      </Button>
                      <Button
                        variant="outline"
                        style={{
                          borderColor: currentTheme.primary,
                          color: currentTheme.primary,
                          borderRadius: currentTheme.borderRadius,
                        }}
                        className="w-full"
                      >
                        Outline Button
                      </Button>
                    </div>
                  </div>

                  {/* Input Examples */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground dark:text-gray-400">
                      Inputs
                    </h3>
                    <div className="space-y-2">
                      <Input
                        placeholder="Default input"
                        style={getThemedStyle("input")}
                        className="w-full dark:bg-gray-800 dark:text-white"
                      />

                      <Input
                        placeholder="Focused input"
                        style={{
                          ...getThemedStyle("input"),
                          borderColor: currentTheme.primary,
                          boxShadow: `0 0 0 1px ${currentTheme.primary}`,
                        }}
                        className="w-full dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Card Example */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground dark:text-gray-400">
                    Card
                  </h3>
                  <Card
                    style={getThemedStyle("card")}
                    className="dark:bg-gray-800"
                  >
                    <CardHeader
                      style={{ backgroundColor: currentTheme.secondary }}
                      className="text-white"
                    >
                      <CardTitle>{currentTheme.name} Card</CardTitle>
                      <CardDescription className="text-gray-200">
                        Card with themed header
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4 dark:text-white">
                      <p>
                        This card demonstrates the {currentTheme.name} theme
                        styling.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                {/* Badge and Alert Examples */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground dark:text-gray-400">
                      Badges
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge style={getThemedStyle("badge")}>
                        Accent Badge
                      </Badge>
                      <Badge
                        variant="outline"
                        style={{
                          borderColor: currentTheme.primary,
                          color: currentTheme.primary,
                          borderRadius: currentTheme.borderRadius,
                        }}
                      >
                        Outline Badge
                      </Badge>
                      <Badge
                        style={{
                          backgroundColor: currentTheme.primary,
                          color: "white",
                          borderRadius: currentTheme.borderRadius,
                        }}
                      >
                        Primary Badge
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground dark:text-gray-400">
                      Alerts
                    </h3>
                    <div
                      style={{
                        borderColor: currentTheme.success,
                        borderRadius: currentTheme.borderRadius,
                      }}
                      className="p-3 border bg-green-50 dark:bg-green-900/20 flex items-center"
                    >
                      <CheckCircle
                        className="h-4 w-4 mr-2"
                        style={{ color: currentTheme.success }}
                      />

                      <span
                        style={{ color: currentTheme.success }}
                        className="text-sm dark:text-green-300"
                      >
                        Success message with themed styling
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="colors" className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(currentTheme)
                    .filter(
                      ([key]) =>
                        key !== "name" &&
                        key !== "fontFamily" &&
                        key !== "borderRadius"
                    )
                    .map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <div
                          className="h-20 rounded-md flex items-end p-2"
                          style={{ backgroundColor: value }}
                        >
                          <span className="text-xs font-mono bg-white/80 dark:bg-black/50 px-2 py-1 rounded text-black dark:text-white">
                            {value}
                          </span>
                        </div>
                        <p className="text-sm font-medium capitalize dark:text-white">
                          {key}
                        </p>
                      </div>
                    ))}
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="text-sm font-medium dark:text-white">
                    Other Properties
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-md dark:border-gray-700">
                      <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">
                        Border Radius
                      </p>
                      <p className="text-lg dark:text-white">
                        {currentTheme.borderRadius}
                      </p>
                    </div>
                    <div className="p-4 border rounded-md dark:border-gray-700">
                      <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">
                        Font Family
                      </p>
                      <p className="text-lg dark:text-white">
                        {currentTheme.fontFamily}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="code" className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-muted-foreground dark:text-gray-400" />

                    <h3 className="font-medium dark:text-white">
                      Implementation Example
                    </h3>
                  </div>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                    <pre className="text-sm">
                      {`// Theme definition
const ${activeOrg}Theme = {
  primary: "${currentTheme.primary}",
  secondary: "${currentTheme.secondary}",
  accent: "${currentTheme.accent}",
  error: "${currentTheme.error}",
  success: "${currentTheme.success}",
  borderRadius: "${currentTheme.borderRadius}",
  fontFamily: "${currentTheme.fontFamily}"
};

// Apply theme to document root
useEffect(() => {
  const root = document.documentElement;
  
  // Set CSS variables
  root.style.setProperty('--color-primary', theme.primary);
  root.style.setProperty('--color-secondary', theme.secondary);
  root.style.setProperty('--color-accent', theme.accent);
  
  // Apply organization class
  root.classList.add(\`theme-${activeOrg}\`);
}, []);`}
                    </pre>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-medium dark:text-white">
                    CSS Usage Example
                  </h3>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                    <pre className="text-sm">
                      {`:root {
  --color-primary: ${currentTheme.primary};
  --color-secondary: ${currentTheme.secondary};
  --color-accent: ${currentTheme.accent};
}

.button-primary {
  background-color: var(--color-primary);
  color: white;
  border-radius: ${currentTheme.borderRadius};
  font-family: ${currentTheme.fontFamily};
}

/* Organization-specific overrides */
.theme-${activeOrg} .special-element {
  /* Special styling for ${currentTheme.name} */
}`}
                    </pre>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-md">
                  <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                    <Paintbrush className="h-4 w-4" />
                    Implementation Notes
                  </h3>
                  <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1 list-disc pl-5">
                    <li>
                      Use CSS variables for theme properties to easily switch
                      between themes
                    </li>
                    <li>
                      Apply organization-specific class to the document root for
                      broader styling
                    </li>
                    <li>
                      Consider using a context provider to make theme available
                      throughout the app
                    </li>
                    <li>
                      Support both light and dark mode variants of each
                      organization theme
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
