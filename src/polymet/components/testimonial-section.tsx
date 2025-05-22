import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export default function TestimonialSection() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Purchasing Manager",
      company: "BuildRight Merchants",
      avatar: "https://github.com/yahyabedirhan.png",
      content:
        "This platform has transformed how we manage promotions. We've seen a 30% increase in customer engagement since implementing the special offers feature.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Thompson",
      role: "Sales Director",
      company: "ToolPro Supplies",
      avatar: "https://github.com/furkanksl.png",
      content:
        "The integration between suppliers and merchants is seamless. We can now launch promotions across our entire network with just a few clicks.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emma Wilson",
      role: "Marketing Lead",
      company: "HomeBase Construction",
      avatar: "https://github.com/kdrnp.png",
      content:
        "The consumer app has helped us reach a whole new audience. Our customers love being able to find our special offers so easily.",
      rating: 4,
    },
  ];

  return (
    <section className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 py-16 dark:from-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="overflow-hidden border-none bg-white shadow-md dark:bg-gray-800"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="mb-6 text-muted-foreground">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />

                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
