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
import { InfoIcon, CheckCircleIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SearchableSelect,
  MultiSelect,
} from "@/polymet/components/select";

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

export default function SelectAPIDocumentation() {
  const [basicValue, setBasicValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [multiValue, setMultiValue] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("basic-select");
  const [openSections, setOpenSections] = useState<string[]>(["props"]);

  // Basic Select props
  const basicSelectProps: PropDefinition[] = [
    {
      name: "label",
      type: "string",
      required: true,
      description: "The label text displayed above the select",
    },
    {
      name: "options",
      type: "Array<{ value: string; label: string; }>",
      required: true,
      description: "Options to display in the dropdown",
    },
    {
      name: "value",
      type: "string",
      required: true,
      description: "The currently selected value",
    },
    {
      name: "onChange",
      type: "(value: string) => void",
      required: true,
      description: "Callback fired when selection changes",
    },
    {
      name: "error",
      type: "string",
      required: false,
      description: "Error message to display below the select",
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Whether the select is disabled",
    },
    {
      name: "required",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Marks field as required",
    },
    {
      name: "placeholder",
      type: "string",
      required: false,
      defaultValue: '"Select..."',
      description: "Placeholder text shown when no option is selected",
    },
    {
      name: "clearable",
      type: "boolean",
      required: false,
      defaultValue: "false",
      description: "Allow clearing the selection",
    },
    {
      name: "className",
      type: "string",
      required: false,
      description: "Additional CSS classes for the select",
    },
  ];

  // Searchable select props (extends basic select props)
  const searchableSelectProps: PropDefinition[] = [
    ...basicSelectProps,
    {
      name: "searchable",
      type: "boolean",
      required: false,
      defaultValue: "true",
      description:
        "Enable search functionality (always true for this component)",
    },
    {
      name: "emptyMessage",
      type: "string",
      required: false,
      defaultValue: '"No results found."',
      description: "Message to display when no options match the search",
    },
  ];

  // Multi-select props (extends searchable select props)
  const multiSelectProps: PropDefinition[] = [
    ...basicSelectProps.filter(
      (prop) => prop.name !== "value" && prop.name !== "onChange"
    ),
    {
      name: "value",
      type: "string[]",
      required: true,
      description: "Array of currently selected values",
    },
    {
      name: "onChange",
      type: "(value: string[]) => void",
      required: true,
      description: "Callback fired when selection changes",
    },
    {
      name: "multiple",
      type: "boolean",
      required: false,
      defaultValue: "true",
      description: "Enable multi-select (always true for this component)",
    },
    {
      name: "maxItems",
      type: "number",
      required: false,
      description: "Maximum number of items that can be selected",
    },
    {
      name: "emptyMessage",
      type: "string",
      required: false,
      defaultValue: '"No results found."',
      description: "Message to display when no options match the search",
    },
  ];

  // State management
  const basicSelectState: StateItem[] = [
    {
      name: "open",
      type: "boolean",
      initialValue: "false",
      description: "Controls whether the dropdown is open or closed",
    },
    {
      name: "selectedOption",
      type: "Option | undefined",
      initialValue: "undefined",
      description: "The currently selected option object",
    },
  ];

  // Searchable select state
  const searchableSelectState: StateItem[] = [
    ...basicSelectState,
    {
      name: "searchQuery",
      type: "string",
      initialValue: '""',
      description: "The current search query entered by the user",
    },
  ];

  // Multi-select state
  const multiSelectState: StateItem[] = [
    {
      name: "open",
      type: "boolean",
      initialValue: "false",
      description: "Controls whether the dropdown is open or closed",
    },
    {
      name: "selectedOptions",
      type: "Option[]",
      initialValue: "[]",
      description: "Array of currently selected option objects",
    },
    {
      name: "searchQuery",
      type: "string",
      initialValue: '""',
      description: "The current search query entered by the user",
    },
  ];

  // Event handlers
  const basicSelectEvents: EventHandler[] = [
    {
      name: "onChange",
      type: "(value: string) => void",
      description: "Called when the selected value changes",
      example: "onChange={(value) => setValue(value)}",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description: "Called when the dropdown opens or closes",
      example: "onOpenChange={(open) => setIsOpen(open)}",
    },
  ];

  // Multi-select events
  const multiSelectEvents: EventHandler[] = [
    {
      name: "onChange",
      type: "(value: string[]) => void",
      description: "Called when the selected values change",
      example: "onChange={(values) => setValues(values)}",
    },
    {
      name: "onOpenChange",
      type: "(open: boolean) => void",
      description: "Called when the dropdown opens or closes",
      example: "onOpenChange={(open) => setIsOpen(open)}",
    },
    {
      name: "onRemove",
      type: "(value: string) => void",
      description: "Called when an item is removed from selection",
      example: "onRemove={(value) => handleRemove(value)}",
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
      description: "Visual indicators when the select is focused",
      properties: ["focusRingColor", "focusRingWidth", "focusTransition"],
    },
    {
      name: "Dropdown Styling",
      description: "Customization of the dropdown menu appearance",
      properties: [
        "dropdownBackground",
        "optionHoverColor",
        "selectedOptionStyle",
      ],
    },
  ];

  // Accessibility considerations
  const accessibilityItems: AccessibilityItem[] = [
    {
      type: "ARIA Attributes",
      description:
        "Uses aria-expanded, aria-controls, aria-haspopup for dropdown functionality and aria-invalid for error states",
      importance: "critical",
    },
    {
      type: "Keyboard Navigation",
      description:
        "Supports arrow keys for navigation, Enter/Space for selection, and Escape to close dropdown",
      importance: "important",
    },
    {
      type: "Screen Readers",
      description:
        "Announces selected options and error messages to screen readers",
      importance: "important",
    },
    {
      type: "Focus Management",
      description:
        "Maintains focus within the dropdown when open and returns focus to trigger when closed",
      importance: "important",
    },
    {
      type: "Chip Interaction",
      description:
        "In multi-select mode, chips can be removed via keyboard with Delete or Backspace",
      importance: "recommended",
    },
  ];

  // Code examples
  const basicSelectExample = `import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/polymet/components/select';
import { useState } from 'react';

export default function BasicSelectExample() {
  const [value, setValue] = useState('');
  
  const options = [
    { value: 'stanley', label: 'Stanley Black & Decker' },
    { value: 'draper', label: 'Draper Tools' },
    { value: 'faithfull', label: 'Faithfull Tools' },
    { value: 'ox', label: 'OX Tools' }
  ];
  
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a supplier" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Suppliers</SelectLabel>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}`;

  const searchableSelectExample = `import { SearchableSelect } from '@/polymet/components/select';
import { useState } from 'react';

export default function SearchableSelectExample() {
  const [value, setValue] = useState('');
  
  const options = [
    { value: 'stanley', label: 'Stanley Black & Decker' },
    { value: 'draper', label: 'Draper Tools' },
    { value: 'faithfull', label: 'Faithfull Tools' },
    { value: 'ox', label: 'OX Tools' }
  ];
  
  return (
    <SearchableSelect
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Search suppliers..."
    />
  );
}`;

  const multiSelectExample = `import { MultiSelect } from '@/polymet/components/select';
import { useState } from 'react';

export default function MultiSelectExample() {
  const [values, setValues] = useState<string[]>([]);
  
  const options = [
    { value: 'stanley', label: 'Stanley Black & Decker' },
    { value: 'draper', label: 'Draper Tools' },
    { value: 'faithfull', label: 'Faithfull Tools' },
    { value: 'ox', label: 'OX Tools' }
  ];
  
  return (
    <MultiSelect
      options={options}
      value={values}
      onChange={setValues}
      placeholder="Select multiple suppliers"
      maxItems={3}
    />
  );
}`;

  // Get the current component data based on active tab
  const getCurrentProps = () => {
    switch (activeTab) {
      case "searchable-select":
        return searchableSelectProps;
      case "multi-select":
        return multiSelectProps;
      default:
        return basicSelectProps;
    }
  };

  const getCurrentState = () => {
    switch (activeTab) {
      case "searchable-select":
        return searchableSelectState;
      case "multi-select":
        return multiSelectState;
      default:
        return basicSelectState;
    }
  };

  const getCurrentEvents = () => {
    switch (activeTab) {
      case "multi-select":
        return multiSelectEvents;
      default:
        return basicSelectEvents;
    }
  };

  const getCurrentExample = () => {
    switch (activeTab) {
      case "searchable-select":
        return searchableSelectExample;
      case "multi-select":
        return multiSelectExample;
      default:
        return basicSelectExample;
    }
  };

  const getCurrentImport = () => {
    switch (activeTab) {
      case "searchable-select":
        return "import { SearchableSelect } from '@/polymet/components/select';";
      case "multi-select":
        return "import { MultiSelect } from '@/polymet/components/select';";
      default:
        return "import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/polymet/components/select';";
    }
  };

  const getCurrentComponentName = () => {
    switch (activeTab) {
      case "searchable-select":
        return "SearchableSelect";
      case "multi-select":
        return "MultiSelect";
      default:
        return "Select";
    }
  };

  const getCurrentDescription = () => {
    switch (activeTab) {
      case "searchable-select":
        return "A specialized select component with built-in search functionality for filtering options.";
      case "multi-select":
        return "A specialized select component that allows selecting multiple options with chip display.";
      default:
        return "A basic select component for choosing a single option from a dropdown list.";
    }
  };

  const options = [
    { value: "stanley", label: "Stanley Black & Decker" },
    { value: "draper", label: "Draper Tools" },
    { value: "faithfull", label: "Faithfull Tools", disabled: true },
    { value: "ox", label: "OX Tools" },
    { value: "dewalt", label: "DeWalt" },
    { value: "makita", label: "Makita" },
    { value: "milwaukee", label: "Milwaukee" },
    { value: "bosch", label: "Bosch" },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Select Component API Documentation
        </h1>
        <p className="text-muted-foreground">
          Comprehensive API documentation for select components in the
          BuildConnect application, including props, state management, theme
          customization, and accessibility considerations.
        </p>
      </div>

      <Tabs
        defaultValue="basic-select"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mb-8"
      >
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="basic-select">Basic Select</TabsTrigger>
          <TabsTrigger value="searchable-select">Searchable Select</TabsTrigger>
          <TabsTrigger value="multi-select">Multi Select</TabsTrigger>
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
                          {getCurrentEvents().map((event) => (
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
                  {activeTab === "basic-select" && (
                    <Select value={basicValue} onValueChange={setBasicValue}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Suppliers</SelectLabel>
                          {options.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              disabled={option.disabled}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}

                  {activeTab === "searchable-select" && (
                    <SearchableSelect
                      options={options}
                      value={searchValue}
                      onChange={setSearchValue}
                      placeholder="Search suppliers..."
                    />
                  )}

                  {activeTab === "multi-select" && (
                    <MultiSelect
                      options={options}
                      value={multiValue}
                      onChange={setMultiValue}
                      placeholder="Select multiple suppliers"
                    />
                  )}
                </div>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <h3 className="text-lg font-medium mb-4">States</h3>
                <div className="space-y-6">
                  {activeTab === "basic-select" && (
                    <>
                      <Select value="stanley">
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {options.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <div className="border border-red-500 rounded-md">
                        <Select>
                          <SelectTrigger className="w-full border-red-500 focus:ring-red-500">
                            <SelectValue placeholder="Error state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {options.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-red-500 px-3 py-1">
                          Please select a supplier
                        </p>
                      </div>
                      <Select disabled>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Disabled state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {options.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </>
                  )}

                  {activeTab === "searchable-select" && (
                    <>
                      <SearchableSelect
                        options={options}
                        value="stanley"
                        onChange={() => {}}
                      />

                      <SearchableSelect
                        options={options}
                        value=""
                        onChange={() => {}}
                        error="Please select a supplier"
                      />

                      <SearchableSelect
                        options={options}
                        value=""
                        onChange={() => {}}
                        disabled
                      />
                    </>
                  )}

                  {activeTab === "multi-select" && (
                    <>
                      <MultiSelect
                        options={options}
                        value={["stanley", "dewalt"]}
                        onChange={() => {}}
                      />

                      <MultiSelect
                        options={options}
                        value={[]}
                        onChange={() => {}}
                        error="Please select at least one supplier"
                      />

                      <MultiSelect
                        options={options}
                        value={["stanley", "dewalt"]}
                        onChange={() => {}}
                        maxItems={3}
                      />

                      <MultiSelect
                        options={options}
                        value={["stanley"]}
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
                  <li>
                    Always provide descriptive labels for select components
                  </li>
                  <li>
                    Use searchable select for lists with more than 10 options
                  </li>
                  <li>Display clear error messages for validation failures</li>
                  <li>
                    Use multi-select when users need to select multiple items
                  </li>
                  <li>
                    Consider using the maxItems prop to limit selections when
                    appropriate
                  </li>
                  <li>
                    Group related options using SelectGroup and SelectLabel
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Tabs>

      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">Component Relationships</h2>
        <div className="p-6 border rounded-lg bg-muted/30">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-3">Component Hierarchy</h3>
              <div className="space-y-2">
                <div className="p-3 border rounded-md bg-card">
                  <div className="font-medium">Select (Base)</div>
                  <div className="text-sm text-muted-foreground">
                    Core select functionality
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pl-6">
                  <div className="p-3 border rounded-md bg-card">
                    <div className="font-medium">Basic Select</div>
                    <div className="text-sm text-muted-foreground">
                      Uses Select primitives
                    </div>
                  </div>
                  <div className="p-3 border rounded-md bg-card">
                    <div className="font-medium">SearchableSelect</div>
                    <div className="text-sm text-muted-foreground">
                      Uses Command component
                    </div>
                  </div>
                  <div className="p-3 border rounded-md bg-card">
                    <div className="font-medium">MultiSelect</div>
                    <div className="text-sm text-muted-foreground">
                      Uses Command + Badge
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

                  <span>Dropdown selection interface</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />

                  <span>Error states with validation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />

                  <span>Keyboard navigation support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />

                  <span>Disabled states for options and component</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />

                  <span>Customizable placeholder text</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />

                  <span>Consistent styling across variants</span>
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
              <InfoIcon className="h-5 w-5 inline-block mr-2 text-amber-500" />
              Known Limitations
            </h3>
            <ul className="space-y-2 list-disc pl-5">
              <li>Basic Select doesn't support searching through options</li>
              <li>
                MultiSelect chips may overflow on small containers with many
                selections
              </li>
              <li>Custom option rendering requires extending the component</li>
              <li>No built-in virtualization for very large option lists</li>
            </ul>
          </div>

          <div className="p-6 border rounded-lg bg-card">
            <h3 className="text-lg font-medium mb-3">
              <InfoIcon className="h-5 w-5 inline-block mr-2 text-blue-500" />
              Future Enhancements
            </h3>
            <ul className="space-y-2 list-disc pl-5">
              <li>Option grouping for SearchableSelect and MultiSelect</li>
              <li>
                Virtualized option lists for performance with large datasets
              </li>
              <li>Custom option and selected value rendering</li>
              <li>Async loading of options with loading states</li>
              <li>Creatable select for adding new options on the fly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
