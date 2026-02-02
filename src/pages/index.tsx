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
  title="Quick Pic Convert – Free Image Converter, Compressor & Editor"
  description="Quick Pic Convert is a fast, free online image converter and editor. Convert JPG, PNG, WebP, compress, resize, crop, enhance images, and remove backgrounds—100% browser-based."
  keywords="image converter, free image converter, jpg to png, png to jpg, webp converter, image compressor, resize images, crop images, background remover, online image tools"
  canonical="https://quickpicconvert.com/"
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
