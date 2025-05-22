import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  PackageIcon,
  ImageIcon,
  TagIcon,
  GlobeIcon,
  ArrowLeftIcon,
  SaveIcon,
} from "lucide-react";
import { BreadcrumbNav } from "@/polymet/components/breadcrumb-nav";
import { NumberInput } from "@/polymet/components/number-input";
import { ImageUploader } from "@/polymet/components/image-uploader";
import { MultiImageUploader } from "@/polymet/components/multi-image-uploader";
import { CategorySelector } from "@/polymet/components/category-selector";
import { FormSection } from "@/polymet/components/form-section";
import { FormLayout, FormGroup } from "@/polymet/components/form-layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrganizationMerchantSelector } from "@/polymet/components/organization-merchant-selector";

// Mock categories data
const categories = [
  {
    id: "tools",
    name: "Tools",
    count: 245,
    children: [
      {
        id: "hand-tools",
        name: "Hand Tools",
        count: 120,
        children: [
          { id: "hammers", name: "Hammers", count: 35 },
          { id: "screwdrivers", name: "Screwdrivers", count: 42 },
          { id: "pliers", name: "Pliers", count: 28 },
          { id: "wrenches", name: "Wrenches", count: 15 },
        ],
      },
      {
        id: "power-tools",
        name: "Power Tools",
        count: 85,
        children: [
          { id: "drills", name: "Drills", count: 30 },
          { id: "saws", name: "Saws", count: 25 },
          { id: "sanders", name: "Sanders", count: 15 },
          { id: "grinders", name: "Grinders", count: 15 },
        ],
      },
      {
        id: "measuring-tools",
        name: "Measuring Tools",
        count: 40,
        children: [
          { id: "tape-measures", name: "Tape Measures", count: 20 },
          { id: "levels", name: "Levels", count: 15 },
          { id: "squares", name: "Squares", count: 5 },
        ],
      },
    ],
  },
  {
    id: "building-materials",
    name: "Building Materials",
    count: 180,
    children: [
      {
        id: "lumber",
        name: "Lumber",
        count: 60,
        children: [
          { id: "softwood", name: "Softwood", count: 30 },
          { id: "hardwood", name: "Hardwood", count: 20 },
          { id: "plywood", name: "Plywood", count: 10 },
        ],
      },
      {
        id: "drywall",
        name: "Drywall",
        count: 25,
      },
      {
        id: "concrete",
        name: "Concrete",
        count: 60,
        children: [
          { id: "cement", name: "Cement", count: 20 },
          { id: "aggregates", name: "Aggregates", count: 15 },
          { id: "concrete-mix", name: "Concrete Mix", count: 25 },
        ],
      },
    ],
  },
];

// Mock organizations data
const organizations = [
  {
    id: "toolbank",
    label: "Toolbank",
    value: "toolbank",
    description: "Leading tool distributor",
  },
  {
    id: "nmbs",
    label: "NMBS",
    value: "nmbs",
    description: "Merchant buying society",
  },
  {
    id: "ibc",
    label: "IBC",
    value: "ibc",
    description: "Independent buying consortium",
  },
  {
    id: "bmf",
    label: "BMF",
    value: "bmf",
    description: "Builders Merchants Federation",
  },
];

