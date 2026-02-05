import PageHeroSectionBackground from "@/components/PageHeroSectionBackground";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { teamMembers } from "@/data/teamMembers";
import { Globe, ArrowRight } from "lucide-react";
import { PageSEO } from "@/components/PageSEO";
import { aboutContent } from "@/data/about";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";


export default function AboutPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: missionRef, isVisible: missionVisible } = useScrollAnimation();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation();

  return (
    <>
      <PageSEO
        title="About Quick Pic Convert – Fast & Private Image Tools"
        description="Learn about Quick Pic Convert, a free browser-based image tools platform focused on fast performance, privacy, and ease of use."
        canonical="https://quickpicconvert.com/about"
        keywords="about quick pic convert, image tools platform, online image converter, free image tools"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Quick Pic Convert",
              url: "https://quickpicconvert.com/about",
              logo: "https://quickpicconvert.com/logo-lg.png",
              description:
                "Quick Pic Convert provides fast, private, browser-based image conversion and optimization tools.",
              sameAs: [
                "https://twitter.com/quickpicconvert",
                "https://github.com/quickpicconvert",
              ],
            }),
          }}
        />
      </PageSEO>

      {/* Hero Section */}
        <PageHeroSectionBackground
        className="!min-h-[70vh]"
        >
        <div className="container-custom">
          <div
            ref={heroRef}
            className={cn(
              "text-center max-w-3xl mx-auto",
              heroVisible ? "animate-fade-up" : "opacity-0"
            )}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6">
              About <br /><span className="gradient-text">Quick Pic Convert</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We're on a mission to make image conversion and optimization
              accessible to everyone, everywhere — for free.
            </p>
          </div>
        </div>
        </PageHeroSectionBackground>

      {/* Stats Section */}
      <section className="py-12 bg-background border-y border-border">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {aboutContent.stats.map((stat, index) => (
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
                missionVisible ? "animate-slide-in-left" : "opacity-0"
              )}
            >
              <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
                Our Story
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Built by Creators,{" "}
                <span className="gradient-text">for Creators</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Quick Pic Convert was born out of frustration. As designers
                  and developers, we were tired of clunky, slow, and
                  privacy-invasive image tools that required uploading files to
                  unknown servers.
                </p>
                <p>
                  We asked ourselves: why can't image conversion be instant,
                  free, and completely private? With modern browser technology,
                  there's no reason it can't be.
                </p>
                <p>
                  Today, Quick Pic Convert serves millions of users worldwide —
                  from professional photographers to casual social media users —
                  all enjoying fast, secure, and unlimited image processing.
                </p>
              </div>
            </div>
            <div
              className={cn(
                "relative",
                missionVisible ? "animate-slide-in-right" : "opacity-0"
              )}
            >
              <Image
                alt="Creators and developers building fast, private, browser-based image tools at Quick Pic Convert"
                src={
                  "/images/quick-pic-convert-creators-building-private-image-tools.webp"
                }
                height={600}
                width={600}
                className="rounded-lg overflow-hidden"
              />
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
              "text-center max-w-2xl mx-auto mb-16",
              valuesVisible ? "animate-fade-up" : "opacity-0"
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
            {aboutContent.values.map((value, index) => (
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

          <div className="flex flex-row gap-24 max-w-4xl mx-auto items-center justify-center">
            {teamMembers.map((member) => (
              <Link
                target="_blank"
                href={`/team/${member.slug}`}
                key={member.name}
                className="text-center group"
              >
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden gradient-bg flex items-center justify-center text-2xl font-bold text-primary-foreground mb-4">
                  {/* {member.avatar} */}
                  <Image
                    width={100}
                    height={100}
                    alt="Quick-pic-convert-lead-developer-hasnain-alam-image"
                    className="h-full w-full object-cover"
                    src={member.image}
                  />
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <span className="inline-flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity mt-2">
                  View Profile <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
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
              Have questions, feedback, or just want to say hi? We'd love to
              hear from you.
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
  value: (typeof aboutContent.values)[0];
  index: number;
}

function ValueCard({ value, index }: ValueCardProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const delay = index * 100;

  return (
    <div
      ref={ref}
      className={cn(
        "bg-card rounded-2xl p-6 border border-border text-center hover:border-primary/30 hover:shadow-soft-lg transition-all duration-300",
        isVisible ? "animate-fade-up" : "opacity-0"
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
