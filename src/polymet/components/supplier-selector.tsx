import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Supplier {
  id: string;
  name: string;
  logo: string;
  description: string;
}

interface SupplierSelectorProps {
  suppliers: Supplier[];
  onSelect?: (supplier: Supplier) => void;
}

export default function SupplierSelector({
  suppliers,
  onSelect,
}: SupplierSelectorProps) {
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);

  const handleSelect = (supplier: Supplier) => {
    setSelectedSupplier(supplier.id);
    if (onSelect) {
      onSelect(supplier);
    }
  };

  return (
    <div className="w-full">
      <h2 className="mb-6 text-center text-2xl font-bold tracking-tight md:text-3xl">
        Suppliers
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {suppliers.map((supplier) => (
          <Card
            key={supplier.id}
            className={cn(
              "cursor-pointer transition-all duration-300 hover:shadow-lg",
              selectedSupplier === supplier.id
                ? "border-2 border-primary shadow-md"
                : "border border-border hover:border-primary/50"
            )}
            onClick={() => handleSelect(supplier)}
          >
            <CardContent className="flex flex-col items-center justify-center p-4">
              <div className="mb-3 flex h-16 items-center justify-center bg-secondary p-2">
                <img
                  src={supplier.logo}
                  alt={`${supplier.name} logo`}
                  className="h-12 max-w-full object-contain"
                />
              </div>
              <h3 className="text-center text-lg font-medium">
                {supplier.name}
              </h3>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                {supplier.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
