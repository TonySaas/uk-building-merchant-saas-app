import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ORGANIZATIONS } from "@/polymet/data/organization-data";
import OrganizationThemeSwitcher from "@/polymet/components/organization-theme-switcher";
import OrganizationTheming from "@/polymet/components/organization-theming";
import {
  AlertCircle,
  BookOpen,
  Code,
  FileJson,
  Info,
  Layers,
  Paintbrush,
} from "lucide-react";

export default function OrganizationThemeDocumentation() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto mb-8">
        <h1 className="text-4xl font-bold mb-4">Organization Theme System</h1>
        <p className="text-xl text-muted-foreground">
          A comprehensive guide to BuildConnect's organization-specific theming
          system
        </p>
      </div>

      <Tabs defaultValue="overview" className="max-w-6xl mx-auto">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="preview">Theme Preview</TabsTrigger>
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />

                <CardTitle>Organization Theming Overview</CardTitle>
              </div>
              <CardDescription>
                Understanding the multi-organization theming architecture
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>
                BuildConnect supports multiple organizations (Toolbank, NMBS,
                IBC, BMF) with unique branding while maintaining a consistent
                user experience. The theming system allows each organization to
                maintain its brand identity throughout the application.
              </p>

              <Alert>
                <Info className="h-4 w-4" />

                <AlertTitle>Key Concept</AlertTitle>
                <AlertDescription>
                  The organization theme is automatically applied based on the
                  user's authentication context, ensuring they always see the
                  appropriate branding.
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Core Benefits</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Consistent brand experience across all touchpoints</li>
                    <li>Centralized theme management for easy updates</li>
                    <li>Automatic application based on user context</li>
                    <li>Support for both light and dark mode variants</li>
                    <li>Accessibility considerations built-in</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Theme Properties</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>
                      <span className="font-medium">Brand Colors</span>:
                      Primary, secondary, accent
                    </li>
                    <li>
                      <span className="font-medium">State Colors</span>: Error,
                      warning, success
                    </li>
                    <li>
                      <span className="font-medium">Typography</span>: Font
                      families and weights
                    </li>
                    <li>
                      <span className="font-medium">Visual Style</span>: Border
                      radius, shadows
                    </li>
                    <li>
                      <span className="font-medium">Brand Assets</span>: Logos
                      and icons
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />

                <CardTitle>Theme Structure</CardTitle>
              </div>
              <CardDescription>
                How organization themes are structured and applied
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Theme Definition</h3>
                  <div className="bg-muted p-4 rounded-md">
                    <pre className="text-sm overflow-x-auto">
                      {`interface OrganizationTheme {
  // Brand Colors
  primary: string;
  secondary: string;
  accent: string;
  
  // State Colors
  error: string;
  warning: string;
  success: string;
  
  // Typography
  fontFamily: string;
  
  // Visual Style
  borderRadius: string;
  
  // Brand Assets
  logo: string;
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">
                    CSS Variables Approach
                  </h3>
                  <div className="bg-muted p-4 rounded-md">
                    <pre className="text-sm overflow-x-auto">
                      {`:root {
  --color-primary: #3B82F6;
  --color-secondary: #10B981;
  --color-accent: #8B5CF6;
  --border-radius: 0.5rem;
  --font-family: 'Inter, sans-serif';
}

.theme-toolbank {
  --color-primary: #E11D48;
  --color-secondary: #0F172A;
  --color-accent: #FBBF24;
  --border-radius: 0.25rem;
  --font-family: 'Montserrat, sans-serif';
}`}
                    </pre>
                  </div>
                </div>
              </div>

              <Separator />

              <h3 className="text-lg font-medium mb-4">
                Organization Theme Comparison
              </h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      {ORGANIZATIONS.map((org) => (
                        <TableHead key={org.id}>{org.name}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        Primary Color
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-[#E11D48]"></div>
                          <span>#E11D48</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-[#1E40AF]"></div>
                          <span>#1E40AF</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-[#047857]"></div>
                          <span>#047857</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-[#4F46E5]"></div>
                          <span>#4F46E5</span>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Border Radius
                      </TableCell>
                      <TableCell>0.25rem</TableCell>
                      <TableCell>0.5rem</TableCell>
                      <TableCell>0.375rem</TableCell>
                      <TableCell>0.5rem</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Font Family</TableCell>
                      <TableCell>Montserrat</TableCell>
                      <TableCell>Inter</TableCell>
                      <TableCell>Inter</TableCell>
                      <TableCell>Inter</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="implementation" className="mt-6 space-y-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />

                <CardTitle>Implementation Guide</CardTitle>
              </div>
              <CardDescription>
                How to implement and use the organization theming system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Theme Provider</h3>
                  <div className="bg-muted p-4 rounded-md">
                    <pre className="text-sm overflow-x-auto">
                      {`import React, { createContext, useContext, useEffect } from 'react';

// Create theme context
const ThemeContext = createContext(organizationThemes.default);

// Theme provider component
export function OrganizationThemeProvider({ 
  organizationId, 
  children 
}) {
  // Get organization theme or fall back to default
  const theme = organizationThemes[organizationId] || 
    organizationThemes.default;
  
  // Apply theme to document root as CSS variables
  useEffect(() => {
    const root = document.documentElement;
    
    // Set CSS variables
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-accent', theme.accent);
    
    // Apply organization class
    root.classList.add(\`theme-\${organizationId || 'default'}\`);
    
  }, [theme, organizationId]);
  
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Using the Theme</h3>
                  <div className="bg-muted p-4 rounded-md">
                    <pre className="text-sm overflow-x-auto">
                      {`// Hook for accessing theme
export function useOrganizationTheme() {
  return useContext(ThemeContext);
}

// Example component using the theme
function Button({ variant = "primary", children, ...props }) {
  const theme = useOrganizationTheme();
  
  const getColorClass = () => {
    switch (variant) {
      case "primary":
        return \`bg-[\${theme.primary}] text-white\`;
      case "secondary":
        return \`bg-[\${theme.secondary}] text-white\`;
      case "accent":
        return \`bg-[\${theme.accent}] text-black\`;
      default:
        return \`bg-[\${theme.primary}] text-white\`;
    }
  };
  
  return (
    <button 
      className={\`px-4 py-2 rounded-\${theme.borderRadius} \${getColorClass()}\`} 
      {...props}
    >
      {children}
    </button>
  );
}`}
                    </pre>
                  </div>
                </div>
              </div>

              <Separator />

              <h3 className="text-lg font-medium mb-4">
                Integration with Authentication
              </h3>
              <div className="bg-muted p-4 rounded-md">
                <pre className="text-sm overflow-x-auto">
                  {`function OrganizationContextProvider({ children }) {
  const [currentOrganization, setCurrentOrganization] = useState('default');
  const { user } = useAuth();
  
  useEffect(() => {
    // Set organization based on user's authentication context
    if (user?.organization) {
      setCurrentOrganization(user.organization);
    }
  }, [user]);
  
  return (
    <OrganizationContext.Provider value={{ currentOrganization }}>
      <OrganizationThemeProvider organizationId={currentOrganization}>
        {children}
      </OrganizationThemeProvider>
    </OrganizationContext.Provider>
  );
}`}
                </pre>
              </div>

              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />

                <AlertTitle>Important Implementation Note</AlertTitle>
                <AlertDescription>
                  Always ensure that components use CSS variables or the theme
                  context rather than hardcoded color values to maintain theme
                  consistency across the application.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileJson className="h-5 w-5 text-primary" />

                <CardTitle>Theme Configuration</CardTitle>
              </div>
              <CardDescription>
                Complete theme configuration for all organizations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md">
                <pre className="text-sm overflow-x-auto">
                  {`const organizationThemes = {
  default: {
    primary: '#3B82F6',    // Default blue
    secondary: '#10B981',  // Default green
    accent: '#8B5CF6',     // Default purple
    error: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981',
    fontFamily: 'Inter, sans-serif',
    headingFontFamily: 'Inter, sans-serif',
    logo: '/assets/logos/buildconnect.svg',
    favicon: '/assets/favicon/default.ico',
    borderRadius: 'medium',
    shadowDepth: 'medium',
    supportsDarkMode: true,
  },
  
  toolbank: {
    primary: '#E11D48',    // Toolbank red
    secondary: '#0F172A',  // Toolbank navy
    accent: '#FBBF24',     // Toolbank gold
    error: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981',
    fontFamily: 'Montserrat, sans-serif',
    headingFontFamily: 'Montserrat, sans-serif',
    logo: '/assets/logos/toolbank.svg',
    favicon: '/assets/favicon/toolbank.ico',
    borderRadius: 'small',
    shadowDepth: 'medium',
    supportsDarkMode: true,
    darkModePrimary: '#F43F5E',
  },
  
  nmbs: {
    primary: '#1E40AF',    // NMBS blue
    secondary: '#6B7280',  // NMBS gray
    accent: '#FBBF24',     // NMBS yellow
    error: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981',
    fontFamily: 'Inter, sans-serif',
    headingFontFamily: 'Inter, sans-serif',
    logo: '/assets/logos/nmbs.svg',
    favicon: '/assets/favicon/nmbs.ico',
    borderRadius: 'medium',
    shadowDepth: 'medium',
    supportsDarkMode: true,
  },
  
  ibc: {
    primary: '#047857',    // IBC green
    secondary: '#1F2937',  // IBC dark gray
    accent: '#7C3AED',     // IBC purple
    error: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981',
    fontFamily: 'Inter, sans-serif',
    headingFontFamily: 'Inter, sans-serif',
    logo: '/assets/logos/ibc.svg',
    favicon: '/assets/favicon/ibc.ico',
    borderRadius: 'small',
    shadowDepth: 'light',
    supportsDarkMode: true,
  },
  
  bmf: {
    primary: '#4F46E5',    // BMF indigo
    secondary: '#64748B',  // BMF slate
    accent: '#F59E0B',     // BMF amber
    error: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981',
    fontFamily: 'Inter, sans-serif',
    headingFontFamily: 'Inter, sans-serif',
    logo: '/assets/logos/bmf.svg',
    favicon: '/assets/favicon/bmf.ico',
    borderRadius: 'medium',
    shadowDepth: 'medium',
    supportsDarkMode: true,
  }
};`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="mt-6 space-y-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Paintbrush className="h-5 w-5 text-primary" />

                <CardTitle>Interactive Theme Preview</CardTitle>
              </div>
              <CardDescription>
                Preview and switch between different organization themes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrganizationThemeSwitcher />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Organization-Specific Component Examples</CardTitle>
              <CardDescription>
                See how components adapt to different organization themes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrganizationTheming />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guidelines" className="mt-6 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Design Guidelines</CardTitle>
              <CardDescription>
                Best practices for working with organization themes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Do's</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Use CSS variables for all theme-related styles</li>
                    <li>Test components with all organization themes</li>
                    <li>
                      Maintain accessibility with sufficient contrast ratios
                    </li>
                    <li>Support both light and dark mode variants</li>
                    <li>Document theme variables in the style guide</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Don'ts</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Hardcode color values in component styles</li>
                    <li>Create organization-specific component variants</li>
                    <li>Override theme variables at the component level</li>
                    <li>Ignore dark mode support for organization themes</li>
                    <li>Implement inconsistent border radius or typography</li>
                  </ul>
                </div>
              </div>

              <Separator />

              <h3 className="text-lg font-medium mb-4">
                Component Design Principles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Consistency</h4>
                  <p className="text-sm text-muted-foreground">
                    Maintain consistent component behavior across all
                    organization themes. Only visual styling should change, not
                    functionality.
                  </p>
                </div>
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Accessibility</h4>
                  <p className="text-sm text-muted-foreground">
                    Ensure all color combinations meet WCAG AA standards for
                    contrast, regardless of the organization theme.
                  </p>
                </div>
                <div className="border rounded-md p-4">
                  <h4 className="font-medium mb-2">Flexibility</h4>
                  <p className="text-sm text-muted-foreground">
                    Design components to adapt gracefully to different theme
                    properties like border radius and typography.
                  </p>
                </div>
              </div>

              <Alert className="bg-amber-50 text-amber-800 border-amber-200">
                <AlertCircle className="h-4 w-4" />

                <AlertTitle>Theme Customization Limits</AlertTitle>
                <AlertDescription>
                  While organizations can customize their themes, certain
                  aspects of the UI remain consistent across all organizations
                  to maintain usability and brand recognition for the
                  BuildConnect platform.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Theme Certification Process
                </h3>
                <p>
                  Before a new organization theme is deployed to production, it
                  must go through the following certification process:
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Badge>1</Badge>
                    <p>
                      Design review to ensure brand guidelines are properly
                      implemented
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge>2</Badge>
                    <p>
                      Accessibility audit to verify all text meets contrast
                      requirements
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge>3</Badge>
                    <p>
                      Component testing across all major components and states
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge>4</Badge>
                    <p>Dark mode compatibility verification</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge>5</Badge>
                    <p>
                      Performance testing to ensure theme switching is smooth
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
