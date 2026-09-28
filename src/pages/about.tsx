import { Breadcrumb, Container } from "@/components";
import { teamMembers } from "@/data/teamMembers";
import { Globe, ArrowRight } from "lucide-react";
import { aboutContent } from "@/data/about";
import Image from "next/image";
import Link from "next/link";


export default function AboutPage() {
  return (
    <>
      <section className={`bg-gray-100`}>
        <Container
          element="div"
          className={"text-center py-10 flex flex-col items-center"}
        >
          <Breadcrumb
            items={[
              {
                name: "Home",
                href: "/",
              },
              {
                name: "About Us",
                href: "/about",
              },
            ]}
          />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-4">
            About Quick Pic Convert
          </h1>
          <p className="text-lg text-muted-foreground">
            We're on a mission to make image conversion and optimization
            accessible to everyone, everywhere — for free.
          </p>
        </Container>
      </section>

      {/* Stats Section */}
      <Container element="section" className="py-12 border-y border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {aboutContent.stats.map((stat: any, index: number) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Mission Section */}
      <Container element={"section"} className="py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider">
              Our Story
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Built by Creators,{" "}
              <span className="gradient-text">for Creators</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Quick Pic Convert was born out of frustration. As designers and
                developers, we were tired of clunky, slow, and privacy-invasive
                image tools that required uploading files to unknown servers.
              </p>
              <p>
                We asked ourselves: why can't image conversion be instant, free,
                and completely private? With modern browser technology, there's
                no reason it can't be.
              </p>
              <p>
                Today, Quick Pic Convert serves millions of users worldwide from
                professional photographers to casual social media users all
                enjoying fast, secure, and unlimited image processing.
              </p>
            </div>
          </div>
          <div className={"relative flex flex-row items-center justify-end"}>
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
      </Container>

      {/* Values Section */}
      <Container element="section" className="py-20">
        <div className={"text-center max-w-2xl mx-auto mb-16"}>
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider">
            Our Values
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What We Stand For
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {aboutContent.values.map((value, index) => (
            <ValueCard key={value.title} value={value} index={index} />
          ))}
        </div>
      </Container>

      {/* Team Section */}
      <Container className="py-20" element="section">
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
      </Container>

      {/* Contact CTA */}
      <Container className="py-20" element="section">
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
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
            >
              Contact Us
            </a>
          </div>
        </div>
      </Container>
    </>
  );
}

interface ValueCardProps {
  value: (typeof aboutContent.values)[0];
  index: number;
}

function ValueCard({ value }: ValueCardProps) {
  return (
    <div
      className={
        "bg-white rounded-2xl p-6 border border-gray-200 text-center hover:border-primary/50 hover:shadow-lg transition-all duration-300"
      }
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
