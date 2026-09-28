import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


export function CTASection() {

  return (
    <section className="py-20">
      <div className="w-10/12 bg-primary text-white mx-auto rounded-lg">
        <div
          className={'relative overflow-hidden rounded-3xl gradient-bg p-8 sm:p-12 lg:p-16'}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-size-[40px_40px]" />
          
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
             <Link className='bg-white text-primary font-medium rounded-lg px-10 py-4' href={"/"}>
             Start Converting Now
             </Link>
                <Link className='font-medium rounded-lg px-10 py-4 hover:bg-white hover:text-primary text-white' href="/blog">Read Our Blog</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
