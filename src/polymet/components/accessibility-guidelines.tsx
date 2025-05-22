import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, CheckIcon, AlertTriangleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AccessibilityGuidelines() {
  const [showCode, setShowCode] = useState<Record<string, boolean>>({
    textInput: false,
    select: false,
    checkbox: false,
    navigation: false,
    modal: false,
    datePicker: false,
  });

  const toggleCode = (section: string) => {
    setShowCode((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Accessibility Guidelines</h1>
        <p className="text-muted-foreground">
          Comprehensive implementation guidelines for creating accessible
          components in the BuildConnect application.
        </p>
      </div>

      <Alert className="mb-8 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
        <InfoIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />

        <AlertTitle className="text-blue-800 dark:text-blue-300">
          Why Accessibility Matters
        </AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-400">
          Accessible design ensures our application is usable by everyone,
          including people with disabilities. It improves user experience,
          broadens our audience, and helps meet legal requirements.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="form">Form Controls</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="interactive">Interactive</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Principles</CardTitle>
              <CardDescription>
                Core principles for building accessible interfaces
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <span className="flex h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 items-center justify-center">
                      <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </span>
                    Perceivable
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Information and user interface components must be
                    presentable to users in ways they can perceive. This
                    includes providing text alternatives, adaptable content, and
                    distinguishable elements.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <span className="flex h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 items-center justify-center">
                      <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </span>
                    Operable
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    User interface components and navigation must be operable.
                    This includes making all functionality available from a
                    keyboard and providing users enough time to read and use
                    content.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <span className="flex h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 items-center justify-center">
                      <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </span>
                    Understandable
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Information and the operation of the user interface must be
                    understandable. This includes making text readable and
                    predictable, and helping users avoid and correct mistakes.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <span className="flex h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 items-center justify-center">
                      <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </span>
                    Robust
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Content must be robust enough to be interpreted reliably by
                    a wide variety of user agents, including assistive
                    technologies. This includes ensuring compatibility with
                    current and future tools.
                  </p>
                </div>
              </div>

              <Alert className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-900">
                <AlertTriangleIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />

                <AlertTitle className="text-amber-800 dark:text-amber-300">
                  Compliance Requirements
                </AlertTitle>
                <AlertDescription className="text-amber-700 dark:text-amber-400">
                  BuildConnect aims to meet WCAG 2.1 AA standards. All
                  components should be tested with screen readers, keyboard
                  navigation, and other assistive technologies before
                  deployment.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="form">
          <div className="grid gap-6">
            <Card id="text-input-section">
              <CardHeader>
                <CardTitle>Text Input Accessibility</CardTitle>
                <CardDescription>
                  Implementation guidelines for accessible text input fields
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">
                    Required ARIA Attributes
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        aria-invalid
                      </code>
                      : Set to true when error state is present
                    </li>
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        aria-describedby
                      </code>
                      : ID of helper/error text element
                    </li>
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        aria-required
                      </code>
                      : Set when field is required
                    </li>
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        aria-disabled
                      </code>
                      : Set when input is disabled
                    </li>
                  </ul>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleCode("textInput")}
                  className="w-full justify-center"
                >
                  {showCode.textInput
                    ? "Hide Code Example"
                    : "Show Code Example"}
                </Button>

                {showCode.textInput && (
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                    {`<div className="form-field">
  <label 
    id={\`\${id}-label\`} 
    htmlFor={id}
  >
    {label}{required && <span aria-hidden="true">*</span>}
  </label>
  
  <input
    id={id}
    name={name}
    type="text"
    value={value}
    onChange={onChange}
    disabled={disabled}
    placeholder={placeholder}
    required={required}
    aria-invalid={!!error}
    aria-describedby={error ? \`\${id}-error\` : \`\${id}-helper\`}
    aria-required={required}
    aria-disabled={disabled}
  />
  
  {error ? (
    <div 
      id={\`\${id}-error\`} 
      className="error-text" 
      role="alert"
    >
      {error}
    </div>
  ) : helperText && (
    <div id={\`\${id}-helper\`} className="helper-text">
      {helperText}
    </div>
  )}
</div>`}
                  </pre>
                )}

                <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900">
                  <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />

                  <AlertTitle className="text-green-800 dark:text-green-300">
                    Best Practices
                  </AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-400">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Always associate labels with inputs using htmlFor/id
                      </li>
                      <li>
                        Provide clear error messages that explain how to fix the
                        issue
                      </li>
                      <li>
                        Use role="alert" for error messages to announce them to
                        screen readers
                      </li>
                      <li>
                        Ensure sufficient color contrast for text and borders
                      </li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card id="select-section">
              <CardHeader>
                <CardTitle>Select Dropdown Accessibility</CardTitle>
                <CardDescription>
                  Implementation guidelines for accessible select dropdowns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">
                    Required ARIA Attributes
                  </h3>
                  <h4 className="text-md font-medium mt-4">Main component</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        role="combobox"
                      </code>
                      : Identifies the element as a combobox
                    </li>
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        aria-expanded
                      </code>
                      : Indicates if dropdown is open
                    </li>
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        aria-haspopup="listbox"
                      </code>
                      : Indicates it has a popup listbox
                    </li>
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        aria-controls
                      </code>
                      : ID of the dropdown list
                    </li>
                  </ul>

                  <h4 className="text-md font-medium mt-4">
                    Dropdown container
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        role="listbox"
                      </code>
                      : Identifies the element as a listbox
                    </li>
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        aria-labelledby
                      </code>
                      : ID of the label
                    </li>
                  </ul>

                  <h4 className="text-md font-medium mt-4">Option items</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        role="option"
                      </code>
                      : Identifies the element as an option
                    </li>
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        aria-selected
                      </code>
                      : If the option is currently selected
                    </li>
                  </ul>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleCode("select")}
                  className="w-full justify-center"
                >
                  {showCode.select ? "Hide Code Example" : "Show Code Example"}
                </Button>

                {showCode.select && (
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                    {`<div className="select-container">
  <label id={\`\${id}-label\`} htmlFor={id}>
    {label}{required && <span aria-hidden="true">*</span>}
  </label>
  
  <button
    id={id}
    className="select-button"
    aria-haspopup="listbox"
    aria-expanded={isOpen}
    aria-labelledby={\`\${id}-label\`}
    aria-controls={\`\${id}-listbox\`}
    aria-invalid={!!error}
    aria-required={required}
    aria-disabled={disabled}
    onClick={() => !disabled && setIsOpen(!isOpen)}
    disabled={disabled}
  >
    {selectedOption ? selectedOption.label : placeholder}
  </button>
  
  {isOpen && (
    <ul
      id={\`\${id}-listbox\`}
      role="listbox"
      aria-labelledby={\`\${id}-label\`}
      className="options-list"
    >
      {options.map((option) => (
        <li
          key={option.value}
          role="option"
          id={\`\${id}-option-\${option.value}\`}
          aria-selected={value === option.value}
          onClick={() => handleOptionSelect(option.value)}
          className={value === option.value ? 'selected' : ''}
        >
          {option.label}
        </li>
      ))}
    </ul>
  )}
  
  {error && (
    <div id={\`\${id}-error\`} className="error-text" role="alert">
      {error}
    </div>
  )}
</div>`}
                  </pre>
                )}

                <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900">
                  <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />

                  <AlertTitle className="text-green-800 dark:text-green-300">
                    Best Practices
                  </AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-400">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Support keyboard navigation (arrow keys, Enter, Escape)
                      </li>
                      <li>
                        Ensure dropdown is positioned correctly and doesn't get
                        cut off
                      </li>
                      <li>Announce selection changes to screen readers</li>
                      <li>
                        Provide visual focus indicators for keyboard navigation
                      </li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card id="checkbox-section">
              <CardHeader>
                <CardTitle>Checkbox and Radio Accessibility</CardTitle>
                <CardDescription>
                  Implementation guidelines for accessible checkbox and radio
                  inputs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">
                    Required ARIA Attributes
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        role="checkbox"
                      </code>{" "}
                      or{" "}
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        role="radio"
                      </code>
                      : Explicit role
                    </li>
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        aria-checked
                      </code>
                      : Current checked state
                    </li>
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        aria-disabled
                      </code>
                      : Disabled state
                    </li>
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        aria-labelledby
                      </code>
                      : ID of label element
                    </li>
                  </ul>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleCode("checkbox")}
                  className="w-full justify-center"
                >
                  {showCode.checkbox
                    ? "Hide Code Example"
                    : "Show Code Example"}
                </Button>

                {showCode.checkbox && (
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                    {`<div className="checkbox-container">
  <input
    type="checkbox"
    id={id}
    name={name}
    checked={checked}
    onChange={onChange}
    disabled={disabled}
    className="sr-only" // Visually hidden but accessible
  />
  
  <label 
    htmlFor={id}
    className="checkbox-label"
  >
    <span 
      className={\`checkbox-custom \${checked ? 'checked' : ''}\`}
      aria-hidden="true"
    >
      {checked && <CheckIcon />}
    </span>
    <span className="checkbox-text">{label}</span>
  </label>
</div>`}
                  </pre>
                )}

                <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900">
                  <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />

                  <AlertTitle className="text-green-800 dark:text-green-300">
                    Best Practices
                  </AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-400">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Use native input elements with sr-only class for
                        accessibility
                      </li>
                      <li>
                        Ensure large enough click/touch target area (min
                        44x44px)
                      </li>
                      <li>Support keyboard activation with Space key</li>
                      <li>Provide visual focus indicators</li>
                      <li>For groups, use fieldset and legend for context</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="navigation">
          <div className="grid gap-6">
            <Card id="header-navigation-section">
              <CardHeader>
                <CardTitle>Header Navigation Accessibility</CardTitle>
                <CardDescription>
                  Implementation guidelines for accessible navigation menus
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">
                    Required ARIA Attributes
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        role="navigation"
                      </code>
                      : Navigation landmark role
                    </li>
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        aria-label
                      </code>
                      : Description of navigation purpose
                    </li>
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        aria-current="page"
                      </code>
                      : Indicates current page link
                    </li>
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        aria-expanded
                      </code>
                      : For dropdown menus
                    </li>
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        aria-controls
                      </code>
                      : For dropdown menus
                    </li>
                  </ul>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleCode("navigation")}
                  className="w-full justify-center"
                >
                  {showCode.navigation
                    ? "Hide Code Example"
                    : "Show Code Example"}
                </Button>

                {showCode.navigation && (
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                    {`<nav 
  role="navigation" 
  aria-label="Main navigation"
  className="main-header-nav"
>
  <ul className="nav-list">
    <li>
      <a 
        href="/"
        aria-current={currentPath === '/' ? 'page' : undefined}
      >
        Home
      </a>
    </li>
    <li>
      <a 
        href="/documentation"
        aria-current={currentPath === '/documentation' ? 'page' : undefined}
      >
        Documentation
      </a>
    </li>
    <li>
      <button 
        onClick={openLoginModal}
        aria-haspopup="dialog"
      >
        Login
      </button>
    </li>
  </ul>
</nav>`}
                  </pre>
                )}

                <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900">
                  <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />

                  <AlertTitle className="text-green-800 dark:text-green-300">
                    Best Practices
                  </AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-400">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Use semantic HTML elements (nav, ul, li, a)</li>
                      <li>Ensure keyboard navigability (Tab key)</li>
                      <li>Provide clear visual focus indicators</li>
                      <li>
                        For mobile menus, use aria-expanded and aria-controls
                      </li>
                      <li>
                        Ensure sufficient contrast for text and backgrounds
                      </li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card id="modal-dialog-section">
              <CardHeader>
                <CardTitle>Modal Dialog Accessibility</CardTitle>
                <CardDescription>
                  Implementation guidelines for accessible modal dialogs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">
                    Required ARIA Attributes
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        role="dialog"
                      </code>
                      : Dialog role
                    </li>
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        aria-modal="true"
                      </code>
                      : Indicates it's a modal
                    </li>
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        aria-labelledby
                      </code>
                      : ID of the modal title
                    </li>
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        aria-describedby
                      </code>
                      : ID of the modal description
                    </li>
                  </ul>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleCode("modal")}
                  className="w-full justify-center"
                >
                  {showCode.modal ? "Hide Code Example" : "Show Code Example"}
                </Button>

                {showCode.modal && (
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                    {`// Modal component
{isOpen && (
  <>
    <div 
      className="modal-backdrop" 
      onClick={closeModal}
      aria-hidden="true"
    />
    
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={\`\${id}-title\`}
      aria-describedby={\`\${id}-description\`}
      className="modal"
    >
      <div className="modal-header">
        <h2 id={\`\${id}-title\`}>{title}</h2>
        <button
          className="close-button"
          onClick={closeModal}
          aria-label="Close"
        >
          <CloseIcon aria-hidden="true" />
        </button>
      </div>
      
      <div id={\`\${id}-description\`} className="modal-body">
        {children}
      </div>
      
      <div className="modal-footer">
        {footerContent}
      </div>
    </div>
  </>
)}`}
                  </pre>
                )}

                <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900">
                  <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />

                  <AlertTitle className="text-green-800 dark:text-green-300">
                    Best Practices
                  </AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-400">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Trap focus within the modal when open</li>
                      <li>
                        Return focus to the triggering element when closed
                      </li>
                      <li>Allow closing with Escape key</li>
                      <li>
                        Ensure modal is announced to screen readers when opened
                      </li>
                      <li>
                        Use aria-hidden="true" on page content behind the modal
                      </li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="interactive">
          <div className="grid gap-6">
            <Card id="date-picker-section">
              <CardHeader>
                <CardTitle>Date Picker Accessibility</CardTitle>
                <CardDescription>
                  Implementation guidelines for accessible date pickers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">
                    Required ARIA Attributes
                  </h3>

                  <h4 className="text-md font-medium mt-4">
                    Calendar container
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        role="application"
                      </code>
                      : Application role
                    </li>
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        aria-label
                      </code>
                      : Description (e.g., "Date picker")
                    </li>
                  </ul>

                  <h4 className="text-md font-medium mt-4">
                    Month/year selection
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        aria-live="polite"
                      </code>
                      : For announcing changes
                    </li>
                  </ul>

                  <h4 className="text-md font-medium mt-4">Calendar grid</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        role="grid"
                      </code>
                      : Grid role
                    </li>
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        aria-labelledby
                      </code>
                      : ID of month/year heading
                    </li>
                  </ul>

                  <h4 className="text-md font-medium mt-4">Calendar days</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        role="gridcell"
                      </code>
                      : Grid cell role
                    </li>
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        aria-selected
                      </code>
                      : If day is selected
                    </li>
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        aria-disabled
                      </code>
                      : If day is not selectable
                    </li>
                    <li>
                      <code className="text-sm bg-muted px-1 py-0.5 rounded">
                        aria-current="date"
                      </code>
                      : For today's date
                    </li>
                  </ul>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleCode("datePicker")}
                  className="w-full justify-center"
                >
                  {showCode.datePicker
                    ? "Hide Code Example"
                    : "Show Code Example"}
                </Button>

                {showCode.datePicker && (
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                    {`<div 
  role="application"
  aria-label="Date picker"
  className="date-picker"
>
  <div className="date-picker-header">
    <button
      aria-label="Previous month"
      onClick={previousMonth}
    >
      <ChevronLeftIcon aria-hidden="true" />
    </button>
    
    <div 
      aria-live="polite"
      className="current-month-year"
    >
      {format(currentMonth, 'MMMM yyyy')}
    </div>
    
    <button
      aria-label="Next month"
      onClick={nextMonth}
    >
      <ChevronRightIcon aria-hidden="true" />
    </button>
  </div>
  
  <table 
    role="grid"
    aria-labelledby="calendar-heading"
    className="calendar"
  >
    <thead>
      <tr>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <th key={day} scope="col">{day}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {weeks.map((week, i) => (
        <tr key={i}>
          {week.map((day, j) => (
            <td 
              key={j}
              role="gridcell"
              aria-selected={isSelected(day)}
              aria-disabled={isDisabled(day)}
              aria-current={isToday(day) ? 'date' : undefined}
            >
              <button
                onClick={() => selectDate(day)}
                disabled={isDisabled(day)}
                className={getDateClassName(day)}
              >
                {day.getDate()}
              </button>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>`}
                  </pre>
                )}

                <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900">
                  <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />

                  <AlertTitle className="text-green-800 dark:text-green-300">
                    Best Practices
                  </AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-400">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Support keyboard navigation (arrow keys, Page Up/Down,
                        Home/End)
                      </li>
                      <li>Announce month/year changes to screen readers</li>
                      <li>
                        Provide clear visual indicators for selected, today, and
                        disabled dates
                      </li>
                      <li>
                        Allow direct date input via text field as an alternative
                      </li>
                      <li>Ensure date format is clear and consistent</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Accessibility</CardTitle>
              <CardDescription>
                Guidelines for making content accessible to all users
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Text Content</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Use clear, simple language</li>
                    <li>Structure content with proper headings (h1-h6)</li>
                    <li>Maintain logical reading order</li>
                    <li>Use sufficient text contrast (minimum 4.5:1 ratio)</li>
                    <li>Avoid using color alone to convey meaning</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Images and Media</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Provide alt text for all images</li>
                    <li>Use captions and transcripts for videos</li>
                    <li>Ensure media controls are keyboard accessible</li>
                    <li>Avoid auto-playing media with sound</li>
                    <li>Provide alternatives for complex visualizations</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Links and Buttons</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Use descriptive link text (avoid "click here")</li>
                    <li>
                      Ensure links are distinguishable (not by color alone)
                    </li>
                    <li>Provide sufficient touch target size (min 44x44px)</li>
                    <li>Use button element for actions, a for navigation</li>
                    <li>Maintain consistent focus indicators</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Tables and Lists</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Use proper table markup with headers</li>
                    <li>Include table captions and summaries</li>
                    <li>Use appropriate list elements (ul, ol, dl)</li>
                    <li>Ensure tables are responsive on small screens</li>
                    <li>Provide row/column headers for data tables</li>
                  </ul>
                </div>
              </div>

              <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
                <InfoIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />

                <AlertTitle className="text-blue-800 dark:text-blue-300">
                  Content Structure
                </AlertTitle>
                <AlertDescription className="text-blue-700 dark:text-blue-400">
                  Proper content structure with semantic HTML elements helps
                  users navigate with assistive technologies. Use landmarks
                  (header, nav, main, footer) and appropriate heading levels to
                  create a clear document outline.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Testing</CardTitle>
              <CardDescription>
                Methods and tools for testing accessibility compliance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Automated Testing</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Use axe-core for automated accessibility testing</li>
                    <li>Integrate accessibility tests in CI/CD pipeline</li>
                    <li>Run Lighthouse accessibility audits</li>
                    <li>Use WAVE or similar browser extensions</li>
                    <li>Check color contrast with WebAIM contrast checker</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Manual Testing</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Test with keyboard navigation only</li>
                    <li>Test with screen readers (NVDA, VoiceOver, JAWS)</li>
                    <li>Test with screen magnifiers</li>
                    <li>Test with different color contrast settings</li>
                    <li>Test with text-only browsers or reader modes</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">User Testing</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Include users with disabilities in testing</li>
                    <li>Test with different assistive technologies</li>
                    <li>Gather feedback on usability and accessibility</li>
                    <li>Observe real-world usage patterns</li>
                    <li>Iterate based on user feedback</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Compliance Checklist</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>WCAG 2.1 AA compliance checklist</li>
                    <li>Section 508 compliance (for government projects)</li>
                    <li>ADA compliance requirements</li>
                    <li>Regular accessibility audits</li>
                    <li>Documentation of accessibility features</li>
                  </ul>
                </div>
              </div>

              <Alert className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-900">
                <AlertTriangleIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />

                <AlertTitle className="text-amber-800 dark:text-amber-300">
                  Testing Limitations
                </AlertTitle>
                <AlertDescription className="text-amber-700 dark:text-amber-400">
                  Automated testing can only catch about 30-40% of accessibility
                  issues. Always combine automated testing with manual testing
                  and user testing for comprehensive coverage.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
