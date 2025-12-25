import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';


export default function TermsPage() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-hero-bg">
        <div className="container-custom">
          <div
            ref={ref}
            className={cn(
              'text-center max-w-3xl mx-auto',
              isVisible ? 'animate-fade-up' : 'opacity-0'
            )}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6">
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: January 15, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <div className="bg-card rounded-2xl border border-border p-8 md:p-12 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using QuickPicConvert, you accept and agree to be bound by the terms 
                  and provisions of this agreement. If you do not agree to these terms, please do not 
                  use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Use of Services</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our services are provided free of charge for personal and commercial use. You agree to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Use the services only for lawful purposes</li>
                  <li>Not attempt to disrupt or interfere with our services</li>
                  <li>Not use automated tools to excessively access our services</li>
                  <li>Respect intellectual property rights of others</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The QuickPicConvert name, logo, website design, and all related content are the property 
                  of QuickPicConvert and are protected by intellectual property laws. You retain all rights 
                  to your original images.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">User Content</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You are solely responsible for the images you process using our tools. We do not store, 
                  view, or have access to your images as all processing occurs locally in your browser. 
                  You must have the right to use and modify any images you process.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Disclaimer of Warranties</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are provided "as is" without any warranties, express or implied. We do not 
                  guarantee that our services will be uninterrupted, error-free, or meet your specific 
                  requirements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In no event shall QuickPicConvert be liable for any indirect, incidental, special, 
                  consequential, or punitive damages arising from your use of our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time. Changes will be effective 
                  immediately upon posting. Your continued use of our services constitutes acceptance 
                  of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms shall be governed by and construed in accordance with applicable laws, 
                  without regard to conflict of law principles.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For any questions regarding these terms, please contact us at{' '}
                  <a href="mailto:legal@quickpicconvert.com" className="text-primary hover:underline">
                    legal@quickpicconvert.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
