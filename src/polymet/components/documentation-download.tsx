import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DownloadIcon,
  FileTextIcon,
  FileIcon,
  CheckIcon,
  AlertCircleIcon,
  CodeIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DocumentationDownload() {
  const [downloadStatus, setDownloadStatus] = useState({
    component: false,
    page: false,
    prototype: false,
  });

  const [focusModeDialog, setFocusModeDialog] = useState(false);
  const [currentDocType, setCurrentDocType] = useState(null);

  const handleDownload = (docType) => {
    // Set the current doc type for the dialog
    setCurrentDocType(docType);

    // Check if we're in a sandboxed environment (like Focus Mode)
    const isSandboxed =
      window.location !== window.parent.location ||
      window.frameElement ||
      window.top !== window.self;

    if (isSandboxed) {
      // Show dialog for Focus Mode users
      setFocusModeDialog(true);
      return;
    }

    // Regular download flow for non-sandboxed environments
    performDownload(docType);
  };

  const performDownload = (docType) => {
    // Get the content based on the document type
    let content = "";
    let filename = "";

    if (docType === "component") {
      content = getComponentDocContent();
      filename = "buildconnect-component-documentation.md";
      setDownloadStatus((prev) => ({ ...prev, component: true }));
    } else if (docType === "page") {
      content = getPageDocContent();
      filename = "buildconnect-page-documentation.md";
      setDownloadStatus((prev) => ({ ...prev, page: true }));
    } else if (docType === "prototype") {
      content = getPrototypeDocContent();
      filename = "buildconnect-prototype-documentation.md";
      setDownloadStatus((prev) => ({ ...prev, prototype: true }));
    }

    // Create a blob with the content
    const blob = new Blob([content], { type: "text/markdown" });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.style.display = "none"; // Hide the link

    // Append to body, click and remove
    document.body.appendChild(link);
    link.click();

    // Small timeout to ensure the download starts before cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Clean up the URL object
    }, 100);

    // Reset download status after 3 seconds
    setTimeout(() => {
      setDownloadStatus((prev) => ({ ...prev, [docType]: false }));
    }, 3000);
  };

  const copyToClipboard = () => {
    let content = "";

    if (currentDocType === "component") {
      content = getComponentDocContent();
    } else if (currentDocType === "page") {
      content = getPageDocContent();
    } else if (currentDocType === "prototype") {
      content = getPrototypeDocContent();
    }

    navigator.clipboard
      .writeText(content)
      .then(() => {
        // Close dialog and show success status
        setFocusModeDialog(false);
        setDownloadStatus((prev) => ({ ...prev, [currentDocType]: true }));

        // Reset status after 3 seconds
        setTimeout(() => {
          setDownloadStatus((prev) => ({ ...prev, [currentDocType]: false }));
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const getComponentDocContent = () => {
    return `# BuildConnect Component Documentation

## Overview
This document provides a comprehensive overview of all components, pages, layouts, and their dependencies in the BuildConnect application. The documentation is organized by component type and includes details about each component's purpose, location, dependencies, and description.

## Table of Contents
- [Layouts](#layouts)
- [Pages](#pages)
- [Form Components](#form-components)
- [Selection Components](#selection-components)
- [Date and Time Components](#date-and-time-components)
- [UI Components](#ui-components)
- [Section Components](#section-components)
- [Navigation Components](#navigation-components)
- [Data Components](#data-components)
- [Prototypes](#prototypes)

## Layouts

| Component ID | Component Name | Location | Dependencies | Description |
|-------------|----------------|----------|--------------|-------------|
| layout-01 | main-layout | layouts | header, footer | Main application layout with header and footer for authenticated pages |
| layout-02 | auth-layout | layouts | | Two-column authentication layout with branding and form sections |

## Pages

| Component ID | Component Name | Location | Dependencies | Description |
|-------------|----------------|----------|--------------|-------------|
| page-01 | home-page | pages | hero-section, feature-highlights, testimonial-section, user-type-cards, organization-selector, supplier-selector, merchant-selector | Landing page showcasing the platform's features and selection options |
| page-02 | login-page | pages | auth-section, organization-data | Authentication page with login and registration forms |
| page-03 | documentation-hub | pages | component-documentation, page-documentation, documentation-download, documentation-enhancements | Comprehensive documentation hub with tabbed interface for accessing all application documentation |

## Form Components

| Component ID | Component Name | Location | Dependencies | Description |
|-------------|----------------|----------|--------------|-------------|
| form-01 | input-base | components | | Base input component serving as foundation for all input types |
| form-02 | text-input | components | input-base | Specialized text input component with floating labels and validation |
| form-03 | number-input | components | input-base | Number input with increment/decrement controls and validation |
| form-04 | textarea-input | components | | Multi-line text input with character counting and resizing |
| form-05 | password-input | components | input-base | Password input with show/hide toggle and strength indicator |
| form-06 | email-input | components | input-base | Email input with validation and mail icon |
| form-07 | phone-input | components | input-base | Phone input with country code selection and validation |
| form-08 | input-showcase | components | text-input, number-input, textarea-input, password-input, email-input, phone-input | Comprehensive showcase of all input components |
| form-09 | auth-section | components | | Tabbed authentication component with login and registration forms |

## Selection Components

| Component ID | Component Name | Location | Dependencies | Description |
|-------------|----------------|----------|--------------|-------------|
| select-01 | select | components | | Comprehensive select component system with basic, searchable, and multi-select variants |
| select-02 | radio-group | components | | Flexible radio group component with horizontal and vertical layouts |
| select-03 | checkbox-group | components | | Checkbox group with select-all functionality and indeterminate states |
| select-04 | toggle-switch | components | | Toggle switch component with labels and group functionality |
| select-05 | segmented-control | components | | Modern segmented control with smooth animations for mutually exclusive options |
| select-06 | organization-merchant-selector | components | supplier-data, organization-data | Specialized selector for organizations, merchants, and suppliers |
| select-07 | organization-selector | components | | Grid of organization cards for selection |
| select-08 | merchant-selector | components | supplier-data | Grid of merchant cards for selection |
| select-09 | supplier-selector | components | supplier-data | Grid of supplier cards for selection |
| select-10 | category-selector | components | checkbox-group | Hierarchical category selector with nested categories |

## Date and Time Components

| Component ID | Component Name | Location | Dependencies | Description |
|-------------|----------------|----------|--------------|-------------|
| date-01 | date-picker | components | | Calendar interface for date selection |
| date-02 | time-picker | components | | Time selection with hour and minute precision |
| date-03 | date-range-picker | components | date-picker | Date range selection with validation |
| date-04 | date-time-picker | components | date-picker, time-picker | Combined date and time selection interface |
| date-05 | mini-calendar | components | | Compact calendar for quick date selection |
| date-06 | relative-date-selector | components | date-picker, date-range-picker | Natural language date selection (Today, Tomorrow, etc.) |
| date-07 | schedule-builder | components | date-picker, time-picker | Comprehensive schedule builder for recurring events |

## UI Components

| Component ID | Component Name | Location | Dependencies | Description |
|-------------|----------------|----------|--------------|-------------|
| ui-01 | style-guide | components | | Comprehensive documentation of design system elements |
| ui-02 | user-type-cards | components | | Cards representing different user types with features |

## Section Components

| Component ID | Component Name | Location | Dependencies | Description |
|-------------|----------------|----------|--------------|-------------|
| section-01 | hero-section | components | | Visually striking hero section with gradient background |
| section-02 | feature-highlights | components | | Grid of feature cards highlighting platform capabilities |
| section-03 | testimonial-section | components | | Section displaying user reviews in card-based layout |

## Navigation Components

| Component ID | Component Name | Location | Dependencies | Description |
|-------------|----------------|----------|--------------|-------------|
| nav-01 | header | components | | Responsive header with navigation links and authentication buttons |
| nav-02 | footer | components | | Comprehensive footer with multiple columns and subscription form |

## Data Components

| Component ID | Component Name | Location | Dependencies | Description |
|-------------|----------------|----------|--------------|-------------|
| data-01 | supplier-data | data | | Mock data for suppliers and merchants |
| data-02 | organization-data | data | | Mock data for organizations, user types, testimonials, and features |

## Documentation Components

| Component ID | Component Name | Location | Dependencies | Description |
|-------------|----------------|----------|--------------|-------------|
| doc-01 | component-documentation | components | | Comprehensive documentation for all components |
| doc-02 | page-documentation | components | | Detailed documentation for all pages |
| doc-03 | documentation-download | components | | Interface for downloading documentation files |
| doc-04 | documentation-enhancements | components | | Detailed component prop, state, theme, and accessibility documentation |

## Prototypes

| Component ID | Component Name | Location | Dependencies | Description |
|-------------|----------------|----------|--------------|-------------|
| proto-01 | build-connect-app | prototypes | main-layout, auth-layout, home-page, login-page, documentation-hub | Main application prototype with routing structure |

## Component Dependency Graph

\`\`\`
build-connect-app
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
        └── auth-section
\`\`\`

## Form Component Hierarchy

\`\`\`
input-showcase
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
    └── input-base
\`\`\`

## Date and Time Component Relationships

\`\`\`
schedule-builder
├── date-picker
└── time-picker

date-time-picker
├── date-picker
└── time-picker

date-range-picker
└── date-picker

relative-date-selector
├── date-picker
└── date-range-picker
\`\`\`

## Selection Component Relationships

\`\`\`
category-selector
└── checkbox-group

organization-merchant-selector
├── supplier-data
└── organization-data

merchant-selector
└── supplier-data

supplier-selector
└── supplier-data
\`\`\`

## Usage Guidelines

### Component Naming Conventions
- Use kebab-case for file names (e.g., \`input-base.tsx\`)
- Use PascalCase for component names (e.g., \`InputBase\`)

### Component Organization
- Components are organized by functionality in the \`@/polymet/components\` directory
- Layouts are stored in the \`@/polymet/layouts\` directory
- Pages are stored in the \`@/polymet/pages\` directory
- Mock data is stored in the \`@/polymet/data\` directory
- Prototypes are stored in the \`@/polymet/prototypes\` directory

### Importing Components
- Import components using the \`@/polymet/components/component-name\` pattern
- Import layouts using the \`@/polymet/layouts/layout-name\` pattern
- Import pages using the \`@/polymet/pages/page-name\` pattern
- Import data using the \`@/polymet/data/data-name\` pattern

### Component Best Practices
- Follow the single responsibility principle
- Keep components focused on a specific functionality
- Ensure proper type definitions for props
- Implement proper error handling and loading states
- Optimize for both light and dark mode using Tailwind CSS classes`;
  };

  const getPageDocContent = () => {
    return `# BuildConnect Page Documentation

## Overview
This document provides detailed documentation for all pages in the BuildConnect application, including their purpose, components, data dependencies, and routing information.

## Table of Contents
- [Home Page](#home-page)
- [Login Page](#login-page)
- [Documentation Hub](#documentation-hub)
- [Routing Structure](#routing-structure)
- [Page Component Relationships](#page-component-relationships)

## Home Page

### Basic Information
- **Page ID**: page-01
- **File Name**: home-page
- **Route**: /
- **Layout**: main-layout
- **Purpose**: Landing page showcasing the BuildConnect platform's features and selection options

### Components Used
- hero-section
- feature-highlights
- testimonial-section
- user-type-cards
- organization-selector
- supplier-selector
- merchant-selector

### Data Dependencies
- organization-data
- supplier-data

### Page Structure
\`\`\`
home-page
├── hero-section
│   └── Call-to-action buttons
├── organization-selector
│   └── Grid of organization cards
├── supplier-selector
│   └── Grid of supplier cards
├── merchant-selector
│   └── Grid of merchant cards
├── feature-highlights
│   └── Grid of feature cards
├── user-type-cards
│   └── Three user type cards (Supplier, Merchant, Consumer)
└── testimonial-section
    └── User testimonials
\`\`\`

### User Flow
1. User lands on the home page
2. Views the hero section with platform introduction
3. Can select an organization from the organization selector
4. Can select a supplier from the supplier selector
5. Can select a merchant from the merchant selector
6. Views feature highlights of the platform
7. Views different user types and their features
8. Views testimonials from existing users
9. Can navigate to login page via header navigation

### Screenshots
(Screenshots would be included here in an actual documentation)

## Login Page

### Basic Information
- **Page ID**: page-02
- **File Name**: login-page
- **Route**: /login
- **Layout**: auth-layout
- **Purpose**: Authentication page with login and registration forms

### Components Used
- auth-section
  - Login form
  - Registration form
  - OAuth login options

### Data Dependencies
- organization-data

### Page Structure
\`\`\`
login-page
└── auth-section
    ├── Tabs
    │   ├── Login Tab
    │   │   ├── Email input
    │   │   ├── Password input
    │   │   ├── Remember me checkbox
    │   │   └── Login button
    │   └── Register Tab
    │       ├── Role selection
    │       ├── Personal information
    │       ├── Company information
    │       ├── Organization selection
    │       ├── Password creation
    │       └── Terms acceptance
    └── OAuth login options
        ├── Google
        ├── Microsoft
        └── GitHub
\`\`\`

### User Flow
1. User navigates to the login page
2. Can switch between login and registration tabs
3. For login:
   - Enters email and password
   - Can select "Remember me" option
   - Clicks login button
4. For registration:
   - Selects role (Supplier, Merchant, Consumer)
   - Enters personal and company information
   - Selects organization affiliation
   - Creates password
   - Accepts terms
   - Clicks register button
5. Alternatively, can use OAuth login options

### Form Validation
- Email: Required, valid email format
- Password: Required, minimum 8 characters
- Registration form: All fields required

### Screenshots
(Screenshots would be included here in an actual documentation)

## Documentation Hub

### Basic Information
- **Page ID**: page-03
- **File Name**: documentation-hub
- **Route**: /documentation
- **Layout**: main-layout
- **Purpose**: Central hub for accessing all BuildConnect application documentation

### Components Used
- component-documentation
- page-documentation
- documentation-download
- documentation-enhancements

### Data Dependencies
- None (uses static content)

### Page Structure
\`\`\`
documentation-hub
├── Header
│   ├── Title
│   ├── Description
│   └── Search functionality
├── Tabs
│   ├── Overview Tab
│   │   ├── Getting Started section
│   │   ├── Component Library cards
│   │   ├── Page Templates cards
│   │   └── Implementation Guide cards
│   ├── Components Tab
│   │   └── component-documentation
│   ├── Pages Tab
│   │   └── page-documentation
│   ├── Downloads Tab
│   │   └── documentation-download
│   └── Enhancements Tab
│       └── documentation-enhancements
\`\`\`

### User Flow
1. User navigates to the documentation hub
2. Can search for specific documentation
3. Can navigate between different tabs:
   - Overview: General introduction and getting started
   - Components: Detailed component documentation
   - Pages: Detailed page documentation
   - Downloads: Download documentation files
   - Enhancements: View detailed component enhancements

### Screenshots
(Screenshots would be included here in an actual documentation)

## Routing Structure

### Current Routes
| Route | Page | Layout | Description |
|-------|------|--------|-------------|
| / | home-page | main-layout | Landing page showcasing the platform |
| /login | login-page | auth-layout | Authentication page with login/registration |
| /documentation | documentation-hub | main-layout | Documentation hub for the application |

### Navigation Flow
\`\`\`
Home Page (/) <---> Login Page (/login)
             <---> Documentation Hub (/documentation)
\`\`\`

## Page Component Relationships

### Home Page Components
\`\`\`
home-page
├── hero-section
├── organization-selector
├── supplier-selector
├── merchant-selector
├── feature-highlights
├── user-type-cards
└── testimonial-section
\`\`\`

### Login Page Components
\`\`\`
login-page
└── auth-section
    ├── Login Form
    └── Registration Form
\`\`\`

### Documentation Hub Components
\`\`\`
documentation-hub
├── component-documentation
├── page-documentation
├── documentation-download
└── documentation-enhancements
\`\`\`

## Future Page Considerations

### Dashboard Page
- **Purpose**: User dashboard after authentication
- **Potential Route**: /dashboard
- **Layout**: main-layout
- **Components Needed**:
  - Dashboard header with user information
  - Statistics cards
  - Recent activity list
  - Quick action buttons

### Profile Page
- **Purpose**: User profile management
- **Potential Route**: /profile
- **Layout**: main-layout
- **Components Needed**:
  - Profile information form
  - Password change form
  - Notification preferences
  - Connected accounts

### Promotion Management Page
- **Purpose**: Create and manage promotions (for suppliers)
- **Potential Route**: /promotions
- **Layout**: main-layout
- **Components Needed**:
  - Promotion list
  - Promotion creation form
  - Schedule builder
  - Merchant selection

## Implementation Guidelines

### Page Creation Process
1. Identify required components
2. Create or reuse necessary components
3. Assemble page layout
4. Add to routing structure
5. Implement navigation links

### Page Performance Considerations
- Implement code splitting for large pages
- Optimize component rendering with React.memo where appropriate
- Lazy load images and heavy components
- Implement proper loading states

### Accessibility Guidelines
- Ensure proper heading hierarchy
- Include appropriate ARIA attributes
- Ensure keyboard navigation works
- Test with screen readers
- Maintain sufficient color contrast

### Responsive Design
- Implement mobile-first approach
- Use Tailwind's responsive prefixes
- Test on multiple screen sizes
- Ensure touch targets are appropriately sized`;
  };

  const getPrototypeDocContent = () => {
    return `# BuildConnect Prototype Documentation

## Overview
This document provides detailed documentation for the BuildConnect application prototype, including its routing structure, page relationships, and implementation details.

## Table of Contents
- [Prototype Structure](#prototype-structure)
- [Routing Configuration](#routing-configuration)
- [Navigation Flow](#navigation-flow)
- [Implementation Details](#implementation-details)
- [Future Enhancements](#future-enhancements)

## Prototype Structure

### Basic Information
- **Prototype ID**: proto-01
- **File Name**: build-connect-app
- **Purpose**: Main application prototype with routing structure for the BuildConnect platform

### Pages Included
- home-page (/)
- login-page (/login)
- documentation-hub (/documentation)

### Layouts Used
- main-layout
- auth-layout

## Routing Configuration

### Route Definitions
\`\`\`jsx
<Router>
  <Routes>
    <Route
      path="/"
      element={
        <MainLayout>
          <HomePage />
        </MainLayout>
      }
    />

    <Route
      path="/login"
      element={
        <AuthLayout>
          <LoginPage />
        </AuthLayout>
      }
    />

    <Route
      path="/documentation"
      element={
        <MainLayout>
          <DocumentationHub />
        </MainLayout>
      }
    />
  </Routes>
</Router>
\`\`\`

### Route Parameters
- No route parameters are currently used in the prototype
- Future routes may include parameters such as:
  - /product/:productId
  - /merchant/:merchantId
  - /supplier/:supplierId

## Navigation Flow

### Primary Navigation
- Header navigation links connect the main pages
- The BuildConnect logo links to the home page
- "Login" button in the header links to the login page
- "Documentation" link in the header links to the documentation hub

### Secondary Navigation
- "Get Started" button on the home page links to the login page
- "Learn More" links on feature cards could link to specific documentation sections (future enhancement)

### Navigation Component Implementation
\`\`\`jsx
// Example header navigation implementation
<nav className="flex items-center space-x-4">
  <Link to="/" className="font-medium">Home</Link>
  <Link to="/documentation" className="font-medium">Documentation</Link>
  <Link to="/login">
    <Button>Login</Button>
  </Link>
</nav>
\`\`\`

## Implementation Details

### Prototype File Structure
\`\`\`
build-connect-app.tsx
├── Router configuration
├── Routes definition
│   ├── Home route (/)
│   │   └── MainLayout + HomePage
│   ├── Login route (/login)
│   │   └── AuthLayout + LoginPage
│   └── Documentation route (/documentation)
│       └── MainLayout + DocumentationHub
└── Export default statement
\`\`\`

### Layout Implementation
- **MainLayout**: Wraps pages with the header and footer components
- **AuthLayout**: Provides a specialized layout for authentication pages with branding section

### State Management
- Currently using React's built-in state management
- Future enhancements may include:
  - Context API for user authentication state
  - Redux or Zustand for more complex state management

## Future Enhancements

### Additional Routes
- /dashboard - User dashboard after authentication
- /profile - User profile management
- /promotions - Promotion management for suppliers
- /merchants/:id - Merchant detail pages
- /suppliers/:id - Supplier detail pages

### Authentication Flow
- Implement protected routes that require authentication
- Add authentication state management
- Implement redirect logic for unauthenticated users

### Dynamic Routing
- Implement dynamic route generation based on user role
- Add breadcrumb navigation for nested routes

### Code Splitting
- Implement React.lazy and Suspense for route-based code splitting
- Add loading states for route transitions

### Navigation Enhancements
- Add active state styling for current route
- Implement mobile navigation drawer
- Add breadcrumb navigation for nested routes

## Usage Guidelines

### Adding New Routes
1. Create the new page component in the pages directory
2. Import the page and appropriate layout in the prototype file
3. Add a new Route component with the desired path
4. Update navigation components to include links to the new route

### Route Naming Conventions
- Use kebab-case for route paths (e.g., /user-profile)
- Keep routes descriptive but concise
- Use plural nouns for collection routes (e.g., /products)
- Use singular nouns with IDs for specific items (e.g., /product/:id)

### Navigation Best Practices
- Ensure all routes are accessible via UI navigation
- Provide clear visual indication of the current route
- Implement consistent back navigation patterns
- Ensure all links use the Link component from react-router-dom`;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        BuildConnect Documentation
      </h1>
      <p className="text-center text-muted-foreground mb-8">
        Download comprehensive documentation for the BuildConnect application
        components and pages
      </p>

      <Tabs defaultValue="component" className="w-full max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="component">Component Documentation</TabsTrigger>
          <TabsTrigger value="page">Page Documentation</TabsTrigger>
          <TabsTrigger value="prototype">Prototype Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="component" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Component Documentation</CardTitle>
              <CardDescription>
                Comprehensive documentation of all components in the
                BuildConnect application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileTextIcon className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />

                    <div>
                      <p className="font-medium">
                        buildconnect-component-documentation.md
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Markdown • 12KB
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDownload("component")}
                    className="flex items-center"
                    disabled={downloadStatus.component}
                  >
                    {downloadStatus.component ? (
                      <>
                        <CheckIcon className="h-4 w-4 mr-2" />
                        Downloaded
                      </>
                    ) : (
                      <>
                        <DownloadIcon className="h-4 w-4 mr-2" />
                        Download
                      </>
                    )}
                  </Button>
                </div>

                <div className="border rounded-md p-4 bg-muted/50">
                  <h3 className="text-sm font-medium mb-2">
                    Contents include:
                  </h3>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    <li>Comprehensive component catalog</li>
                    <li>Component dependencies and relationships</li>
                    <li>Component hierarchy diagrams</li>
                    <li>Usage guidelines and best practices</li>
                    <li>Component organization structure</li>
                    <li>Documentation components</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              <p className="text-sm text-muted-foreground">Format: Markdown</p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="page" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Page Documentation</CardTitle>
              <CardDescription>
                Detailed documentation of all pages and their structure in the
                BuildConnect application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileIcon className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />

                    <div>
                      <p className="font-medium">
                        buildconnect-page-documentation.md
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Markdown • 8KB
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDownload("page")}
                    className="flex items-center"
                    disabled={downloadStatus.page}
                  >
                    {downloadStatus.page ? (
                      <>
                        <CheckIcon className="h-4 w-4 mr-2" />
                        Downloaded
                      </>
                    ) : (
                      <>
                        <DownloadIcon className="h-4 w-4 mr-2" />
                        Download
                      </>
                    )}
                  </Button>
                </div>

                <div className="border rounded-md p-4 bg-muted/50">
                  <h3 className="text-sm font-medium mb-2">
                    Contents include:
                  </h3>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    <li>Detailed page structure documentation</li>
                    <li>User flows and navigation patterns</li>
                    <li>Page component relationships</li>
                    <li>Routing structure and information</li>
                    <li>Documentation hub details</li>
                    <li>Future page considerations</li>
                    <li>Implementation guidelines</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              <p className="text-sm text-muted-foreground">Format: Markdown</p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="prototype" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Prototype Documentation</CardTitle>
              <CardDescription>
                Detailed documentation of the BuildConnect application prototype
                and routing structure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CodeIcon className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />

                    <div>
                      <p className="font-medium">
                        buildconnect-prototype-documentation.md
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Markdown • 6KB
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDownload("prototype")}
                    className="flex items-center"
                    disabled={downloadStatus.prototype}
                  >
                    {downloadStatus.prototype ? (
                      <>
                        <CheckIcon className="h-4 w-4 mr-2" />
                        Downloaded
                      </>
                    ) : (
                      <>
                        <DownloadIcon className="h-4 w-4 mr-2" />
                        Download
                      </>
                    )}
                  </Button>
                </div>

                <div className="border rounded-md p-4 bg-muted/50">
                  <h3 className="text-sm font-medium mb-2">
                    Contents include:
                  </h3>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    <li>Prototype structure and organization</li>
                    <li>Routing configuration details</li>
                    <li>Navigation flow between pages</li>
                    <li>Implementation details and file structure</li>
                    <li>Future route enhancements</li>
                    <li>Route naming conventions</li>
                    <li>Navigation best practices</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              <p className="text-sm text-muted-foreground">Format: Markdown</p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Focus Mode Dialog */}
      <Dialog open={focusModeDialog} onOpenChange={setFocusModeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertCircleIcon className="h-5 w-5 mr-2 text-amber-500" />
              Focus Mode Detected
            </DialogTitle>
            <DialogDescription>
              Direct downloads are restricted in Focus Mode. You can copy the
              content to your clipboard instead.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm">
              You're currently in Focus Mode which restricts direct file
              downloads. Click the button below to copy the documentation to
              your clipboard, then paste it into a text editor and save it as a
              .md file.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFocusModeDialog(false)}>
              Cancel
            </Button>
            <Button onClick={copyToClipboard}>Copy to Clipboard</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold mb-4">Need a different format?</h2>
        <p className="text-muted-foreground mb-6">
          Contact the development team for documentation in other formats such
          as PDF, HTML, or Excel
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline">Contact Support</Button>
          <Button variant="outline">Request Custom Format</Button>
        </div>
      </div>
    </div>
  );
}
