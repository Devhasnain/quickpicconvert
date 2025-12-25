import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';


export function CTASection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary/30">
      <div className="container-custom">
        <div
          ref={ref}
          className={cn(
            'relative overflow-hidden rounded-3xl gradient-bg p-8 sm:p-12 lg:p-16',
            isVisible ? 'animate-scale-in' : 'opacity-0'
          )}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">
                100% Free, No Sign-up Required
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Transform Your Images?
            </h2>

            <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Start converting images instantly. No registration, no limits, no watermarks — just powerful image tools at your fingertips.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="xl"
                className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                asChild
              >
                <Link href="/tools">
                  Start Converting Now
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
              </Button>
              <Button
                size="xl"
                variant="ghost"
                className="text-primary-foreground hover:bg-white/10"
                asChild
              >
                <Link href="/blog">Read Our Blog</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
