import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  LayoutIcon,
  PaintbrushIcon,
  TagIcon,
  CodeIcon,
  SettingsIcon,
  EyeIcon,
  SmartphoneIcon,
  MonitorIcon,
  CopyIcon,
  CheckIcon,
  RefreshCwIcon,
  InfoIcon,
} from "lucide-react";

export default function MerchantWidgetConfiguration() {
  const { orgId } = useParams();

  // Widget configuration state
  const [widgetConfig, setWidgetConfig] = useState({
    displayFormat: "carousel",
    theme: "light",
    primaryColor: "#E11D48",
    secondaryColor: "#0F172A",
    borderRadius: 8,
    maxItems: 3,
    showPrices: true,
    showDiscounts: true,
    autoRotate: true,
    rotateInterval: 5,
    title: "Special Offers",
    titleSize: 18,
    descriptionSize: 14,
    fontFamily: "Inter",
  });

  // Selected offers state
  const [selectedOffers, setSelectedOffers] = useState([
    "offer-1",
    "offer-2",
    "offer-3",
  ]);

  // Preview device state
  const [previewDevice, setPreviewDevice] = useState("desktop");

  // Code copy state
  const [codeCopied, setCodeCopied] = useState(false);

  // Mock offers data
  const availableOffers = [
    {
      id: "offer-1",
      title: "DeWalt 18V XR Brushless Combi Drill",
      description: "Professional 18V cordless drill with brushless motor",
      originalPrice: 199.99,
      discountedPrice: 149.99,
      discountPercentage: 25,
      image: "https://picsum.photos/seed/dewalt/400/300",
      category: "Power Tools",
    },
    {
      id: "offer-2",
      title: "Stanley Hammer Set",
      description: "Professional claw hammer set with fiberglass handles",
      originalPrice: 39.99,
      discountedPrice: 29.99,
      discountPercentage: 25,
      image: "https://picsum.photos/seed/hammer/400/300",
      category: "Hand Tools",
    },
    {
      id: "offer-3",
      title: "Makita Circular Saw",
      description: "Powerful circular saw with laser guide",
      originalPrice: 129.99,
      discountedPrice: 109.99,
      discountPercentage: 15,
      image: "https://picsum.photos/seed/makita/400/300",
      category: "Power Tools",
    },
    {
      id: "offer-4",
      title: "Bosch Professional Laser Level",
      description: "Self-leveling cross line laser with green beam technology",
      originalPrice: 249.99,
      discountedPrice: 199.99,
      discountPercentage: 20,
      image: "https://picsum.photos/seed/bosch/400/300",
      category: "Measuring Tools",
    },
    {
      id: "offer-5",
      title: "Milwaukee Tool Set",
      description: "Comprehensive 150-piece tool set with heavy-duty case",
      originalPrice: 199.99,
      discountedPrice: 159.99,
      discountPercentage: 20,
      image: "https://picsum.photos/seed/toolset/400/300",
      category: "Hand Tools",
    },
  ];

  // Toggle offer selection
  const toggleOfferSelection = (offerId) => {
    if (selectedOffers.includes(offerId)) {
      setSelectedOffers(selectedOffers.filter((id) => id !== offerId));
    } else {
      setSelectedOffers([...selectedOffers, offerId]);
    }
  };

  // Update widget configuration
  const updateWidgetConfig = (key, value) => {
    setWidgetConfig({
      ...widgetConfig,
      [key]: value,
    });
  };

  // Generate widget code
  const generateWidgetCode = () => {
    return `<!-- BuildConnect Offers Widget -->
<div id="buildconnect-offers-widget"></div>
<script>
  (function() {
    var script = document.createElement('script');
    script.src = 'https://buildconnect.com/widget.js';
    script.async = true;
    script.onload = function() {
      BuildConnectWidget.init({
        selector: '#buildconnect-offers-widget',
        apiKey: 'YOUR_API_KEY',
        merchantId: '${orgId || "MERCHANT_ID"}',
        offers: ${JSON.stringify(selectedOffers)},
        config: ${JSON.stringify(widgetConfig, null, 2)}
      });
    };
    document.head.appendChild(script);
  })();
</script>
<!-- End BuildConnect Offers Widget -->`;
  };

  // Copy code to clipboard
  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(generateWidgetCode());
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  // Render widget preview based on selected format
  const renderWidgetPreview = () => {
    const selectedOffersData = availableOffers
      .filter((offer) => selectedOffers.includes(offer.id))
      .slice(0, widgetConfig.maxItems);

    if (selectedOffersData.length === 0) {
      return (
        <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <div>
            <p className="text-muted-foreground mb-2">No offers selected</p>
            <p className="text-sm text-muted-foreground">
              Select offers from the "Offers" tab to see a preview
            </p>
          </div>
        </div>
      );
    }

    if (widgetConfig.displayFormat === "carousel") {
      return (
        <div
          className="border rounded-lg overflow-hidden"
          style={{
            borderRadius: `${widgetConfig.borderRadius}px`,
            fontFamily: widgetConfig.fontFamily,
          }}
        >
          <div
            className="bg-primary p-3"
            style={{ backgroundColor: widgetConfig.primaryColor }}
          >
            <h3
              className="text-white font-semibold"
              style={{ fontSize: `${widgetConfig.titleSize}px` }}
            >
              {widgetConfig.title}
            </h3>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out">
              {selectedOffersData.map((offer) => (
                <div
                  key={offer.id}
                  className="min-w-full p-4 bg-white dark:bg-gray-800"
                >
                  <div className="flex flex-col h-full">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-48 object-cover rounded-md mb-3"
                    />

                    <h4
                      className="font-semibold mb-1"
                      style={{ fontSize: `${widgetConfig.titleSize - 2}px` }}
                    >
                      {offer.title}
                    </h4>
                    <p
                      className="text-muted-foreground mb-2"
                      style={{ fontSize: `${widgetConfig.descriptionSize}px` }}
                    >
                      {offer.description}
                    </p>
                    {widgetConfig.showPrices && (
                      <div className="mt-auto">
                        <div className="flex items-center justify-between">
                          <span
                            className="font-bold"
                            style={{ color: widgetConfig.secondaryColor }}
                          >
                            £{offer.discountedPrice.toFixed(2)}
                          </span>
                          {widgetConfig.showDiscounts && (
                            <div className="flex flex-col items-end">
                              <span className="text-sm line-through text-muted-foreground">
                                £{offer.originalPrice.toFixed(2)}
                              </span>
                              <span className="text-xs font-semibold bg-red-500 text-white px-1.5 py-0.5 rounded">
                                {offer.discountPercentage}% OFF
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {selectedOffersData.map((_, index) => (
                <button
                  key={index}
                  className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"
                  style={{
                    backgroundColor:
                      index === 0 ? widgetConfig.primaryColor : undefined,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (widgetConfig.displayFormat === "grid") {
      return (
        <div
          className="border rounded-lg overflow-hidden"
          style={{
            borderRadius: `${widgetConfig.borderRadius}px`,
            fontFamily: widgetConfig.fontFamily,
          }}
        >
          <div
            className="bg-primary p-3"
            style={{ backgroundColor: widgetConfig.primaryColor }}
          >
            <h3
              className="text-white font-semibold"
              style={{ fontSize: `${widgetConfig.titleSize}px` }}
            >
              {widgetConfig.title}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4 bg-white dark:bg-gray-800">
            {selectedOffersData.map((offer) => (
              <div
                key={offer.id}
                className="border rounded-md p-3 flex flex-col h-full"
              >
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />

                <h4
                  className="font-semibold mb-1 line-clamp-1"
                  style={{ fontSize: `${widgetConfig.titleSize - 4}px` }}
                >
                  {offer.title}
                </h4>
                <p
                  className="text-muted-foreground text-xs mb-2 line-clamp-2"
                  style={{ fontSize: `${widgetConfig.descriptionSize - 2}px` }}
                >
                  {offer.description}
                </p>
                {widgetConfig.showPrices && (
                  <div className="mt-auto">
                    <div className="flex items-center justify-between">
                      <span
                        className="font-bold text-sm"
                        style={{ color: widgetConfig.secondaryColor }}
                      >
                        £{offer.discountedPrice.toFixed(2)}
                      </span>
                      {widgetConfig.showDiscounts && (
                        <span className="text-xs font-semibold bg-red-500 text-white px-1.5 py-0.5 rounded">
                          {offer.discountPercentage}% OFF
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (widgetConfig.displayFormat === "featured") {
      const mainOffer = selectedOffersData[0];
      const otherOffers = selectedOffersData.slice(1);

      return (
        <div
          className="border rounded-lg overflow-hidden"
          style={{
            borderRadius: `${widgetConfig.borderRadius}px`,
            fontFamily: widgetConfig.fontFamily,
          }}
        >
          <div
            className="bg-primary p-3"
            style={{ backgroundColor: widgetConfig.primaryColor }}
          >
            <h3
              className="text-white font-semibold"
              style={{ fontSize: `${widgetConfig.titleSize}px` }}
            >
              {widgetConfig.title}
            </h3>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4">
            {mainOffer && (
              <div className="mb-4">
                <div className="relative">
                  <img
                    src={mainOffer.image}
                    alt={mainOffer.title}
                    className="w-full h-48 object-cover rounded-md"
                  />

                  {widgetConfig.showDiscounts && (
                    <span className="absolute top-2 right-2 text-sm font-semibold bg-red-500 text-white px-2 py-1 rounded">
                      {mainOffer.discountPercentage}% OFF
                    </span>
                  )}
                </div>
                <h4
                  className="font-semibold mt-2 mb-1"
                  style={{ fontSize: `${widgetConfig.titleSize - 2}px` }}
                >
                  {mainOffer.title}
                </h4>
                <p
                  className="text-muted-foreground mb-2"
                  style={{ fontSize: `${widgetConfig.descriptionSize}px` }}
                >
                  {mainOffer.description}
                </p>
                {widgetConfig.showPrices && (
                  <div className="flex items-center gap-2">
                    <span
                      className="font-bold"
                      style={{ color: widgetConfig.secondaryColor }}
                    >
                      £{mainOffer.discountedPrice.toFixed(2)}
                    </span>
                    {widgetConfig.showDiscounts && (
                      <span className="text-sm line-through text-muted-foreground">
                        £{mainOffer.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

            {otherOffers.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {otherOffers.map((offer) => (
                  <div key={offer.id} className="flex gap-2">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />

                    <div className="flex-1 min-w-0">
                      <h5
                        className="font-medium text-sm line-clamp-1"
                        style={{ fontSize: `${widgetConfig.titleSize - 6}px` }}
                      >
                        {offer.title}
                      </h5>
                      {widgetConfig.showPrices && (
                        <div className="flex items-center gap-1 mt-1">
                          <span
                            className="font-bold text-xs"
                            style={{ color: widgetConfig.secondaryColor }}
                          >
                            £{offer.discountedPrice.toFixed(2)}
                          </span>
                          {widgetConfig.showDiscounts && (
                            <span className="text-xs bg-red-500 text-white px-1 rounded">
                              {offer.discountPercentage}%
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Widget Configuration</h1>
        <p className="text-muted-foreground">
          Create and customize a widget to display your special offers on your
          website
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="layout" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="layout" className="flex items-center gap-2">
                <LayoutIcon className="h-4 w-4" />

                <span className="hidden sm:inline">Layout</span>
              </TabsTrigger>
              <TabsTrigger value="style" className="flex items-center gap-2">
                <PaintbrushIcon className="h-4 w-4" />

                <span className="hidden sm:inline">Style</span>
              </TabsTrigger>
              <TabsTrigger value="offers" className="flex items-center gap-2">
                <TagIcon className="h-4 w-4" />

                <span className="hidden sm:inline">Offers</span>
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-2">
                <CodeIcon className="h-4 w-4" />

                <span className="hidden sm:inline">Code</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <SettingsIcon className="h-4 w-4" />

                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="layout" className="border rounded-md p-4 mt-4">
              <h2 className="text-xl font-semibold mb-4">Layout Options</h2>

              <div className="space-y-6">
                <div>
                  <Label className="text-base mb-3 block">Display Format</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card
                      className={`cursor-pointer border-2 ${widgetConfig.displayFormat === "carousel" ? "border-primary" : "border-border"}`}
                      onClick={() =>
                        updateWidgetConfig("displayFormat", "carousel")
                      }
                    >
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <div className="w-full h-24 bg-muted rounded-md mb-3 flex items-center justify-center">
                          <div className="w-3/4 h-16 bg-background rounded border"></div>
                        </div>
                        <span className="font-medium">Carousel</span>
                        <span className="text-xs text-muted-foreground mt-1">
                          Scrolling slideshow
                        </span>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer border-2 ${widgetConfig.displayFormat === "grid" ? "border-primary" : "border-border"}`}
                      onClick={() =>
                        updateWidgetConfig("displayFormat", "grid")
                      }
                    >
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <div className="w-full h-24 bg-muted rounded-md mb-3 flex flex-wrap gap-2 justify-center items-center p-2">
                          <div className="w-5/12 h-10 bg-background rounded border"></div>
                          <div className="w-5/12 h-10 bg-background rounded border"></div>
                          <div className="w-5/12 h-10 bg-background rounded border"></div>
                          <div className="w-5/12 h-10 bg-background rounded border"></div>
                        </div>
                        <span className="font-medium">Grid</span>
                        <span className="text-xs text-muted-foreground mt-1">
                          Multiple offers at once
                        </span>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer border-2 ${widgetConfig.displayFormat === "featured" ? "border-primary" : "border-border"}`}
                      onClick={() =>
                        updateWidgetConfig("displayFormat", "featured")
                      }
                    >
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <div className="w-full h-24 bg-muted rounded-md mb-3 flex flex-col items-center justify-center p-2">
                          <div className="w-full h-12 bg-background rounded border mb-2"></div>
                          <div className="w-full flex gap-1">
                            <div className="w-1/2 h-8 bg-background rounded border"></div>
                            <div className="w-1/2 h-8 bg-background rounded border"></div>
                          </div>
                        </div>
                        <span className="font-medium">Featured</span>
                        <span className="text-xs text-muted-foreground mt-1">
                          One main offer with smaller ones
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Widget Title</Label>
                      <Input
                        id="title"
                        value={widgetConfig.title}
                        onChange={(e) =>
                          updateWidgetConfig("title", e.target.value)
                        }
                        placeholder="Special Offers"
                      />
                    </div>

                    <div>
                      <Label htmlFor="maxItems">Maximum Items</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          id="maxItems"
                          min={1}
                          max={6}
                          step={1}
                          value={[widgetConfig.maxItems]}
                          onValueChange={(value) =>
                            updateWidgetConfig("maxItems", value[0])
                          }
                          className="flex-1"
                        />

                        <span className="w-8 text-center">
                          {widgetConfig.maxItems}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showPrices">Show Prices</Label>
                      <Switch
                        id="showPrices"
                        checked={widgetConfig.showPrices}
                        onCheckedChange={(checked) =>
                          updateWidgetConfig("showPrices", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="showDiscounts">Show Discounts</Label>
                      <Switch
                        id="showDiscounts"
                        checked={widgetConfig.showDiscounts}
                        onCheckedChange={(checked) =>
                          updateWidgetConfig("showDiscounts", checked)
                        }
                      />
                    </div>

                    {widgetConfig.displayFormat === "carousel" && (
                      <div className="flex items-center justify-between">
                        <Label htmlFor="autoRotate">Auto-rotate Slides</Label>
                        <Switch
                          id="autoRotate"
                          checked={widgetConfig.autoRotate}
                          onCheckedChange={(checked) =>
                            updateWidgetConfig("autoRotate", checked)
                          }
                        />
                      </div>
                    )}

                    {widgetConfig.autoRotate &&
                      widgetConfig.displayFormat === "carousel" && (
                        <div>
                          <Label htmlFor="rotateInterval">
                            Rotation Interval (seconds)
                          </Label>
                          <div className="flex items-center gap-4">
                            <Slider
                              id="rotateInterval"
                              min={2}
                              max={10}
                              step={1}
                              value={[widgetConfig.rotateInterval]}
                              onValueChange={(value) =>
                                updateWidgetConfig("rotateInterval", value[0])
                              }
                              className="flex-1"
                            />

                            <span className="w-8 text-center">
                              {widgetConfig.rotateInterval}s
                            </span>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="style" className="border rounded-md p-4 mt-4">
              <h2 className="text-xl font-semibold mb-4">
                Style Customization
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-base mb-3 block">Theme</Label>
                    <div className="flex gap-4">
                      <Card
                        className={`cursor-pointer border-2 flex-1 ${widgetConfig.theme === "light" ? "border-primary" : "border-border"}`}
                        onClick={() => updateWidgetConfig("theme", "light")}
                      >
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <div className="w-full h-16 bg-white rounded-md border mb-2"></div>
                          <span className="font-medium">Light</span>
                        </CardContent>
                      </Card>

                      <Card
                        className={`cursor-pointer border-2 flex-1 ${widgetConfig.theme === "dark" ? "border-primary" : "border-border"}`}
                        onClick={() => updateWidgetConfig("theme", "dark")}
                      >
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <div className="w-full h-16 bg-gray-800 rounded-md border mb-2"></div>
                          <span className="font-medium">Dark</span>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="fontFamily">Font Family</Label>
                    <Select
                      value={widgetConfig.fontFamily}
                      onValueChange={(value) =>
                        updateWidgetConfig("fontFamily", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter">Inter</SelectItem>
                        <SelectItem value="Arial">Arial</SelectItem>
                        <SelectItem value="Helvetica">Helvetica</SelectItem>
                        <SelectItem value="Georgia">Georgia</SelectItem>
                        <SelectItem value="Times New Roman">
                          Times New Roman
                        </SelectItem>
                        <SelectItem value="Verdana">Verdana</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex gap-3">
                      <div
                        className="w-10 h-10 rounded-md border cursor-pointer"
                        style={{ backgroundColor: widgetConfig.primaryColor }}
                      >
                        <input
                          type="color"
                          value={widgetConfig.primaryColor}
                          onChange={(e) =>
                            updateWidgetConfig("primaryColor", e.target.value)
                          }
                          className="opacity-0 w-full h-full cursor-pointer"
                        />
                      </div>
                      <Input
                        value={widgetConfig.primaryColor}
                        onChange={(e) =>
                          updateWidgetConfig("primaryColor", e.target.value)
                        }
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex gap-3">
                      <div
                        className="w-10 h-10 rounded-md border cursor-pointer"
                        style={{ backgroundColor: widgetConfig.secondaryColor }}
                      >
                        <input
                          type="color"
                          value={widgetConfig.secondaryColor}
                          onChange={(e) =>
                            updateWidgetConfig("secondaryColor", e.target.value)
                          }
                          className="opacity-0 w-full h-full cursor-pointer"
                        />
                      </div>
                      <Input
                        value={widgetConfig.secondaryColor}
                        onChange={(e) =>
                          updateWidgetConfig("secondaryColor", e.target.value)
                        }
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="borderRadius">Border Radius</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="borderRadius"
                        min={0}
                        max={20}
                        step={1}
                        value={[widgetConfig.borderRadius]}
                        onValueChange={(value) =>
                          updateWidgetConfig("borderRadius", value[0])
                        }
                        className="flex-1"
                      />

                      <span className="w-8 text-center">
                        {widgetConfig.borderRadius}px
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="titleSize">Title Size</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="titleSize"
                        min={14}
                        max={24}
                        step={1}
                        value={[widgetConfig.titleSize]}
                        onValueChange={(value) =>
                          updateWidgetConfig("titleSize", value[0])
                        }
                        className="flex-1"
                      />

                      <span className="w-8 text-center">
                        {widgetConfig.titleSize}px
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="descriptionSize">Description Size</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="descriptionSize"
                        min={12}
                        max={18}
                        step={1}
                        value={[widgetConfig.descriptionSize]}
                        onValueChange={(value) =>
                          updateWidgetConfig("descriptionSize", value[0])
                        }
                        className="flex-1"
                      />

                      <span className="w-8 text-center">
                        {widgetConfig.descriptionSize}px
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="offers" className="border rounded-md p-4 mt-4">
              <h2 className="text-xl font-semibold mb-4">Offer Selection</h2>

              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  Select up to {widgetConfig.maxItems} offers to display in your
                  widget
                </p>
              </div>

              <div className="space-y-4">
                {availableOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className={`flex items-center gap-4 p-3 border rounded-md cursor-pointer hover:bg-muted/50 ${
                      selectedOffers.includes(offer.id)
                        ? "border-primary bg-primary/5"
                        : ""
                    }`}
                    onClick={() => toggleOfferSelection(offer.id)}
                  >
                    <Checkbox
                      checked={selectedOffers.includes(offer.id)}
                      onCheckedChange={() => toggleOfferSelection(offer.id)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />

                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium">{offer.title}</h4>
                      <p className="text-sm text-muted-foreground truncate">
                        {offer.description}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm font-semibold">
                          £{offer.discountedPrice.toFixed(2)}
                        </span>
                        <span className="text-xs text-muted-foreground line-through">
                          £{offer.originalPrice.toFixed(2)}
                        </span>
                        <span className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded">
                          {offer.discountPercentage}% OFF
                        </span>
                      </div>
                    </div>

                    <div className="text-xs px-2 py-1 bg-muted rounded">
                      {offer.category}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {selectedOffers.length} of {widgetConfig.maxItems} selected
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedOffers([])}
                  disabled={selectedOffers.length === 0}
                >
                  Clear Selection
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="code" className="border rounded-md p-4 mt-4">
              <h2 className="text-xl font-semibold mb-4">Widget Code</h2>

              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  Copy and paste this code into your website where you want the
                  widget to appear
                </p>
              </div>

              <div className="relative">
                <Textarea
                  value={generateWidgetCode()}
                  readOnly
                  className="font-mono text-sm h-64 bg-muted"
                />

                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-2 right-2 flex items-center gap-1"
                  onClick={copyCodeToClipboard}
                >
                  {codeCopied ? (
                    <>
                      <CheckIcon className="h-4 w-4" />

                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon className="h-4 w-4" />

                      <span>Copy Code</span>
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold">
                  Installation Instructions
                </h3>

                <div className="space-y-2">
                  <h4 className="font-medium">WordPress</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Go to your WordPress dashboard</li>
                    <li>Navigate to Appearance {">"} Widgets</li>
                    <li>
                      Add a "Custom HTML" widget to your desired widget area
                    </li>
                    <li>Paste the code above into the content area</li>
                    <li>Click "Save" and check your site</li>
                  </ol>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Shopify</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Go to your Shopify admin</li>
                    <li>Navigate to Online Store {">"} Themes</li>
                    <li>Click "Actions" {">"} "Edit code"</li>
                    <li>
                      Find the template file where you want to add the widget
                    </li>
                    <li>Paste the code above at the desired location</li>
                    <li>Click "Save" and check your site</li>
                  </ol>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Wix</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Go to your Wix Editor</li>
                    <li>Click the "+" button to add an element</li>
                    <li>Choose "Embed" {">"} "HTML iframe"</li>
                    <li>Click "Enter code"</li>
                    <li>Paste the code above and click "Update"</li>
                    <li>Position the element and publish your site</li>
                  </ol>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="settings"
              className="border rounded-md p-4 mt-4"
            >
              <h2 className="text-xl font-semibold mb-4">Advanced Settings</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-2">
                    Widget Behavior
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="responsiveLayout" className="mb-0">
                          Responsive Layout
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Automatically adjust to screen size
                        </p>
                      </div>
                      <Switch id="responsiveLayout" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="lazyLoading" className="mb-0">
                          Lazy Loading
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Load images only when visible
                        </p>
                      </div>
                      <Switch id="lazyLoading" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="trackClicks" className="mb-0">
                          Track Interactions
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Record clicks and views
                        </p>
                      </div>
                      <Switch id="trackClicks" defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-base font-medium mb-2">Performance</h3>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="loadPriority">Load Priority</Label>
                      <Select defaultValue="normal">
                        <SelectTrigger id="loadPriority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">
                            High - Load immediately
                          </SelectItem>
                          <SelectItem value="normal">
                            Normal - Load with page
                          </SelectItem>
                          <SelectItem value="low">
                            Low - Load after page content
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="cacheTime">Cache Duration</Label>
                      <Select defaultValue="hour">
                        <SelectTrigger id="cacheTime">
                          <SelectValue placeholder="Select cache time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No caching</SelectItem>
                          <SelectItem value="hour">1 hour</SelectItem>
                          <SelectItem value="day">24 hours</SelectItem>
                          <SelectItem value="week">1 week</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-base font-medium mb-2">
                    Advanced Options
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="customCss">Custom CSS</Label>
                      <Textarea
                        id="customCss"
                        placeholder=".buildconnect-widget { /* your custom styles */ }"
                        className="font-mono text-sm"
                      />

                      <p className="text-xs text-muted-foreground mt-1">
                        Add custom CSS to further customize the widget
                        appearance
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="debugMode" className="mb-0">
                          Debug Mode
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Show detailed logs in console
                        </p>
                      </div>
                      <Switch id="debugMode" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <div className="border rounded-md p-4 sticky top-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Widget Preview</h2>

              <div className="flex items-center gap-2 border rounded-md">
                <Button
                  variant={previewDevice === "mobile" ? "secondary" : "ghost"}
                  size="sm"
                  className="h-8 px-2"
                  onClick={() => setPreviewDevice("mobile")}
                >
                  <SmartphoneIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant={previewDevice === "desktop" ? "secondary" : "ghost"}
                  size="sm"
                  className="h-8 px-2"
                  onClick={() => setPreviewDevice("desktop")}
                >
                  <MonitorIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                  onClick={() => {
                    // Refresh preview
                    const newConfig = { ...widgetConfig };
                    setWidgetConfig(newConfig);
                  }}
                >
                  <RefreshCwIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div
              className={`border rounded-md overflow-hidden ${previewDevice === "mobile" ? "max-w-[320px] mx-auto" : ""}`}
            >
              <div className="bg-gray-100 dark:bg-gray-800 p-2 text-xs flex items-center justify-between border-b">
                <span>Preview</span>
                <div className="flex items-center gap-1">
                  <InfoIcon className="h-3 w-3" />

                  <span>
                    {previewDevice === "mobile" ? "Mobile" : "Desktop"} view
                  </span>
                </div>
              </div>

              <div className="p-4 bg-background">{renderWidgetPreview()}</div>
            </div>

            <div className="mt-4">
              <Button className="w-full" onClick={copyCodeToClipboard}>
                <CopyIcon className="h-4 w-4 mr-2" />
                Copy Widget Code
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
