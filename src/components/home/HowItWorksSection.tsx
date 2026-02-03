import { Upload, Settings, Download, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';


const steps = [
  {
    icon: Upload,
    step: '01',
    title: 'Upload Your Image',
    description: 'Drag and drop or click to select your images. We support all popular formats.',
  },
  {
    icon: Settings,
    step: '02',
    title: 'Choose Settings',
    description: 'Select output format, adjust quality, resize dimensions — customize as needed.',
  },
  {
    icon: Download,
    step: '03',
    title: 'Download Result',
    description: 'Get your converted image instantly. No watermarks, no limits, no sign-up.',
  },
];

export function HowItWorksSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="section-padding bg-secondary/30" id='how-it-works'>
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
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Convert your images in three simple steps. Fast, easy, and completely free.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <StepCard
              key={step.step}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface StepCardProps {
  step: typeof steps[0];
  index: number;
  isLast: boolean;
}

function StepCard({ step, index, isLast }: StepCardProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const delay = index * 150;

  return (
    <div className="relative">
      <div
        ref={ref}
        className={cn(
          'relative text-center',
          isVisible ? 'animate-fade-up' : 'opacity-0'
        )}
        style={{ animationDelay: `${delay}ms` }}
      >
        {/* Step Number */}
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-8xl font-extrabold text-primary/10 select-none">
          {step.step}
        </span>

        {/* Icon */}
        <div className="relative z-10 w-20 h-20 mx-auto rounded-3xl gradient-bg flex items-center justify-center mb-6 shadow-glow">
          <step.icon className="w-10 h-10 text-primary-foreground" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-foreground mb-3">
          {step.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* Arrow Connector */}
      {!isLast && (
        <div className="hidden md:block absolute top-20 right-0 translate-x-1/2 -translate-y-1/2">
          <ArrowRight className="w-8 h-8 text-primary/30" />
        </div>
      )}
    </div>
  );
}
