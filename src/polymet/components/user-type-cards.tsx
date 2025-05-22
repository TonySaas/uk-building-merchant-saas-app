import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBagIcon, ShoppingCartIcon, UsersIcon } from "lucide-react";

interface UserTypeCardsProps {
  onSelect?: (userType: string) => void;
}

export default function UserTypeCards({ onSelect }: UserTypeCardsProps) {
  const userTypes = [
    {
      id: "supplier",
      title: "Supplier Portal",
      description: "Create and manage special offers for merchants",
      icon: <ShoppingBagIcon className="h-8 w-8 text-blue-600" />,

      features: [
        "Create promotional campaigns",
        "Track merchant engagement",
        "Analyze performance metrics",
        "Manage product listings",
      ],

      cta: "Access Supplier Portal",
    },
    {
      id: "merchant",
      title: "Merchant Portal",
      description: "Select offers and implement on your website",
      icon: <ShoppingCartIcon className="h-8 w-8 text-green-600" />,

      features: [
        "Browse available promotions",
        "Customize offers for your store",
        "Track consumer engagement",
        "Generate marketing materials",
      ],

      cta: "Access Merchant Portal",
    },
    {
      id: "consumer",
      title: "Consumer App",
      description: "Discover offers and find local merchants",
      icon: <UsersIcon className="h-8 w-8 text-purple-600" />,

      features: [
        "Find nearby special offers",
        "Compare prices across merchants",
        "Save favorite products",
        "Get notifications for new deals",
      ],

      cta: "Download Consumer App",
    },
  ];

  const handleSelect = (userType: string) => {
    if (onSelect) {
      onSelect(userType);
    }
  };

  return (
    <div className="w-full">
      <h2 className="mb-6 text-center text-2xl font-bold tracking-tight md:text-3xl">
        Choose Your Portal
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {userTypes.map((type) => (
          <Card
            key={type.id}
            className="flex h-full flex-col transition-all duration-300 hover:shadow-lg"
          >
            <CardHeader>
              <div className="mb-4">{type.icon}</div>
              <CardTitle>{type.title}</CardTitle>
              <CardDescription>{type.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {type.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleSelect(type.id)}>
                {type.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
