import { useState } from "react";
import { Link } from "react-router-dom";
import { FormWizard } from "@/polymet/components/form-wizard";
import { TextInput } from "@/polymet/components/text-input";
import { TextareaInput } from "@/polymet/components/textarea-input";
import { NumberInput } from "@/polymet/components/number-input";
import { DatePicker } from "@/polymet/components/date-picker";
import { ImageUploader } from "@/polymet/components/image-uploader";
import { MultiImageUploader } from "@/polymet/components/multi-image-uploader";
import OrganizationSelector from "@/polymet/components/organization-selector";
import { CategorySelector } from "@/polymet/components/category-selector";
import { DateRangePicker } from "@/polymet/components/date-range-picker";
import { LinearProgressIndicator } from "@/polymet/components/progress-indicator";
import { FormSection } from "@/polymet/components/form-section";
import { AlertBanner } from "@/polymet/components/alert-banner";
import { Button } from "@/components/ui/button";
import { ORGANIZATIONS } from "@/polymet/data/organization-data";

export default function CreateOfferWizard() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    originalPrice: "",
    discountedPrice: "",
    startDate: undefined,
    endDate: undefined,
    mainImage: null,
    additionalImages: [],
    categories: [],
    organizations: [],
    sku: "",
    stockQuantity: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFormDataChange = (data) => {
    setFormData({ ...formData, ...data });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const steps = [
    {
      id: "basic-info",
      title: "Basic Info",
      description: "Offer details",
      content: (
        <div className="space-y-6">
          <FormSection
            title="Offer Information"
            description="Enter the basic details about your offer"
          >
            <div className="space-y-4">
              <TextInput
                label="Offer Title"
                placeholder="Enter a descriptive title for your offer"
                value={formData.title}
                onChange={(e) =>
                  handleFormDataChange({ title: e.target.value })
                }
                required
              />

              <TextareaInput
                label="Description"
                placeholder="Describe your offer in detail"
                value={formData.description}
                onChange={(e) =>
                  handleFormDataChange({ description: e.target.value })
                }
                rows={4}
                required
              />

              <TextInput
                label="SKU"
                placeholder="Enter product SKU"
                value={formData.sku}
                onChange={(e) => handleFormDataChange({ sku: e.target.value })}
              />

              <NumberInput
                label="Stock Quantity"
                placeholder="Enter available stock"
                value={formData.stockQuantity}
                onValueChange={(value) =>
                  handleFormDataChange({ stockQuantity: value })
                }
                min={0}
              />
            </div>
          </FormSection>
        </div>
      ),
    },
    {
      id: "pricing-dates",
      title: "Pricing & Dates",
      description: "Set pricing and validity period",
      content: (
        <div className="space-y-6">
          <FormSection
            title="Pricing Information"
            description="Set the pricing details for your offer"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <NumberInput
                label="Original Price (£)"
                placeholder="0.00"
                value={formData.originalPrice}
                onValueChange={(value) =>
                  handleFormDataChange({ originalPrice: value })
                }
                required
              />

              <NumberInput
                label="Discounted Price (£)"
                placeholder="0.00"
                value={formData.discountedPrice}
                onValueChange={(value) =>
                  handleFormDataChange({ discountedPrice: value })
                }
                required
              />
            </div>
          </FormSection>

          <FormSection
            title="Offer Validity Period"
            description="Set when your offer starts and ends"
          >
            <DateRangePicker
              value={{
                from: formData.startDate,
                to: formData.endDate,
              }}
              onChange={({ from, to }) =>
                handleFormDataChange({
                  startDate: from,
                  endDate: to,
                })
              }
              placeholder="Select offer period"
            />
          </FormSection>
        </div>
      ),
    },
    {
      id: "media",
      title: "Media",
      description: "Upload images",
      content: (
        <div className="space-y-6">
          <FormSection
            title="Main Product Image"
            description="Upload the primary image for your offer"
          >
            <ImageUploader
              label="Main Product Image"
              description="This will be the main image displayed for your offer"
              onUpload={(file, url) =>
                handleFormDataChange({ mainImage: { file, url } })
              }
              maxSizeInMB={5}
              minWidth={800}
              minHeight={600}
            />
          </FormSection>

          <FormSection
            title="Additional Images"
            description="Upload additional images for your offer (optional)"
          >
            <MultiImageUploader
              label="Additional Images"
              description="Add up to 5 additional product images"
              maxFiles={5}
              onUpload={(files) =>
                handleFormDataChange({ additionalImages: files })
              }
              maxSizeInMB={5}
            />
          </FormSection>
        </div>
      ),
    },
    {
      id: "distribution",
      title: "Distribution",
      description: "Select target organizations",
      content: (
        <div className="space-y-6">
          <FormSection
            title="Categories"
            description="Select the categories that best describe your offer"
          >
            <CategorySelector
              selectedCategories={formData.categories}
              onChange={(categories) => handleFormDataChange({ categories })}
            />
          </FormSection>

          <FormSection
            title="Target Organizations"
            description="Select the organizations where this offer will be available"
          >
            <OrganizationSelector
              organizations={ORGANIZATIONS}
              onSelect={(org) =>
                handleFormDataChange({
                  organizations: [...formData.organizations, org],
                })
              }
            />
          </FormSection>
        </div>
      ),
    },
    {
      id: "review",
      title: "Review",
      description: "Review and submit",
      content: (
        <div className="space-y-6">
          <FormSection
            title="Review Your Offer"
            description="Please review all details before submitting"
          >
            <div className="rounded-md bg-muted p-4">
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="font-medium">Title:</dt>
                  <dd>{formData.title || "Not provided"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Original Price:</dt>
                  <dd>
                    {formData.originalPrice
                      ? `£${formData.originalPrice}`
                      : "Not provided"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Discounted Price:</dt>
                  <dd>
                    {formData.discountedPrice
                      ? `£${formData.discountedPrice}`
                      : "Not provided"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Validity Period:</dt>
                  <dd>
                    {formData.startDate && formData.endDate
                      ? `${new Date(
                          formData.startDate
                        ).toLocaleDateString()} - ${new Date(
                          formData.endDate
                        ).toLocaleDateString()}`
                      : "Not provided"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">SKU:</dt>
                  <dd>{formData.sku || "Not provided"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Stock Quantity:</dt>
                  <dd>{formData.stockQuantity || "Not provided"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Main Image:</dt>
                  <dd>{formData.mainImage ? "Uploaded" : "Not uploaded"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Additional Images:</dt>
                  <dd>
                    {formData.additionalImages.length > 0
                      ? `${formData.additionalImages.length} uploaded`
                      : "None uploaded"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Categories:</dt>
                  <dd>
                    {formData.categories.length > 0
                      ? formData.categories.join(", ")
                      : "None selected"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Organizations:</dt>
                  <dd>
                    {formData.organizations.length > 0
                      ? formData.organizations.map((org) => org.name).join(", ")
                      : "None selected"}
                  </dd>
                </div>
              </dl>
            </div>
          </FormSection>

          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full md:w-auto"
            >
              {isSubmitting ? "Submitting..." : "Submit Offer"}
            </Button>
          </div>
        </div>
      ),
    },
  ];

  if (showSuccess) {
    return (
      <div className="container mx-auto px-4 py-8">
        <AlertBanner
          variant="success"
          title="Offer Created Successfully!"
          dismissible
          onDismiss={() => setShowSuccess(false)}
        >
          Your offer has been created and is now pending approval.
        </AlertBanner>

        <div className="mt-8 flex flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl font-bold">Offer Created Successfully!</h1>
          <p className="text-center text-muted-foreground">
            Your offer has been submitted and is now pending approval. You will
            be notified once it has been reviewed.
          </p>
          <div className="mt-4 flex space-x-4">
            <Link
              to="/supplier-dashboard"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Return to Dashboard
            </Link>
            <Button variant="outline">Create Another Offer</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Create New Offer</h1>
        <p className="text-muted-foreground">
          Complete all steps to create your special offer
        </p>
      </div>

      <div className="mb-8">
        <LinearProgressIndicator
          steps={steps.map((step) => ({
            id: step.id,
            label: step.title,
            description: step.description,
            status: "upcoming",
          }))}
          showLabels
        />
      </div>

      <FormWizard
        steps={steps}
        formData={formData}
        onFormDataChange={handleFormDataChange}
        onComplete={handleSubmit}
      />

      <div className="mt-8 flex justify-between">
        <Link
          to="/supplier-dashboard"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        >
          Cancel
        </Link>
        <Button variant="outline">Save Draft</Button>
      </div>
    </div>
  );
}
