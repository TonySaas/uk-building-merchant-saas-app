import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import {
  BuildingIcon,
  GlobeIcon,
  ImageIcon,
  PaletteIcon,
  SaveIcon,
  TrashIcon,
  UploadIcon,
} from "lucide-react";

interface OrganizationProfileEditorProps {
  organization?: Organization;
  onSave?: (organization: Organization) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

interface Organization {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
}

export default function OrganizationProfileEditor({
  organization,
  onSave,
  onCancel,
  isLoading = false,
}: OrganizationProfileEditorProps) {
  const defaultOrg: Organization = {
    id: "",
    name: "",
    description: "",
    logo: "",
    website: "",
    primaryColor: "#1e40af", // Default blue
    secondaryColor: "#0f172a", // Default dark blue
    accentColor: "#fbbf24", // Default amber
    contactEmail: "",
    contactPhone: "",
    address: "",
  };

  const [orgData, setOrgData] = useState<Organization>(
    organization || defaultOrg
  );
  const [logoPreview, setLogoPreview] = useState<string | null>(
    organization?.logo || null
  );
  const [activeTab, setActiveTab] = useState("general");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOrgData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setLogoPreview(result);
        setOrgData((prev) => ({ ...prev, logo: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (colorType: string, value: string) => {
    setOrgData((prev) => ({ ...prev, [colorType]: value }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(orgData);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BuildingIcon className="h-5 w-5 text-primary" />

          <CardTitle>Organization Profile</CardTitle>
        </div>
        <CardDescription>
          Manage your organization's profile and branding settings
        </CardDescription>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="general">General Information</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="contact">Contact Details</TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="p-0">
          <TabsContent value="general" className="px-6 py-4 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Organization Name</Label>
              <Input
                id="name"
                name="name"
                value={orgData.name}
                onChange={handleChange}
                placeholder="Enter organization name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={orgData.description}
                onChange={handleChange}
                placeholder="Enter a brief description of your organization"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <div className="flex">
                <div className="flex items-center px-3 border rounded-l-md bg-muted">
                  <GlobeIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="website"
                  name="website"
                  value={orgData.website}
                  onChange={handleChange}
                  placeholder="https://www.example.com"
                  className="rounded-l-none"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="branding" className="px-6 py-4 space-y-6">
            <div className="space-y-4">
              <Label>Organization Logo</Label>
              <div className="flex items-center gap-4">
                <div className="border rounded-md p-4 bg-muted/50 flex items-center justify-center w-32 h-32">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Organization logo"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <ImageIcon className="h-10 w-10 text-muted-foreground" />
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="logo-upload"
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                  >
                    <UploadIcon className="h-4 w-4" />
                    Upload Logo
                  </Label>
                  <Input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />

                  <p className="text-sm text-muted-foreground">
                    Recommended size: 200x200px. PNG or SVG with transparent
                    background preferred.
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <PaletteIcon className="h-5 w-5 text-primary" />

                <h3 className="text-lg font-medium">Brand Colors</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <div
                      className="w-10 h-10 rounded-md border"
                      style={{ backgroundColor: orgData.primaryColor }}
                    ></div>
                    <Input
                      id="primaryColor"
                      name="primaryColor"
                      type="text"
                      value={orgData.primaryColor}
                      onChange={(e) =>
                        handleColorChange("primaryColor", e.target.value)
                      }
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <div
                      className="w-10 h-10 rounded-md border"
                      style={{ backgroundColor: orgData.secondaryColor }}
                    ></div>
                    <Input
                      id="secondaryColor"
                      name="secondaryColor"
                      type="text"
                      value={orgData.secondaryColor}
                      onChange={(e) =>
                        handleColorChange("secondaryColor", e.target.value)
                      }
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex gap-2">
                    <div
                      className="w-10 h-10 rounded-md border"
                      style={{ backgroundColor: orgData.accentColor }}
                    ></div>
                    <Input
                      id="accentColor"
                      name="accentColor"
                      type="text"
                      value={orgData.accentColor}
                      onChange={(e) =>
                        handleColorChange("accentColor", e.target.value)
                      }
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-md">
                <h4 className="font-medium mb-2">Preview</h4>
                <div className="flex flex-wrap gap-2">
                  <div
                    className="px-4 py-2 rounded-md text-white"
                    style={{ backgroundColor: orgData.primaryColor }}
                  >
                    Primary Button
                  </div>
                  <div
                    className="px-4 py-2 rounded-md text-white"
                    style={{ backgroundColor: orgData.secondaryColor }}
                  >
                    Secondary Button
                  </div>
                  <div
                    className="px-4 py-2 rounded-md"
                    style={{
                      backgroundColor: orgData.accentColor,
                      color: "#000000",
                    }}
                  >
                    Accent Button
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="px-6 py-4 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={orgData.contactEmail}
                onChange={handleChange}
                placeholder="contact@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                name="contactPhone"
                value={orgData.contactPhone}
                onChange={handleChange}
                placeholder="+44 123 456 7890"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                value={orgData.address}
                onChange={handleChange}
                placeholder="Enter organization address"
                rows={3}
              />
            </div>
          </TabsContent>
        </CardContent>

        <CardFooter className="flex justify-between p-6">
          <div className="flex gap-2">
            <Button variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={isLoading}>
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Delete Organization
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your organization and remove all associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive text-destructive-foreground">
                    Delete Organization
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              "Saving..."
            ) : (
              <>
                <SaveIcon className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </CardFooter>
      </Tabs>
    </Card>
  );
}
