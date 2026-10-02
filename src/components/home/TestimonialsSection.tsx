import { Star, Quote } from "lucide-react";
import { Reviews } from "@/data/reviews";
import { cn } from "@/lib/utils";

import { Container } from "../Container";


export function TestimonialsSection() {
  return (
    <Container element="section" className="w-10/12 mx-auto py-20">
      <div className={"text-center mb-16"}>
        <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider">
          Testimonials
        </span>
        <h2 className="text-3xl sm:text-4xl 2xl:text-5xl font-bold text-foreground mb-4">
          Loved by Creators
        </h2>
        <p className="text-lg">
          Join thousands of satisfied users who trust Quick Pic Convert for their
          image needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {Reviews.map((r) => (
          <TestimonialCard key={r.name} testimonial={r} />
        ))}
      </div>
    </Container>
  );
}

interface TestimonialCardProps {
  testimonial: (typeof Reviews)[0];
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "group relative bg-card rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
      )}
    >
      {/* Quote Icon */}
      <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/50" />

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
        ))}
      </div>

      {/* Text */}
      <p className="text-foreground leading-relaxed mb-6">
        "{testimonial.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
          {testimonial.avatar}
        </div>
        <div>
          <p className="font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
