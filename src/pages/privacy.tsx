import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';


export default function PrivacyPage() {
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
              Privacy <span className="gradient-text">Policy</span>
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
                <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  At QuickPicConvert, we take your privacy seriously. This Privacy Policy explains how we collect, 
                  use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect minimal information to provide our services:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Usage data (pages visited, features used)</li>
                  <li>Device information (browser type, operating system)</li>
                  <li>IP address (anonymized for analytics)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Image Processing</h2>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Your images are processed entirely in your browser.</strong> We do not upload, 
                  store, or have access to any images you convert using our tools. All processing happens 
                  locally on your device using browser-based technology.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use essential cookies to ensure our website functions properly and analytics cookies 
                  to understand how visitors use our site. You can control cookie preferences through your 
                  browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may use third-party services for analytics and advertising. These services may collect 
                  information about your browsing activity. We recommend reviewing their privacy policies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures to protect any data we 
                  collect. However, no method of transmission over the Internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Depending on your location, you may have the right to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Access the personal data we hold about you</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of analytics tracking</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at{' '}
                  <a href="mailto:privacy@quickpicconvert.com" className="text-primary hover:underline">
                    privacy@quickpicconvert.com
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