export default function ProductCreation() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>(
    []
  );
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<
    { file: File; url: string }[]
  >([]);

  const handleMainImageUpload = (file: File, url: string) => {
    setMainImage(url);
  };

  const handleGalleryUpload = (files: { file: File; url: string }[]) => {
    setGalleryImages(files);
  };

  const handleSaveDraft = () => {
    console.log("Saving draft...");
  };

  const handlePublish = () => {
    console.log("Publishing product...");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header with breadcrumb */}
      <div className="mb-8">
        <BreadcrumbNav
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Create Product", href: "/products/create" },
          ]}
        />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Create New Product</h1>
            <p className="text-muted-foreground">
              Add a new product to your catalog
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Products
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleSaveDraft}
            >
              <SaveIcon className="h-4 w-4" />
              Save Draft
            </Button>
            <Button onClick={handlePublish}>Publish</Button>
          </div>
        </div>
      </div>

      {/* Main content tabs */}
      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="details" className="flex items-center gap-2">
            <PackageIcon className="h-4 w-4" />
            Details
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Media
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <TagIcon className="h-4 w-4" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="distribution" className="flex items-center gap-2">
            <GlobeIcon className="h-4 w-4" />
            Distribution
          </TabsTrigger>
        </TabsList>

        {/* Product Details Tab */}
        <TabsContent value="details">
          <Card>
            <CardContent className="pt-6">
              <FormLayout columns={1} gap="lg">
                <FormSection
                  title="Basic Information"
                  description="Enter the core product details"
                  icon={<PackageIcon className="h-5 w-5" />}
                >
                  <FormLayout columns={2} gap="md">
                    <FormGroup span="full">
                      <Label htmlFor="productName">Product Name</Label>
                      <Input
                        id="productName"
                        placeholder="Enter product name"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="sku">SKU</Label>
                      <Input id="sku" placeholder="Enter SKU" />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="barcode">Barcode (EAN/UPC)</Label>
                      <Input id="barcode" placeholder="Enter barcode" />
                    </FormGroup>

                    <FormGroup span="full">
                      <Label htmlFor="shortDescription">
                        Short Description
                      </Label>
                      <Input
                        id="shortDescription"
                        placeholder="Brief product description"
                      />
                    </FormGroup>

                    <FormGroup span="full">
                      <Label htmlFor="fullDescription">Full Description</Label>
                      <Textarea
                        id="fullDescription"
                        placeholder="Detailed product description with specifications and features"
                        rows={6}
                      />
                    </FormGroup>
                  </FormLayout>
                </FormSection>

                <FormSection
                  title="Pricing Information"
                  description="Set product pricing details"
                  icon={<TagIcon className="h-5 w-5" />}
                >
                  <FormLayout columns={3} gap="md">
                    <FormGroup>
                      <Label htmlFor="regularPrice">Regular Price (£)</Label>
                      <NumberInput
                        id="regularPrice"
                        placeholder="0.00"
                        min={0}
                        step={0.01}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="salePrice">Sale Price (£)</Label>
                      <NumberInput
                        id="salePrice"
                        placeholder="0.00"
                        min={0}
                        step={0.01}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="taxClass">Tax Class</Label>
                      <Select>
                        <SelectTrigger id="taxClass">
                          <SelectValue placeholder="Select tax class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">
                            Standard Rate (20%)
                          </SelectItem>
                          <SelectItem value="reduced">
                            Reduced Rate (5%)
                          </SelectItem>
                          <SelectItem value="zero">Zero Rate (0%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormGroup>
                  </FormLayout>
                </FormSection>

                <FormSection
                  title="Inventory"
                  description="Manage product stock and inventory"
                  icon={<PackageIcon className="h-5 w-5" />}
                >
                  <FormLayout columns={3} gap="md">
                    <FormGroup>
                      <Label htmlFor="stockQuantity">Stock Quantity</Label>
                      <NumberInput
                        id="stockQuantity"
                        placeholder="0"
                        min={0}
                        step={1}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="lowStockThreshold">
                        Low Stock Threshold
                      </Label>
                      <NumberInput
                        id="lowStockThreshold"
                        placeholder="0"
                        min={0}
                        step={1}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="stockStatus">Stock Status</Label>
                      <Select>
                        <SelectTrigger id="stockStatus">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in_stock">In Stock</SelectItem>
                          <SelectItem value="out_of_stock">
                            Out of Stock
                          </SelectItem>
                          <SelectItem value="on_backorder">
                            On Backorder
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormGroup>
                  </FormLayout>
                </FormSection>

                <FormSection
                  title="Shipping"
                  description="Product shipping details"
                  icon={<GlobeIcon className="h-5 w-5" />}
                >
                  <FormLayout columns={3} gap="md">
                    <FormGroup>
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <NumberInput
                        id="weight"
                        placeholder="0.00"
                        min={0}
                        step={0.01}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="length">Length (cm)</Label>
                      <NumberInput
                        id="length"
                        placeholder="0.00"
                        min={0}
                        step={0.01}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="width">Width (cm)</Label>
                      <NumberInput
                        id="width"
                        placeholder="0.00"
                        min={0}
                        step={0.01}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="height">Height (cm)</Label>
                      <NumberInput
                        id="height"
                        placeholder="0.00"
                        min={0}
                        step={0.01}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="shippingClass">Shipping Class</Label>
                      <Select>
                        <SelectTrigger id="shippingClass">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="express">Express</SelectItem>
                          <SelectItem value="bulky">Bulky Items</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormGroup>
                  </FormLayout>
                </FormSection>
              </FormLayout>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media Tab */}
        <TabsContent value="media">
          <Card>
            <CardContent className="pt-6">
              <FormLayout columns={1} gap="lg">
                <FormSection
                  title="Main Product Image"
                  description="Upload the primary product image"
                  icon={<ImageIcon className="h-5 w-5" />}
                >
                  <div className="max-w-md">
                    <ImageUploader
                      label="Main Product Image"
                      description="Upload a high-quality image (recommended size: 1000x1000px)"
                      onUpload={handleMainImageUpload}
                      maxSizeInMB={5}
                      minWidth={500}
                      minHeight={500}
                    />
                  </div>
                </FormSection>

                <FormSection
                  title="Product Gallery"
                  description="Upload additional product images"
                  icon={<ImageIcon className="h-5 w-5" />}
                >
                  <div className="max-w-3xl">
                    <MultiImageUploader
                      label="Product Gallery"
                      description="Upload up to 10 additional product images"
                      onUpload={handleGalleryUpload}
                      maxFiles={10}
                      maxSizeInMB={5}
                    />
                  </div>
                </FormSection>
              </FormLayout>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories">
          <Card>
            <CardContent className="pt-6">
              <FormSection
                title="Product Categories"
                description="Assign your product to relevant categories"
                icon={<TagIcon className="h-5 w-5" />}
              >
                <div className="max-h-[500px]">
                  <CategorySelector
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onChange={setSelectedCategories}
                  />
                </div>
              </FormSection>

              <FormSection
                title="Product Tags"
                description="Add tags to help with search and filtering"
                icon={<TagIcon className="h-5 w-5" />}
                className="mt-6"
              >
                <div className="max-w-md">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="Enter tags separated by commas"
                  />

                  <p className="text-sm text-muted-foreground mt-1">
                    Example: power tools, cordless, professional, 18V
                  </p>
                </div>
              </FormSection>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Distribution Tab */}
        <TabsContent value="distribution">
          <Card>
            <CardContent className="pt-6">
              <FormSection
                title="Organization Distribution"
                description="Select which organizations can access this product"
                icon={<GlobeIcon className="h-5 w-5" />}
              >
                <div className="max-w-md">
                  <OrganizationMerchantSelector
                    items={organizations}
                    value={selectedOrganizations}
                    onChange={setSelectedOrganizations}
                    placeholder="Select organizations"
                    type="organization"
                  />
                </div>
              </FormSection>

              <FormSection
                title="Visibility Settings"
                description="Control product visibility and availability"
                icon={<GlobeIcon className="h-5 w-5" />}
                className="mt-6"
              >
                <FormLayout columns={1} gap="md">
                  <FormGroup>
                    <Label htmlFor="visibility">Visibility</Label>
                    <Select>
                      <SelectTrigger id="visibility">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">
                          Public (Visible to all)
                        </SelectItem>
                        <SelectItem value="private">
                          Private (Selected organizations only)
                        </SelectItem>
                        <SelectItem value="hidden">
                          Hidden (Not visible in catalogs)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="publishDate">Publish Date</Label>
                    <Input id="publishDate" type="date" />
                  </FormGroup>
                </FormLayout>
              </FormSection>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
