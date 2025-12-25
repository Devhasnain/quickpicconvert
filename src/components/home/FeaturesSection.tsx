import { Zap, Shield, Globe, Smartphone, Palette, Download } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';


const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Convert images in milliseconds with our optimized browser-based engine. No server delays.',
  },
  {
    icon: Shield,
    title: 'Complete Privacy',
    description: 'Your images never leave your device. All processing happens locally in your browser.',
  },
  {
    icon: Globe,
    title: 'All Formats',
    description: 'Support for PNG, JPG, WEBP, GIF, BMP, TIFF, AVIF, and more formats.',
  },
  {
    icon: Smartphone,
    title: 'Works Everywhere',
    description: 'Responsive design works perfectly on desktop, tablet, and mobile devices.',
  },
  {
    icon: Palette,
    title: 'Quality Control',
    description: 'Fine-tune compression levels and output quality to match your exact needs.',
  },
  {
    icon: Download,
    title: 'Batch Processing',
    description: 'Convert multiple images at once. Save time with bulk operations.',
  },
];

export function FeaturesSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div
          ref={ref}
          className={cn(
            'text-center max-w-2xl mx-auto mb-16',
            isVisible ? 'animate-fade-up' : 'opacity-0'
          )}
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Powerful Features for{' '}
            <span className="gradient-text">Every Need</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to convert, compress, and optimize your images efficiently.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  feature: typeof features[0];
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const delay = index * 100;

  return (
    <div
      ref={ref}
      className={cn(
        'group tool-card',
        isVisible ? 'animate-fade-up' : 'opacity-0'
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-5 group-hover:shadow-glow transition-shadow duration-300">
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
