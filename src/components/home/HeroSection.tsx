import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";


const features = [
  { icon: Zap, text: "Lightning Fast" },
  { icon: Shield, text: "100% Secure" },
  { icon: Sparkles, text: "Free Forever" },
];

export function HeroSection() {
  const { ref } = useScrollAnimation();

  return (
    <section
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      aria-label="Quick Pic Converter Hero Section"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.webp"
          title="Online image converter background for JPG PNG and WebP conversion"
          alt="Online image converter background for JPG PNG and WebP conversion"
          width={800}
          height={800}
          className="w-full h-full object-cover opacity-40"
          preload={true}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-end/10 rounded-full blur-3xl animate-pulse-slow delay-300" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.5)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.5)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />

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

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
