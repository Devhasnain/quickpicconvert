import { Zap, Shield, Globe, Smartphone, Palette, Download, } from "lucide-react";
import { cn } from "@/lib/utils";

import { Container } from "../Container";


const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Convert images in milliseconds with our optimized browser-based engine. No server delays.",
  },
  {
    icon: Shield,
    title: "Complete Privacy",
    description:
      "Your images never leave your device. All processing happens locally in your browser.",
  },
  {
    icon: Globe,
    title: "All Formats",
    description:
      "Support for PNG, JPG, WEBP, GIF, BMP, TIFF, AVIF, and more formats.",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    description:
      "Responsive design works perfectly on desktop, tablet, and mobile devices.",
  },
  {
    icon: Palette,
    title: "Quality Control",
    description:
      "Fine-tune compression levels and output quality to match your exact needs.",
  },
  {
    icon: Download,
    title: "Batch Processing",
    description:
      "Convert multiple images at once. Save time with bulk operations.",
  },
];

export function FeaturesSection() {
  return (
    <Container element="section" className="space-y-8 py-20">
      <div className={"text-center mx-auto mb-16"}>
        <span className="inline-block text-sm font-semibold uppercase tracking-wider">
          Why Us
        </span>
        <h2 className="text-3xl sm:text-4xl 2xl:text-5xl font-bold text-foreground mb-4">
          Why Choose <span className="text-primary"> Quick Pic Convert </span>{" "}
          for Image Conversion?
        </h2>
        <p className="text-lg text-muted-foreground">
          Quick Pic Convert is a free image converter built for speed and privacy.
          Your images are converted inside your browser, so they are never
          uploaded to a server. Enjoy fast results, high quality output, and no
          sign up or watermark.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </div>
    </Container>
  );
}

interface FeatureCardProps {
  feature: (typeof features)[0];
}

function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div
      className={"border border-gray-200 shadow hover:shadow-xl p-8 rounded-lg"}
    >
      <div className="w-12 h-12 bg-primary text-white rounded-lg gradient-bg flex items-center justify-center mb-5 group-hover:shadow-glow transition-shadow duration-300">
        <feature.icon className="w-7 h-7 text-primary-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">
        {feature.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}
