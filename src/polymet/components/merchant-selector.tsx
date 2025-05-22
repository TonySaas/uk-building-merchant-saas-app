import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MapPinIcon } from "lucide-react";

interface Merchant {
  id: string;
  name: string;
  logo: string;
  description: string;
  locations?: number;
}

interface MerchantSelectorProps {
  merchants: Merchant[];
  onSelect?: (merchant: Merchant) => void;
}

export default function MerchantSelector({
  merchants,
  onSelect,
}: MerchantSelectorProps) {
  const [selectedMerchant, setSelectedMerchant] = useState<string | null>(null);

  const handleSelect = (merchant: Merchant) => {
    setSelectedMerchant(merchant.id);
    if (onSelect) {
      onSelect(merchant);
    }
  };

  return (
    <div className="w-full">
      <h2 className="mb-6 text-center text-2xl font-bold tracking-tight md:text-3xl">
        Merchant
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {merchants.map((merchant) => (
          <Card
            key={merchant.id}
            className={cn(
              "cursor-pointer transition-all duration-300 hover:shadow-lg",
              selectedMerchant === merchant.id
                ? "border-2 border-primary shadow-md"
                : "border border-border hover:border-primary/50"
            )}
            onClick={() => handleSelect(merchant)}
          >
            <CardContent className="flex flex-col items-center justify-center p-4">
              <div className="mb-3 flex h-16 items-center justify-center bg-secondary p-2">
                <img
                  src={merchant.logo}
                  alt={`${merchant.name} logo`}
                  className="h-12 max-w-full object-contain"
                />
              </div>
              <h3 className="text-center text-lg font-medium">
                {merchant.name}
              </h3>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                {merchant.description}
              </p>
              {merchant.locations && (
                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                  <MapPinIcon className="mr-1 h-3 w-3" />

                  <span>{merchant.locations} locations nationwide</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
