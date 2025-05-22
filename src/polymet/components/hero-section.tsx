import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

export default function HeroSection({ title, subtitle }: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-16 md:py-24">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/pattern123/1200/800')] bg-repeat opacity-20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-900 to-transparent"></div>
      </div>

      <div className="container relative mx-auto px-4 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-lg text-blue-100 md:text-xl">
          {subtitle}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
            Get Started
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-black dark:text-white hover:bg-white/10"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
