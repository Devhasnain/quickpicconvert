import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

import PageHeroSectionBackground from "../PageHeroSectionBackground";


const features = [
  { icon: Zap, text: "Lightning Fast" },
  { icon: Shield, text: "100% Secure" },
  { icon: Sparkles, text: "Free Forever" },
];

export function HeroSection() {
  const { ref } = useScrollAnimation();

  return (
    <PageHeroSectionBackground>
      <div className="container-custom relative z-10">
        <div ref={ref} className={cn("max-w-4xl mx-auto text-center")}>
          {/* Badge */}
          <div
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-8"
            )}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-accent-foreground">
              100% browser-based image converter — no uploads required
            </span>
          </div>

          {/* SEO Optimized H1 */}
          <h1
            className={cn(
              "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
            )}
          >
            Free Online <span className="gradient-text">Image Converter</span>
            <br />
            <small>JPG, PNG, WebP & More</small>
          </h1>

          {/* SEO Optimized Subtitle */}
          <p
            className={cn(
              "text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            )}
          >
            Quick Pic Converter lets you convert images online in seconds.
            Convert JPG to PNG, PNG to JPG, WebP, compress images, resize, crop,
            and enhance — all for free with complete privacy.
          </p>

          {/* CTA Buttons */}
          <div
            className={cn(
              "flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            )}
          >
            <Button variant="hero" size="xl" asChild>
              <Link href="/tools/image-converter">
                Convert Images Now
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link href="#how-it-works">How It Works</Link>
            </Button>
          </div>

          {/* Feature Pills */}
          <div
            className={cn("flex flex-wrap items-center justify-center gap-4")}
          >
            {features.map((feature) => (
              <div
                key={feature.text}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-soft"
              >
                <feature.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageHeroSectionBackground>
  );
}
