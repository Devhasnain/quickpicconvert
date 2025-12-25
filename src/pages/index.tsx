import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HeroSection } from "@/components/home/HeroSection";
import { CTASection } from "@/components/home/CTASection";
import { PageSEO } from "@/components/PageSEO";


const Index = () => {
  return (
    <>
      <PageSEO
        title="Quick Pic Converter – Fast & Free Image Converter, Compressor & Editor"
        description="Quick Pic Converter is an all-in-one online image converter platform. Convert JPG, PNG, WebP, compress images, resize, crop, enhance, and remove backgrounds instantly with fast, secure, browser-based tools."
        keywords="image converter, jpg to png, png to jpg, webp converter, image compressor, resize images, crop images, background remover, online image tools, free image converter"
        canonical="https://quickpicconverter.com/"
      />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
};

export default Index;
