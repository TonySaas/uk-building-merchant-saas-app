import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextInput } from "@/polymet/components/text-input";
import { NumberInput } from "@/polymet/components/number-input";
import { TextareaInput } from "@/polymet/components/textarea-input";
import { PasswordInput } from "@/polymet/components/password-input";
import { EmailInput } from "@/polymet/components/email-input";
import { PhoneInput } from "@/polymet/components/phone-input";
import {
  UserIcon,
  BuildingIcon,
  MessageSquareIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from "lucide-react";

export default function InputShowcase() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    quantity: 1,
    message: "",
    password: "",
    email: "",
    phone: "",
  });

  const handleChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [field]: e.target.value,
      });
    };

  const handleNumberChange = (value: number) => {
    setFormData({
      ...formData,
      quantity: value,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        BuildConnect Input Components
      </h1>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="number">Number</TabsTrigger>
          <TabsTrigger value="textarea">Textarea</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="phone">Phone</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Text Inputs</CardTitle>
                <CardDescription>Standard text input fields</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <TextInput
                  label="Name"
                  placeholder="Enter your name"
                  startIcon={<UserIcon className="h-4 w-4" />}
                  value={formData.name}
                  onChange={handleChange("name")}
                />

                <TextInput
                  label="Company"
                  placeholder="Enter company name"
                  startIcon={<BuildingIcon className="h-4 w-4" />}
                  value={formData.company}
                  onChange={handleChange("company")}
                />

                <div className="grid grid-cols-2 gap-4">
                  <TextInput
                    label="Error State"
                    placeholder="Error example"
                    error="This field is required"
                  />

                  <TextInput
                    label="Success State"
                    placeholder="Success example"
                    success
                    value="Valid input"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Number Input</CardTitle>
                <CardDescription>Input for numeric values</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <NumberInput
                  label="Quantity"
                  placeholder="Enter quantity"
                  min={1}
                  max={100}
                  value={formData.quantity}
                  onValueChange={handleNumberChange}
                />

                <div className="grid grid-cols-2 gap-4">
                  <NumberInput
                    label="Both-sides Controls"
                    placeholder="Enter a number"
                    controlsPosition="both-sides"
                    defaultValue={10}
                  />

                  <NumberInput
                    label="No Decimals"
                    placeholder="Whole numbers"
                    allowDecimals={false}
                    defaultValue={42}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Textarea Input</CardTitle>
                <CardDescription>Multi-line text input</CardDescription>
              </CardHeader>
              <CardContent>
                <TextareaInput
                  label="Message"
                  placeholder="Enter your message"
                  rows={4}
                  maxLength={200}
                  showCharacterCount
                  value={formData.message}
                  onChange={handleChange("message")}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Password Input</CardTitle>
                <CardDescription>
                  Secure password entry with toggle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                  strengthIndicator
                  value={formData.password}
                  onChange={handleChange("password")}
                />

                <div className="grid grid-cols-2 gap-4">
                  <PasswordInput
                    label="Without Toggle"
                    placeholder="Hidden password"
                    showToggle={false}
                  />

                  <PasswordInput
                    label="With Error"
                    placeholder="Password"
                    error="Too weak"
                    value="123"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Input</CardTitle>
                <CardDescription>Input with email validation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <EmailInput
                  label="Email Address"
                  placeholder="name@company.com"
                  validateOnChange
                  value={formData.email}
                  onChange={handleChange("email")}
                />

                <div className="grid grid-cols-2 gap-4">
                  <EmailInput
                    label="Invalid Email"
                    placeholder="name@company.com"
                    value="invalid-email"
                    validateOnBlur
                  />

                  <EmailInput
                    label="Valid Email"
                    placeholder="name@company.com"
                    value="valid@example.com"
                    success
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Phone Input</CardTitle>
                <CardDescription>
                  Input with country code selection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <PhoneInput
                  label="Phone Number"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange("phone")}
                />

                <div className="grid grid-cols-2 gap-4">
                  <PhoneInput
                    label="UK Number"
                    placeholder="20 1234 5678"
                    defaultCountryCode="+44"
                  />

                  <PhoneInput
                    label="No Country Code"
                    placeholder="(555) 123-4567"
                    showCountryCode={false}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="text">
          <Card>
            <CardHeader>
              <CardTitle>Text Input Variations</CardTitle>
              <CardDescription>
                Different styles and states for text inputs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <TextInput
                label="Standard Text Input"
                placeholder="Enter text here"
              />

              <TextInput
                label="With Icon"
                placeholder="Enter your name"
                startIcon={<UserIcon className="h-4 w-4" />}
              />

              <TextInput
                label="Non-floating Label"
                placeholder="Static label above input"
                floatingLabel={false}
              />

              <TextInput
                label="With Helper Text"
                placeholder="Enter text"
                helperText="This is some helpful information about this field"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Required Field"
                  placeholder="This field is required"
                  required
                />

                <TextInput
                  label="Disabled Field"
                  placeholder="Cannot be edited"
                  disabled
                  value="Disabled input"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Error State"
                  placeholder="Error example"
                  error="This field is required"
                  startIcon={
                    <AlertCircleIcon className="h-4 w-4 text-red-500" />
                  }
                />

                <TextInput
                  label="Success State"
                  placeholder="Success example"
                  success
                  value="Valid input"
                  startIcon={
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="number">
          <Card>
            <CardHeader>
              <CardTitle>Number Input Variations</CardTitle>
              <CardDescription>
                Different styles and controls for number inputs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <NumberInput
                label="Standard Number Input"
                placeholder="Enter a number"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NumberInput
                  label="With Min/Max/Step"
                  placeholder="Enter a number"
                  min={0}
                  max={100}
                  step={5}
                  defaultValue={25}
                  helperText="Min: 0, Max: 100, Step: 5"
                />

                <NumberInput
                  label="Decimal Number"
                  placeholder="Enter a decimal"
                  step={0.1}
                  defaultValue={7.5}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NumberInput
                  label="Controls on Both Sides"
                  placeholder="Enter a number"
                  controlsPosition="both-sides"
                  defaultValue={10}
                />

                <NumberInput
                  label="No Decimals Allowed"
                  placeholder="Enter a whole number"
                  allowDecimals={false}
                  defaultValue={42}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NumberInput
                  label="Without Controls"
                  placeholder="Enter a number"
                  showControls={false}
                />

                <NumberInput
                  label="Disabled"
                  placeholder="Cannot be edited"
                  disabled
                  defaultValue={25}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NumberInput
                  label="Error State"
                  placeholder="Enter a number"
                  error="Value must be between 1-100"
                  defaultValue={150}
                />

                <NumberInput
                  label="Success State"
                  placeholder="Enter a number"
                  success
                  defaultValue={50}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="textarea">
          <Card>
            <CardHeader>
              <CardTitle>Textarea Input Variations</CardTitle>
              <CardDescription>
                Multi-line text input with different configurations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <TextareaInput
                label="Standard Textarea"
                placeholder="Enter your message"
              />

              <TextareaInput
                label="With Helper Text"
                placeholder="Enter product description"
                helperText="Provide a detailed description of the product"
              />

              <TextareaInput
                label="With Character Counter"
                placeholder="Limited to 100 characters"
                maxLength={100}
                showCharacterCount
                defaultValue="This is a sample text that demonstrates the character counter functionality in the textarea component."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextareaInput
                  label="Taller Textarea"
                  placeholder="More space for longer content"
                  rows={6}
                />

                <TextareaInput
                  label="Non-floating Label"
                  placeholder="Static label above textarea"
                  floatingLabel={false}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextareaInput
                  label="Required Field"
                  placeholder="This field is required"
                  required
                />

                <TextareaInput
                  label="Disabled"
                  placeholder="Cannot be edited"
                  disabled
                  value="This textarea is disabled and cannot be edited by the user."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextareaInput
                  label="Error State"
                  placeholder="Enter text"
                  error="Please provide more details"
                  value="Too short"
                />

                <TextareaInput
                  label="Success State"
                  placeholder="Enter text"
                  success
                  value="This is a valid description with sufficient details to meet our requirements."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password Input Variations</CardTitle>
              <CardDescription>
                Secure password entry with different configurations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <PasswordInput
                label="Standard Password Input"
                placeholder="Enter your password"
              />

              <PasswordInput
                label="With Strength Indicator"
                placeholder="Enter a strong password"
                strengthIndicator
                helperText="Use a mix of letters, numbers, and symbols"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PasswordInput
                  label="Without Toggle"
                  placeholder="Hidden password"
                  showToggle={false}
                />

                <PasswordInput
                  label="Non-floating Label"
                  placeholder="Static label above input"
                  floatingLabel={false}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PasswordInput
                  label="Required Field"
                  placeholder="Enter your password"
                  required
                />

                <PasswordInput
                  label="Disabled"
                  placeholder="Cannot be edited"
                  disabled
                  value="DisabledPassword"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PasswordInput
                  label="Error State"
                  placeholder="Enter your password"
                  error="Password must be at least 8 characters"
                  value="weak"
                />

                <PasswordInput
                  label="Strong Password Example"
                  placeholder="Enter your password"
                  strengthIndicator
                  value="StrongPassword123!"
                  success
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Input Variations</CardTitle>
              <CardDescription>Email inputs with validation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <EmailInput
                label="Standard Email Input"
                placeholder="name@company.com"
              />

              <EmailInput
                label="Validate on Change"
                placeholder="name@company.com"
                validateOnChange
                helperText="Validation happens as you type"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EmailInput
                  label="Without Icon"
                  placeholder="name@company.com"
                  startIcon={null}
                />

                <EmailInput
                  label="Non-floating Label"
                  placeholder="name@company.com"
                  floatingLabel={false}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EmailInput
                  label="Required Field"
                  placeholder="name@company.com"
                  required
                />

                <EmailInput
                  label="Disabled"
                  placeholder="name@company.com"
                  disabled
                  value="disabled@example.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EmailInput
                  label="Invalid Email"
                  placeholder="name@company.com"
                  value="invalid-email"
                  validateOnBlur
                />

                <EmailInput
                  label="Valid Email"
                  placeholder="name@company.com"
                  value="valid@example.com"
                  success
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="phone">
          <Card>
            <CardHeader>
              <CardTitle>Phone Input Variations</CardTitle>
              <CardDescription>
                Phone inputs with country code selection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <PhoneInput
                label="Standard Phone Input"
                placeholder="(555) 123-4567"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PhoneInput
                  label="UK Phone Number"
                  placeholder="20 1234 5678"
                  defaultCountryCode="+44"
                />

                <PhoneInput
                  label="German Phone Number"
                  placeholder="30 1234 5678"
                  defaultCountryCode="+49"
                />
              </div>

              <PhoneInput
                label="Without Country Code"
                placeholder="(555) 123-4567"
                showCountryCode={false}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PhoneInput
                  label="Required Field"
                  placeholder="(555) 123-4567"
                  required
                />

                <PhoneInput
                  label="Disabled"
                  placeholder="(555) 123-4567"
                  disabled
                  value="555-123-4567"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PhoneInput
                  label="Invalid Phone"
                  placeholder="(555) 123-4567"
                  value="555-123"
                  validateOnBlur
                />

                <PhoneInput
                  label="Valid Phone"
                  placeholder="(555) 123-4567"
                  value="555-123-4567"
                  success
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
