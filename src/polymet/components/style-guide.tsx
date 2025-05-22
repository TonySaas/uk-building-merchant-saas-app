import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRightIcon,
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  SunIcon,
  MoonIcon,
} from "lucide-react";

export default function StyleGuide() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-extrabold tracking-tight">
        BuildConnect Style Guide
      </h1>

      {/* Typography */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Typography</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-8">
              <div>
                <h6 className="mb-2 text-sm font-medium text-muted-foreground">
                  Headings
                </h6>
                <div className="space-y-4">
                  <div>
                    <h1 className="text-4xl font-extrabold tracking-tight">
                      H1: Connecting the UK Building Merchant Ecosystem
                    </h1>
                    <code className="mt-1 block text-xs text-muted-foreground">
                      text-4xl font-extrabold tracking-tight
                    </code>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">
                      H2: Organization Selector
                    </h2>
                    <code className="mt-1 block text-xs text-muted-foreground">
                      text-3xl font-bold
                    </code>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">
                      H3: Access the Platform
                    </h3>
                    <code className="mt-1 block text-xs text-muted-foreground">
                      text-2xl font-semibold
                    </code>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium">H4: Card Title</h4>
                    <code className="mt-1 block text-xs text-muted-foreground">
                      text-xl font-medium
                    </code>
                  </div>
                  <div>
                    <h5 className="text-lg font-medium">H5: Section Title</h5>
                    <code className="mt-1 block text-xs text-muted-foreground">
                      text-lg font-medium
                    </code>
                  </div>
                </div>
              </div>

              <div>
                <h6 className="mb-2 text-sm font-medium text-muted-foreground">
                  Body Text
                </h6>
                <div className="space-y-4">
                  <div>
                    <p className="text-base">
                      Body: A unified platform bringing together suppliers,
                      merchants, and consumers through exclusive special offers
                      and promotions
                    </p>
                    <code className="mt-1 block text-xs text-muted-foreground">
                      text-base
                    </code>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Small/Caption: Sign in or create an account to access your
                      portal
                    </p>
                    <code className="mt-1 block text-xs text-muted-foreground">
                      text-sm text-muted-foreground
                    </code>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Extra Small: Secure login - 256-bit SSL encryption
                    </p>
                    <code className="mt-1 block text-xs text-muted-foreground">
                      text-xs text-muted-foreground
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Color Palette */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Color Palette</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Primary Colors */}
              <div className="space-y-3">
                <h6 className="text-sm font-medium text-muted-foreground">
                  Primary Colors
                </h6>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="mr-2 h-6 w-6 rounded-full bg-primary"></div>
                    <span>Primary</span>
                    <code className="ml-auto text-xs text-muted-foreground">
                      bg-primary
                    </code>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-6 w-6 rounded-full bg-primary-foreground"></div>
                    <span>Primary Foreground</span>
                    <code className="ml-auto text-xs text-muted-foreground">
                      bg-primary-foreground
                    </code>
                  </div>
                </div>
              </div>

              {/* Background Colors */}
              <div className="space-y-3">
                <h6 className="text-sm font-medium text-muted-foreground">
                  Background Colors
                </h6>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="mr-2 h-6 w-6 rounded-full bg-background"></div>
                    <span>Background</span>
                    <code className="ml-auto text-xs text-muted-foreground">
                      bg-background
                    </code>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-6 w-6 rounded-full bg-foreground"></div>
                    <span>Foreground</span>
                    <code className="ml-auto text-xs text-muted-foreground">
                      bg-foreground
                    </code>
                  </div>
                </div>
              </div>

              {/* Accent Colors */}
              <div className="space-y-3">
                <h6 className="text-sm font-medium text-muted-foreground">
                  Accent Colors
                </h6>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="mr-2 h-6 w-6 rounded-full bg-accent"></div>
                    <span>Accent</span>
                    <code className="ml-auto text-xs text-muted-foreground">
                      bg-accent
                    </code>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-6 w-6 rounded-full bg-accent-foreground"></div>
                    <span>Accent Foreground</span>
                    <code className="ml-auto text-xs text-muted-foreground">
                      bg-accent-foreground
                    </code>
                  </div>
                </div>
              </div>

              {/* Muted Colors */}
              <div className="space-y-3">
                <h6 className="text-sm font-medium text-muted-foreground">
                  Muted Colors
                </h6>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="mr-2 h-6 w-6 rounded-full bg-muted"></div>
                    <span>Muted</span>
                    <code className="ml-auto text-xs text-muted-foreground">
                      bg-muted
                    </code>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-6 w-6 rounded-full bg-muted-foreground"></div>
                    <span>Muted Foreground</span>
                    <code className="ml-auto text-xs text-muted-foreground">
                      bg-muted-foreground
                    </code>
                  </div>
                </div>
              </div>

              {/* Brand Colors */}
              <div className="space-y-3">
                <h6 className="text-sm font-medium text-muted-foreground">
                  Brand Colors
                </h6>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="mr-2 h-6 w-6 rounded-full bg-blue-900"></div>
                    <span>Brand Blue</span>
                    <code className="ml-auto text-xs text-muted-foreground">
                      bg-blue-900
                    </code>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-6 w-6 rounded-full bg-indigo-900"></div>
                    <span>Brand Indigo</span>
                    <code className="ml-auto text-xs text-muted-foreground">
                      bg-indigo-900
                    </code>
                  </div>
                </div>
              </div>

              {/* Status Colors */}
              <div className="space-y-3">
                <h6 className="text-sm font-medium text-muted-foreground">
                  Status Colors
                </h6>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="mr-2 h-6 w-6 rounded-full bg-green-500"></div>
                    <span>Success</span>
                    <code className="ml-auto text-xs text-muted-foreground">
                      bg-green-500
                    </code>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-6 w-6 rounded-full bg-red-500"></div>
                    <span>Error</span>
                    <code className="ml-auto text-xs text-muted-foreground">
                      bg-red-500
                    </code>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 h-6 w-6 rounded-full bg-yellow-500"></div>
                    <span>Warning</span>
                    <code className="ml-auto text-xs text-muted-foreground">
                      bg-yellow-500
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Spacing System */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Spacing System</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h6 className="mb-3 text-sm font-medium text-muted-foreground">
                  Spacing Scale
                </h6>
                <div className="flex flex-wrap gap-4">
                  {[1, 2, 3, 4, 6, 8, 12, 16].map((size) => (
                    <div key={size} className="text-center">
                      <div
                        className={`bg-primary h-${size} w-${size} mx-auto mb-2 rounded`}
                      ></div>
                      <code className="text-xs text-muted-foreground">
                        {size}
                      </code>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h6 className="mb-3 text-sm font-medium text-muted-foreground">
                  Common Spacing Classes
                </h6>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-md border p-4">
                    <code className="text-xs">p-4 (padding: 1rem)</code>
                  </div>
                  <div className="rounded-md border px-4 py-2">
                    <code className="text-xs">
                      px-4 py-2 (padding-x: 1rem, padding-y: 0.5rem)
                    </code>
                  </div>
                  <div className="rounded-md border p-6">
                    <code className="text-xs">p-6 (padding: 1.5rem)</code>
                  </div>
                  <div className="rounded-md border p-8">
                    <code className="text-xs">p-8 (padding: 2rem)</code>
                  </div>
                  <div className="rounded-md border p-2">
                    <code className="text-xs">p-2 (padding: 0.5rem)</code>
                  </div>
                  <div className="rounded-md border p-3">
                    <code className="text-xs">p-3 (padding: 0.75rem)</code>
                  </div>
                </div>
              </div>

              <div>
                <h6 className="mb-3 text-sm font-medium text-muted-foreground">
                  Margin Examples
                </h6>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <div className="mb-4 h-8 w-full rounded bg-primary/20">
                      <code className="p-2 text-xs">
                        mb-4 (margin-bottom: 1rem)
                      </code>
                    </div>
                    <div className="mt-4 h-8 w-full rounded bg-primary/20">
                      <code className="p-2 text-xs">
                        mt-4 (margin-top: 1rem)
                      </code>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="flex">
                      <div className="mr-4 h-8 w-16 rounded bg-primary/20">
                        <code className="p-2 text-xs">mr-4</code>
                      </div>
                      <div className="ml-4 h-8 w-16 rounded bg-primary/20">
                        <code className="p-2 text-xs">ml-4</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Components */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Components</h2>

        {/* Buttons */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-medium">Buttons</h3>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <Button className="w-full">Primary Button</Button>
                  <code className="block text-xs text-muted-foreground">
                    {"<Button>Primary Button</Button>"}
                  </code>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Outline Button
                  </Button>
                  <code className="block text-xs text-muted-foreground">
                    {'<Button variant="outline">Outline Button</Button>'}
                  </code>
                </div>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full">
                    Ghost Button
                  </Button>
                  <code className="block text-xs text-muted-foreground">
                    {'<Button variant="ghost">Ghost Button</Button>'}
                  </code>
                </div>
                <div className="space-y-2">
                  <Button variant="link" className="w-full">
                    Link Button
                  </Button>
                  <code className="block text-xs text-muted-foreground">
                    {'<Button variant="link">Link Button</Button>'}
                  </code>
                </div>
                <div className="space-y-2">
                  <Button className="w-full">
                    <ArrowRightIcon className="mr-2 h-4 w-4" />
                    With Icon
                  </Button>
                  <code className="block text-xs text-muted-foreground">
                    {
                      '<Button><ArrowRightIcon className="mr-2 h-4 w-4" />With Icon</Button>'
                    }
                  </code>
                </div>
                <div className="space-y-2">
                  <Button disabled className="w-full">
                    Disabled Button
                  </Button>
                  <code className="block text-xs text-muted-foreground">
                    {"<Button disabled>Disabled Button</Button>"}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form Elements */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-medium">Form Elements</h3>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="name@company.com"
                      type="email"
                    />
                  </div>
                  <code className="block text-xs text-muted-foreground">
                    {`<Label htmlFor="email">Email</Label>
<Input id="email" placeholder="name@company.com" type="email" />`}
                  </code>
                </div>
                <div className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                      />

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      >
                        <EyeIcon className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                  <code className="block text-xs text-muted-foreground">
                    {`<Label htmlFor="password">Password</Label>
<div className="relative">
  <Input id="password" type="password" placeholder="••••••••" />
  <Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent">
    <EyeIcon className="h-4 w-4 text-muted-foreground" />
  </Button>
</div>`}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cards */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-medium">Cards</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is the main content of the card.</p>
              </CardContent>
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            </Card>

            <div className="space-y-2">
              <code className="block text-xs text-muted-foreground">
                {`<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>This is the main content of the card.</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`}
              </code>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-medium">Tabs</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login" className="p-4">
                    Login form content would go here
                  </TabsContent>
                  <TabsContent value="register" className="p-4">
                    Registration form content would go here
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <code className="block text-xs text-muted-foreground">
                {`<Tabs defaultValue="login" className="w-full">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="login">Login</TabsTrigger>
    <TabsTrigger value="register">Register</TabsTrigger>
  </TabsList>
  <TabsContent value="login" className="p-4">
    Login form content would go here
  </TabsContent>
  <TabsContent value="register" className="p-4">
    Registration form content would go here
  </TabsContent>
</Tabs>`}
              </code>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-medium">Badges</h3>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-4">
                <div className="space-y-2">
                  <Badge>Default</Badge>
                  <code className="block text-xs text-muted-foreground">
                    {"<Badge>Default</Badge>"}
                  </code>
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary">Secondary</Badge>
                  <code className="block text-xs text-muted-foreground">
                    {'<Badge variant="secondary">Secondary</Badge>'}
                  </code>
                </div>
                <div className="space-y-2">
                  <Badge variant="outline">Outline</Badge>
                  <code className="block text-xs text-muted-foreground">
                    {'<Badge variant="outline">Outline</Badge>'}
                  </code>
                </div>
                <div className="space-y-2">
                  <Badge variant="destructive">Destructive</Badge>
                  <code className="block text-xs text-muted-foreground">
                    {'<Badge variant="destructive">Destructive</Badge>'}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Layout Patterns */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Layout Patterns</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-8">
              <div>
                <h6 className="mb-3 text-sm font-medium text-muted-foreground">
                  Two-Column Layout (Auth)
                </h6>
                <div className="rounded-md border">
                  <div className="grid grid-cols-2 gap-4 p-4">
                    <div className="rounded-md bg-blue-900 p-4 text-white">
                      <div className="mb-2 text-center text-lg font-bold">
                        Brand Section
                      </div>
                      <div className="text-center text-sm">
                        Background gradient, logo, and description
                      </div>
                    </div>
                    <div className="rounded-md bg-background p-4">
                      <div className="mb-2 text-center text-lg font-bold">
                        Auth Content
                      </div>
                      <div className="text-center text-sm">
                        Login/Registration forms
                      </div>
                    </div>
                  </div>
                </div>
                <code className="mt-2 block text-xs text-muted-foreground">
                  {`<div className="flex min-h-screen flex-col md:flex-row">
  <div className="relative hidden w-full bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 md:block md:w-1/2">
    <!-- Brand content -->
  </div>
  <div className="flex w-full items-center justify-center bg-background p-4 md:w-1/2">
    <!-- Auth content -->
  </div>
</div>`}
                </code>
              </div>

              <div>
                <h6 className="mb-3 text-sm font-medium text-muted-foreground">
                  Main Layout
                </h6>
                <div className="rounded-md border">
                  <div className="flex flex-col">
                    <div className="border-b p-4">
                      <div className="text-center font-bold">Header</div>
                    </div>
                    <div className="min-h-[100px] p-4">
                      <div className="text-center">Main Content</div>
                    </div>
                    <div className="border-t bg-gray-900 p-4">
                      <div className="text-center text-white">Footer</div>
                    </div>
                  </div>
                </div>
                <code className="mt-2 block text-xs text-muted-foreground">
                  {`<div className="flex min-h-screen flex-col">
  <Header />
  <main className="flex-1">
    <!-- Page content -->
  </main>
  <Footer />
</div>`}
                </code>
              </div>

              <div>
                <h6 className="mb-3 text-sm font-medium text-muted-foreground">
                  Card Grid
                </h6>
                <div className="rounded-md border p-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="rounded-md border bg-card p-4 text-center"
                      >
                        Card {i}
                      </div>
                    ))}
                  </div>
                </div>
                <code className="mt-2 block text-xs text-muted-foreground">
                  {`<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {items.map((item) => (
    <Card key={item.id}>
      <!-- Card content -->
    </Card>
  ))}
</div>`}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Interaction Patterns */}
      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Interaction Patterns</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-8">
              <div>
                <h6 className="mb-3 text-sm font-medium text-muted-foreground">
                  Hover States
                </h6>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-md border p-4 transition-all hover:border-primary hover:shadow-md">
                    <div className="text-center">Hover me</div>
                    <div className="mt-2 text-center text-xs text-muted-foreground">
                      Border highlight & shadow
                    </div>
                  </div>
                  <div className="group rounded-md border p-4">
                    <div className="text-center">Hover me</div>
                    <div className="mt-2 text-center text-xs text-muted-foreground">
                      <span className="text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Show on hover
                      </span>
                    </div>
                  </div>
                  <div className="rounded-md border p-4 transition-colors hover:bg-accent">
                    <div className="text-center">Hover me</div>
                    <div className="mt-2 text-center text-xs text-muted-foreground">
                      Background change
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h6 className="mb-3 text-sm font-medium text-muted-foreground">
                  Selection States
                </h6>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-md border-2 border-primary bg-primary/5 p-4">
                    <div className="text-center font-medium">Selected Item</div>
                    <code className="mt-2 block text-center text-xs text-muted-foreground">
                      border-2 border-primary bg-primary/5
                    </code>
                  </div>
                  <div className="rounded-md border p-4">
                    <div className="text-center">Unselected Item</div>
                    <code className="mt-2 block text-center text-xs text-muted-foreground">
                      border
                    </code>
                  </div>
                </div>
              </div>

              <div>
                <h6 className="mb-3 text-sm font-medium text-muted-foreground">
                  Theme Toggle
                </h6>
                <div className="flex items-center justify-center space-x-4">
                  <Button variant="outline" size="icon">
                    <SunIcon className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <MoonIcon className="h-5 w-5" />
                  </Button>
                </div>
                <code className="mt-2 block text-center text-xs text-muted-foreground">
                  {`<Button variant="outline" size="icon" onClick={toggleTheme}>
  {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
</Button>`}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Usage Guidelines */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">Usage Guidelines</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h6 className="mb-2 text-lg font-medium">
                  Component Consistency
                </h6>
                <p className="text-muted-foreground">
                  Maintain consistent use of components across the application.
                  Use the same component for the same purpose throughout the
                  interface. For example, always use the same button style for
                  primary actions.
                </p>
              </div>

              <div>
                <h6 className="mb-2 text-lg font-medium">Spacing Rules</h6>
                <p className="text-muted-foreground">
                  Use consistent spacing between components. Maintain a rhythm
                  by using the spacing scale (4px, 8px, 16px, 24px, 32px, 48px,
                  64px). Use larger spacing between sections and smaller spacing
                  between related elements.
                </p>
              </div>

              <div>
                <h6 className="mb-2 text-lg font-medium">Typography Usage</h6>
                <p className="text-muted-foreground">
                  Use heading levels semantically. Don't skip heading levels for
                  styling purposes. Use text-muted-foreground for secondary
                  text. Maintain consistent text alignment (generally
                  left-aligned).
                </p>
              </div>

              <div>
                <h6 className="mb-2 text-lg font-medium">Responsive Design</h6>
                <p className="text-muted-foreground">
                  Design for mobile first, then expand to larger screens. Use
                  Tailwind's responsive prefixes (sm:, md:, lg:, xl:) to adjust
                  layouts at different breakpoints. Test all components at
                  various screen sizes.
                </p>
              </div>

              <div>
                <h6 className="mb-2 text-lg font-medium">
                  Dark Mode Compatibility
                </h6>
                <p className="text-muted-foreground">
                  Ensure all components work well in both light and dark modes.
                  Use Tailwind's dark: variant for dark mode specific styling.
                  Test color contrast in both modes to ensure accessibility.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
