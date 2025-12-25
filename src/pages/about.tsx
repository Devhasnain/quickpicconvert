import { Users, Target, Heart, Award, Zap, Globe } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';


const stats = [
  { value: '10M+', label: 'Images Converted' },
  { value: '500K+', label: 'Happy Users' },
  { value: '50+', label: 'Countries' },
  { value: '99.9%', label: 'Uptime' },
];

const values = [
  {
    icon: Users,
    title: 'User First',
    description: 'Every feature we build starts with our users\' needs. We listen, iterate, and improve constantly.',
  },
  {
    icon: Target,
    title: 'Simplicity',
    description: 'We believe powerful tools don\'t need to be complicated. Simple is better.',
  },
  {
    icon: Heart,
    title: 'Privacy Matters',
    description: 'Your images are yours. We process everything locally and never store your files.',
  },
  {
    icon: Award,
    title: 'Quality Focus',
    description: 'We never compromise on output quality. Your images deserve the best treatment.',
  },
];

const team = [
  { name: 'Alex Thompson', role: 'Founder & CEO', avatar: 'AT' },
  { name: 'Sarah Chen', role: 'Lead Developer', avatar: 'SC' },
  { name: 'Michael Park', role: 'Product Designer', avatar: 'MP' },
  { name: 'Emily Davis', role: 'Marketing Lead', avatar: 'ED' },
];

export default function AboutPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: missionRef, isVisible: missionVisible } = useScrollAnimation();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation();

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-hero-bg">
        <div className="container-custom">
          <div
            ref={heroRef}
            className={cn(
              'text-center max-w-3xl mx-auto',
              heroVisible ? 'animate-fade-up' : 'opacity-0'
            )}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6">
              About <span className="gradient-text">QuickPicConvert</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We're on a mission to make image conversion and optimization accessible to everyone, 
              everywhere — for free.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background border-y border-border">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              ref={missionRef}
              className={cn(
                missionVisible ? 'animate-slide-in-left' : 'opacity-0'
              )}
            >
              <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                Our Story
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Built by Creators, <span className="gradient-text">for Creators</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  QuickPicConvert was born out of frustration. As designers and developers, 
                  we were tired of clunky, slow, and privacy-invasive image tools that required 
                  uploading files to unknown servers.
                </p>
                <p>
                  We asked ourselves: why can't image conversion be instant, free, and completely 
                  private? With modern browser technology, there's no reason it can't be.
                </p>
                <p>
                  Today, QuickPicConvert serves millions of users worldwide — from professional 
                  photographers to casual social media users — all enjoying fast, secure, and 
                  unlimited image processing.
                </p>
              </div>
            </div>
            <div
              className={cn(
                'relative',
                missionVisible ? 'animate-slide-in-right' : 'opacity-0'
              )}
            >
              <div className="aspect-square rounded-3xl gradient-bg p-1">
                <div className="w-full h-full rounded-3xl bg-card flex items-center justify-center">
                  <div className="text-center p-8">
                    <Zap className="w-20 h-20 mx-auto text-primary mb-6" />
                    <p className="text-2xl font-bold text-foreground">
                      Fast. Free. Private.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div
            ref={valuesRef}
            className={cn(
              'text-center max-w-2xl mx-auto mb-16',
              valuesVisible ? 'animate-fade-up' : 'opacity-0'
            )}
          >
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              Our Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              What We <span className="gradient-text">Stand For</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <ValueCard key={value.title} value={value} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              Our Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Meet the <span className="gradient-text">People</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full gradient-bg flex items-center justify-center text-2xl font-bold text-primary-foreground mb-4">
                  {member.avatar}
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <Globe className="w-12 h-12 mx-auto text-primary mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Get in Touch
            </h2>
            <p className="text-muted-foreground mb-8">
              Have questions, feedback, or just want to say hi? We'd love to hear from you.
            </p>
            <a
              href="mailto:hello@quickpicconvert.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-bg text-primary-foreground font-semibold hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

interface ValueCardProps {
  value: typeof values[0];
  index: number;
}

function ValueCard({ value, index }: ValueCardProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const delay = index * 100;

  return (
    <div
      ref={ref}
      className={cn(
        'bg-card rounded-2xl p-6 border border-border text-center hover:border-primary/30 hover:shadow-soft-lg transition-all duration-300',
        isVisible ? 'animate-fade-up' : 'opacity-0'
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-14 h-14 mx-auto rounded-2xl gradient-bg flex items-center justify-center mb-4">
        <value.icon className="w-7 h-7 text-primary-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {value.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {value.description}
      </p>
    </div>
  );
}
