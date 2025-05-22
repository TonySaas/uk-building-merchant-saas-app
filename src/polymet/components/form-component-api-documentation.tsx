import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfoIcon, CheckCircleIcon, AlertCircleIcon } from "lucide-react";
import { TextInput } from "@/polymet/components/text-input";
import { EmailInput } from "@/polymet/components/email-input";
import { PasswordInput } from "@/polymet/components/password-input";

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

interface ThemeOption {
  name: string;
  description: string;
  properties: string[];
}

export default function FormComponentAPIDocumentation() {
  const [textValue, setTextValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [activeTab, setActiveTab] = useState("text-input");
  const [openSections, setOpenSections] = useState<string[]>(["props"]);

  // TextInput props
  const textInputProps: PropDefinition[] = [
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
      name: "required",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Marks field as required",
    },
    {
      name: "helperText",
      type: "string",
      required: false,
      description: "Helper text displayed below the input",
    },
    {
      name: "maxLength",
      type: "number",
      required: false,
      description: "Maximum character length",
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
    {
      name: "floatingLabel",
      type: "boolean",
      required: false,
      defaultValue: "true",
      description: "Whether the label should float when the input is focused",
    },
    {
      name: "className",
      type: "string",
      required: false,
      description: "Additional CSS classes for the input",
    },
    {
      name: "containerClassName",
      type: "string",
      required: false,
      description: "Additional CSS classes for the container",
    },
  ];

  // Email input props (extends TextInput props)
  const emailInputProps: PropDefinition[] = [
    ...textInputProps,
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
      description: "Whether to validate the email when the input loses focus",
    },
  ];

  // Password input props (extends TextInput props)
  const passwordInputProps: PropDefinition[] = [
    ...textInputProps.filter(
      (prop) => prop.name !== "type" && prop.name !== "endIcon"
    ),
    {
      name: "showToggle",
      type: "boolean",
      required: false,
      defaultValue: "true",
      description: "Whether to show the password visibility toggle",
    },
    {
      name: "strengthIndicator",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Whether to show the password strength indicator",
    },
  ];

  // State management
  const textInputState: StateItem[] = [
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
    {
      name: "filled",
      type: "boolean",
      initialValue: "false",
      description: "Tracks whether the input has a value",
    },
  ];

  // Email input state
  const emailInputState: StateItem[] = [
    ...textInputState,
    {
      name: "isValid",
      type: "boolean",
      initialValue: "true",
      description: "Tracks whether the email is valid",
    },
  ];

  // Password input state
  const passwordInputState: StateItem[] = [
    ...textInputState,
    {
      name: "visible",
      type: "boolean",
      initialValue: "false",
      description: "Tracks whether the password is visible",
    },
    {
      name: "strength",
      type: "number",
      initialValue: "0",
      description: "The calculated strength of the password (0-4)",
    },
  ];

  // Event handlers
  const textInputEvents: EventHandler[] = [
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
    {
      name: "onBlur",
      type: "(e: React.FocusEvent<HTMLInputElement>) => void",
      description: "Called when the input loses focus",
      example: "onBlur={() => validateInput()}",
    },
  ];

  // Theme options
  const themeOptions: ThemeOption[] = [
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
    {
      name: "Focus States",
      description: "Visual indicators when the input is focused",
      properties: ["focusRingColor", "focusRingWidth", "focusTransition"],
    },
  ];

  // Accessibility considerations
  const accessibilityItems: AccessibilityItem[] = [
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
    {
      type: "Screen Readers",
      description:
        "Error messages are announced by screen readers when they appear",
      importance: "important",
    },
    {
      type: "Focus Management",
      description:
        "Visual focus indicators meet WCAG 2.1 AA contrast requirements",
      importance: "important",
    },
    {
      type: "Form Labels",
      description:
        "All inputs have properly associated labels using the 'for' attribute",
      importance: "critical",
    },
  ];

  // Code examples
  const textInputExample = `import { TextInput } from '@/polymet/components/text-input';
import { useState } from 'react';

export default function MyForm() {
  const [name, setName] = useState('');
  
  return (
    <TextInput
      label="Full Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter your full name"
      required
    />
  );
}`;

  const emailInputExample = `import { EmailInput } from '@/polymet/components/email-input';
import { useState } from 'react';

export default function ContactForm() {
  const [email, setEmail] = useState('');
  
  return (
    <EmailInput
      label="Email Address"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="name@company.com"
      validateOnBlur
      required
    />
  );
}`;

  const passwordInputExample = `import { PasswordInput } from '@/polymet/components/password-input';
import { useState } from 'react';

export default function SignupForm() {
  const [password, setPassword] = useState('');
  
  return (
    <PasswordInput
      label="Create Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter a secure password"
      strengthIndicator
      required
    />
  );
}`;

  // Get the current component data based on active tab
  const getCurrentProps = () => {
    switch (activeTab) {
      case "email-input":
        return emailInputProps;
      case "password-input":
        return passwordInputProps;
      default:
        return textInputProps;
    }
  };

  const getCurrentState = () => {
    switch (activeTab) {
      case "email-input":
        return emailInputState;
      case "password-input":
        return passwordInputState;
      default:
        return textInputState;
    }
  };

  const getCurrentExample = () => {
    switch (activeTab) {
      case "email-input":
        return emailInputExample;
      case "password-input":
        return passwordInputExample;
      default:
        return textInputExample;
    }
  };

  const getCurrentImport = () => {
    switch (activeTab) {
      case "email-input":
        return "import { EmailInput } from '@/polymet/components/email-input';";
      case "password-input":
        return "import { PasswordInput } from '@/polymet/components/password-input';";
      default:
        return "import { TextInput } from '@/polymet/components/text-input';";
    }
  };

  const getCurrentComponentName = () => {
    switch (activeTab) {
      case "email-input":
        return "EmailInput";
      case "password-input":
        return "PasswordInput";
      default:
        return "TextInput";
    }
  };

  const getCurrentDescription = () => {
    switch (activeTab) {
      case "email-input":
        return "A specialized email input component with validation and mail icon.";
      case "password-input":
        return "A specialized password input component with show/hide toggle and strength indicator.";
      default:
        return "A specialized text input component with floating labels, validation states, and icon support.";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Form Component API Documentation
        </h1>
        <p className="text-muted-foreground">
          Comprehensive API documentation for form components in the
          BuildConnect application, including props, state management, theme
          customization, and accessibility considerations.
        </p>
      </div>

      <Tabs
        defaultValue="text-input"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mb-8"
      >
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="text-input">Text Input</TabsTrigger>
          <TabsTrigger value="email-input">Email Input</TabsTrigger>
          <TabsTrigger value="password-input">Password Input</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold">
                      {getCurrentComponentName()}
                    </h2>
                    <Badge variant="outline" className="font-mono text-xs">
                      Component
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    {getCurrentDescription()}
                  </p>
                  <div className="mt-2 rounded-md bg-muted p-2 font-mono text-sm">
                    {getCurrentImport()}
                  </div>
                </div>

                <Accordion
                  type="multiple"
                  value={openSections}
                  onValueChange={setOpenSections}
                  className="w-full"
                >
                  <AccordionItem value="props">
                    <AccordionTrigger className="text-base font-medium">
                      Props
                    </AccordionTrigger>
                    <AccordionContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[150px]">Name</TableHead>
                            <TableHead className="w-[150px]">Type</TableHead>
                            <TableHead className="w-[100px]">
                              Required
                            </TableHead>
                            <TableHead className="w-[150px]">Default</TableHead>
                            <TableHead>Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getCurrentProps().map((prop) => (
                            <TableRow key={prop.name}>
                              <TableCell className="font-mono text-sm">
                                {prop.name}
                              </TableCell>
                              <TableCell className="font-mono text-sm">
                                {prop.type}
                              </TableCell>
                              <TableCell>
                                {prop.required ? "Yes" : "No"}
                              </TableCell>
                              <TableCell className="font-mono text-sm">
                                {prop.defaultValue || "-"}
                              </TableCell>
                              <TableCell>{prop.description}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="state">
                    <AccordionTrigger className="text-base font-medium">
                      State Management
                    </AccordionTrigger>
                    <AccordionContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[150px]">Name</TableHead>
                            <TableHead className="w-[150px]">Type</TableHead>
                            <TableHead className="w-[150px]">
                              Initial Value
                            </TableHead>
                            <TableHead>Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getCurrentState().map((item) => (
                            <TableRow key={item.name}>
                              <TableCell className="font-mono text-sm">
                                {item.name}
                              </TableCell>
                              <TableCell className="font-mono text-sm">
                                {item.type}
                              </TableCell>
                              <TableCell className="font-mono text-sm">
                                {item.initialValue}
                              </TableCell>
                              <TableCell>{item.description}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="events">
                    <AccordionTrigger className="text-base font-medium">
                      Event Handlers
                    </AccordionTrigger>
                    <AccordionContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[150px]">Name</TableHead>
                            <TableHead className="w-[200px]">Type</TableHead>
                            <TableHead>Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {textInputEvents.map((event) => (
                            <TableRow key={event.name}>
                              <TableCell className="font-mono text-sm">
                                {event.name}
                              </TableCell>
                              <TableCell className="font-mono text-sm">
                                {event.type}
                              </TableCell>
                              <TableCell>
                                <div>
                                  {event.description}
                                  {event.example && (
                                    <div className="mt-1 rounded bg-muted p-1 font-mono text-xs">
                                      {event.example}
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="theme">
                    <AccordionTrigger className="text-base font-medium">
                      Theme Customization
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-6">
                        {themeOptions.map((option, index) => (
                          <div key={index} className="space-y-2">
                            <h3 className="font-medium">{option.name}</h3>
                            <p className="text-muted-foreground">
                              {option.description}
                            </p>
                            <div className="mt-2">
                              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                                Customizable Properties:
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {option.properties.map((property) => (
                                  <span
                                    key={property}
                                    className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium"
                                  >
                                    {property}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="accessibility">
                    <AccordionTrigger className="text-base font-medium">
                      Accessibility
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        {accessibilityItems.map((item, index) => {
                          const alertVariant =
                            item.importance === "critical"
                              ? "destructive"
                              : item.importance === "important"
                                ? "default"
                                : "secondary";

                          return (
                            <Alert
                              key={index}
                              variant={
                                alertVariant as
                                  | "default"
                                  | "destructive"
                                  | "secondary"
                              }
                            >
                              <div className="flex items-start gap-2">
                                <InfoIcon className="h-4 w-4 mt-0.5" />

                                <div>
                                  <div className="font-medium capitalize mb-1">
                                    {item.type}
                                  </div>
                                  <AlertDescription>
                                    {item.description}
                                  </AlertDescription>
                                </div>
                              </div>
                            </Alert>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="example">
                    <AccordionTrigger className="text-base font-medium">
                      Usage Example
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="rounded-md bg-muted p-4">
                        <pre className="text-sm font-mono whitespace-pre-wrap break-all">
                          {getCurrentExample()}
                        </pre>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="text-lg font-medium mb-4">Live Example</h3>
                <div className="space-y-6">
                  {activeTab === "text-input" && (
                    <TextInput
                      label="Full Name"
                      value={textValue}
                      onChange={(e) => setTextValue(e.target.value)}
                      placeholder="Enter your full name"
                      helperText="Please enter your full name as it appears on your ID"
                    />
                  )}

                  {activeTab === "email-input" && (
                    <EmailInput
                      label="Email Address"
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                      placeholder="name@company.com"
                      validateOnBlur
                      helperText="We'll never share your email with anyone else"
                    />
                  )}

                  {activeTab === "password-input" && (
                    <PasswordInput
                      label="Password"
                      value={passwordValue}
                      onChange={(e) => setPasswordValue(e.target.value)}
                      placeholder="Enter your password"
                      strengthIndicator
                      helperText="Use a mix of letters, numbers, and symbols"
                    />
                  )}
                </div>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <h3 className="text-lg font-medium mb-4">States</h3>
                <div className="space-y-6">
                  {activeTab === "text-input" && (
                    <>
                      <TextInput
                        label="Error State"
                        value="Invalid input"
                        onChange={() => {}}
                        error="This field is required"
                      />

                      <TextInput
                        label="Success State"
                        value="Valid input"
                        onChange={() => {}}
                        success
                      />

                      <TextInput
                        label="Disabled State"
                        value="Disabled input"
                        onChange={() => {}}
                        disabled
                      />
                    </>
                  )}

                  {activeTab === "email-input" && (
                    <>
                      <EmailInput
                        label="Error State"
                        value="invalid-email"
                        onChange={() => {}}
                        error="Please enter a valid email address"
                      />

                      <EmailInput
                        label="Success State"
                        value="valid@example.com"
                        onChange={() => {}}
                        success
                      />

                      <EmailInput
                        label="Disabled State"
                        value="disabled@example.com"
                        onChange={() => {}}
                        disabled
                      />
                    </>
                  )}

                  {activeTab === "password-input" && (
                    <>
                      <PasswordInput
                        label="Error State"
                        value="weak"
                        onChange={() => {}}
                        error="Password must be at least 8 characters"
                      />

                      <PasswordInput
                        label="Success State"
                        value="StrongPassword123!"
                        onChange={() => {}}
                        success
                      />

                      <PasswordInput
                        label="Disabled State"
                        value="DisabledPassword"
                        onChange={() => {}}
                        disabled
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <h3 className="text-lg font-medium mb-4">Best Practices</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Always provide descriptive labels for inputs</li>
                  <li>
                    Use helper text to provide additional context when needed
                  </li>
                  <li>Display clear error messages for validation failures</li>
                  <li>
                    Consider using icons to enhance visual recognition of input
                    types
                  </li>
                  <li>
                    Ensure proper contrast between input text and background
                  </li>
                  <li>
                    Implement consistent validation behavior across all forms
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Tabs>

      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">
          Form Component Relationships
        </h2>
        <div className="p-6 border rounded-lg bg-muted/30">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-3">Component Hierarchy</h3>
              <div className="space-y-2">
                <div className="p-3 border rounded-md bg-card">
                  <div className="font-medium">InputBase</div>
                  <div className="text-sm text-muted-foreground">
                    Base component with shared functionality
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pl-6">
                  <div className="p-3 border rounded-md bg-card">
                    <div className="font-medium">TextInput</div>
                    <div className="text-sm text-muted-foreground">
                      Extends InputBase
                    </div>
                  </div>
                  <div className="p-3 border rounded-md bg-card">
                    <div className="font-medium">EmailInput</div>
                    <div className="text-sm text-muted-foreground">
                      Extends InputBase
                    </div>
                  </div>
                  <div className="p-3 border rounded-md bg-card">
                    <div className="font-medium">PasswordInput</div>
                    <div className="text-sm text-muted-foreground">
                      Extends InputBase
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-medium mb-3">Common Features</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />

                  <span>Floating labels</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />

                  <span>Error states with validation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />

                  <span>Helper text support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />

                  <span>Icon support (start/end)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />

                  <span>Disabled states</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />

                  <span>Required field indication</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">Implementation Notes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="text-lg font-medium mb-3">
              <AlertCircleIcon className="h-5 w-5 inline-block mr-2 text-amber-500" />
              Known Limitations
            </h3>
            <ul className="space-y-2 list-disc pl-5">
              <li>
                Password strength indicator is visual only and does not enforce
                password policies
              </li>
              <li>
                Email validation uses basic regex patterns and may not catch all
                edge cases
              </li>
              <li>
                Custom validation requires manual implementation through the
                error prop
              </li>
              <li>
                No built-in form-level validation or integration with form
                libraries
              </li>
            </ul>
          </div>

          <div className="p-6 border rounded-lg bg-card">
            <h3 className="text-lg font-medium mb-3">
              <InfoIcon className="h-5 w-5 inline-block mr-2 text-blue-500" />
              Future Enhancements
            </h3>
            <ul className="space-y-2 list-disc pl-5">
              <li>
                Integration with React Hook Form and other form validation
                libraries
              </li>
              <li>
                Improved internationalization support for validation messages
              </li>
              <li>
                Additional input types (phone, URL, numeric with formatting)
              </li>
              <li>Enhanced autocomplete and suggestion capabilities</li>
              <li>
                Advanced validation rules with custom validation function
                support
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
