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
import { ORGANIZATIONS } from "@/polymet/data/organization-data";

export default function OrganizationTheming() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-extrabold tracking-tight">
        Organization Theming System
      </h1>
      <p className="mb-8 text-lg text-muted-foreground">
        BuildConnect supports multiple organizations (Toolbank, NMBS, IBC, BMF)
        with unique branding while maintaining a consistent user experience.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Theme Structure */}
        <Card>
          <CardHeader>
            <CardTitle>Theme Structure</CardTitle>
            <CardDescription>
              Each organization has unique theme properties
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></div>
                <div>
                  <span className="font-medium">Primary color:</span> Main brand
                  color used for primary buttons, active states, and key UI
                  elements
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></div>
                <div>
                  <span className="font-medium">Secondary color:</span>{" "}
                  Complementary color used for secondary elements and accents
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></div>
                <div>
                  <span className="font-medium">Accent color:</span> Used for
                  highlighting important information or calls to action
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></div>
                <div>
                  <span className="font-medium">Logo:</span> Organization logo
                  in various formats (full, icon-only, light/dark variants)
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></div>
                <div>
                  <span className="font-medium">Typography preferences:</span>{" "}
                  Font family, weights, and sizes
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></div>
                <div>
                  <span className="font-medium">Border radius preference:</span>{" "}
                  Consistent corner rounding across all components
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Theme Application */}
        <Card>
          <CardHeader>
            <CardTitle>Theme Application in Components</CardTitle>
            <CardDescription>
              Components detect the current organization context
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></div>
                <div>
                  <span className="font-medium">Button colors:</span> Primary,
                  secondary, and accent buttons reflect organization colors
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></div>
                <div>
                  <span className="font-medium">Input focus states:</span> Form
                  controls use organization primary color for focus indicators
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></div>
                <div>
                  <span className="font-medium">Card headers:</span> Cards may
                  use organization colors for headers or borders
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></div>
                <div>
                  <span className="font-medium">Navigation elements:</span>{" "}
                  Active states in navigation use organization colors
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></div>
                <div>
                  <span className="font-medium">Progress indicators:</span>{" "}
                  Loading spinners and progress bars use organization colors
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></div>
                <div>
                  <span className="font-medium">Selection states:</span>{" "}
                  Checkboxes, radio buttons, and toggles reflect organization
                  colors
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Organization Preview */}
      <h2 className="mb-6 mt-12 text-2xl font-bold">
        Organization Theme Preview
      </h2>

      <Tabs defaultValue="toolbank" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-2 md:grid-cols-4">
          {ORGANIZATIONS.map((org) => (
            <TabsTrigger key={org.id} value={org.id}>
              {org.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {ORGANIZATIONS.map((org) => (
          <TabsContent key={org.id} value={org.id}>
            <Card>
              <CardHeader
                className={`${
                  org.id === "toolbank"
                    ? "bg-blue-900 text-white"
                    : org.id === "nmbs"
                      ? "bg-indigo-900 text-white"
                      : org.id === "ibc"
                        ? "bg-emerald-900 text-white"
                        : "bg-orange-900 text-white"
                }`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={org.logo}
                    alt={`${org.name} logo`}
                    className="h-12 w-12 rounded-md bg-white object-contain p-1"
                  />

                  <div>
                    <CardTitle>{org.name} Theme</CardTitle>
                    <CardDescription
                      className={`${
                        org.id === "toolbank" ||
                        org.id === "nmbs" ||
                        org.id === "ibc" ||
                        org.id === "bmf"
                          ? "text-gray-200"
                          : ""
                      }`}
                    >
                      {org.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-medium">Component Examples</h3>

                <div className="space-y-8">
                  {/* Buttons */}
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                      Buttons
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      <Button
                        className={`${
                          org.id === "toolbank"
                            ? "bg-blue-700 hover:bg-blue-800"
                            : org.id === "nmbs"
                              ? "bg-indigo-700 hover:bg-indigo-800"
                              : org.id === "ibc"
                                ? "bg-emerald-700 hover:bg-emerald-800"
                                : "bg-orange-700 hover:bg-orange-800"
                        }`}
                      >
                        Primary Button
                      </Button>
                      <Button
                        variant="outline"
                        className={`border-2 ${
                          org.id === "toolbank"
                            ? "border-blue-700 text-blue-700 hover:bg-blue-50 hover:text-blue-800 dark:hover:bg-blue-950"
                            : org.id === "nmbs"
                              ? "border-indigo-700 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 dark:hover:bg-indigo-950"
                              : org.id === "ibc"
                                ? "border-emerald-700 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 dark:hover:bg-emerald-950"
                                : "border-orange-700 text-orange-700 hover:bg-orange-50 hover:text-orange-800 dark:hover:bg-orange-950"
                        }`}
                      >
                        Secondary Button
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Form Elements */}
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                      Form Elements
                    </h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          htmlFor={`input-${org.id}`}
                          className="text-sm font-medium"
                        >
                          Input Field
                        </label>
                        <Input
                          id={`input-${org.id}`}
                          placeholder="Enter text..."
                          className={`focus-visible:ring-2 ${
                            org.id === "toolbank"
                              ? "focus-visible:ring-blue-700"
                              : org.id === "nmbs"
                                ? "focus-visible:ring-indigo-700"
                                : org.id === "ibc"
                                  ? "focus-visible:ring-emerald-700"
                                  : "focus-visible:ring-orange-700"
                          }`}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Selection State
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`checkbox-${org.id}`}
                            className={`h-4 w-4 rounded border-gray-300 ${
                              org.id === "toolbank"
                                ? "text-blue-700 focus:ring-blue-700"
                                : org.id === "nmbs"
                                  ? "text-indigo-700 focus:ring-indigo-700"
                                  : org.id === "ibc"
                                    ? "text-emerald-700 focus:ring-emerald-700"
                                    : "text-orange-700 focus:ring-orange-700"
                            }`}
                          />

                          <label
                            htmlFor={`checkbox-${org.id}`}
                            className="text-sm"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Badges and Indicators */}
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                      Badges and Indicators
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        className={`${
                          org.id === "toolbank"
                            ? "bg-blue-700"
                            : org.id === "nmbs"
                              ? "bg-indigo-700"
                              : org.id === "ibc"
                                ? "bg-emerald-700"
                                : "bg-orange-700"
                        }`}
                      >
                        New
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`${
                          org.id === "toolbank"
                            ? "border-blue-700 text-blue-700"
                            : org.id === "nmbs"
                              ? "border-indigo-700 text-indigo-700"
                              : org.id === "ibc"
                                ? "border-emerald-700 text-emerald-700"
                                : "border-orange-700 text-orange-700"
                        }`}
                      >
                        {org.campaigns[0]}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={`${
                          org.id === "toolbank"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                            : org.id === "nmbs"
                              ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100"
                              : org.id === "ibc"
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100"
                                : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
                        }`}
                      >
                        {org.campaigns[1] || "Featured"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-md bg-muted p-4">
                  <h4 className="mb-2 font-medium">Implementation Notes</h4>
                  <p className="text-sm text-muted-foreground">
                    The {org.name} theme is applied automatically when the user
                    is authenticated within this organization's context. All
                    components inherit these theme settings through CSS
                    variables.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Implementation Details */}
      <h2 className="mb-6 mt-12 text-2xl font-bold">Implementation Details</h2>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>CSS Variables Approach</CardTitle>
            <CardDescription>
              Using CSS variables for dynamic theming
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm">
                <code>
                  {`:root {
  /* Base theme variables */
  --primary: 221 83% 53%;
  --primary-foreground: 210 40% 98%;
  
  /* Organization-specific overrides */
  .theme-toolbank {
    --primary: 217 91% 60%;
    --border-radius: 0.375rem;
  }
  
  .theme-nmbs {
    --primary: 245 79% 52%;
    --border-radius: 0.5rem;
  }
}`}
                </code>
              </pre>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              CSS variables are defined at the root level and overridden based
              on the active organization theme. Components use these variables
              for styling.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Theme Context Provider</CardTitle>
            <CardDescription>
              React context for organization theme management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm">
                <code>
                  {`// Theme provider example
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [organization, setOrganization] = useState("toolbank");
  
  // Apply theme class to body
  useEffect(() => {
    document.body.className = \`theme-\${organization}\`;
  }, [organization]);
  
  return (
    <ThemeContext.Provider value={{ organization, setOrganization }}>
      {children}
    </ThemeContext.Provider>
  );
}`}
                </code>
              </pre>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              A React context provider manages the current organization theme
              and applies the appropriate CSS classes to enable theming.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Best Practices */}
      <h2 className="mb-6 mt-12 text-2xl font-bold">Best Practices</h2>
      <Card>
        <CardContent className="p-6">
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></div>
              <div>
                <span className="font-medium">Use CSS variables</span> for all
                theme-related styles to ensure consistency across components
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></div>
              <div>
                <span className="font-medium">Test all components</span> with
                each organization theme to ensure proper appearance
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></div>
              <div>
                <span className="font-medium">Maintain accessibility</span> by
                ensuring sufficient contrast ratios for all organization color
                schemes
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></div>
              <div>
                <span className="font-medium">
                  Support both light and dark modes
                </span>{" "}
                for each organization theme
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></div>
              <div>
                <span className="font-medium">Document theme variables</span> in
                the style guide for consistent implementation
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
