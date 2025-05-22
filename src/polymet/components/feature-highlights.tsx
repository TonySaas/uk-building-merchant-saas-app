import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircleIcon,
  LinkIcon,
  PercentIcon,
  TrendingUpIcon,
} from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function FeatureHighlights() {
  const features: Feature[] = [
    {
      title: "Unified Promotions",
      description:
        "Create and manage special offers across multiple organizations in one place",
      icon: <PercentIcon className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Seamless Integration",
      description:
        "Easily integrate offers with your existing e-commerce and POS systems",
      icon: <LinkIcon className="h-8 w-8 text-green-500" />,
    },
    {
      title: "Performance Analytics",
      description:
        "Track and analyze the performance of your promotions in real-time",
      icon: <TrendingUpIcon className="h-8 w-8 text-purple-500" />,
    },
    {
      title: "Multi-Organization Support",
      description:
        "Support for Toolbank, NMBS, IBC, BMF and other industry organizations",
      icon: <CheckCircleIcon className="h-8 w-8 text-orange-500" />,
    },
  ];

  return (
    <section className="w-full bg-secondary py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
          Platform Features
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-none bg-white shadow-md dark:bg-gray-800"
            >
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
