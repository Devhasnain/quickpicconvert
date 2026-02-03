import { Github, Linkedin, Twitter, Globe, ArrowLeft, Briefcase, Calendar, Code2, Facebook, } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { PageBreadcrumbs } from "@/components/PageBreadcrumbs";
import { TeamMember, teamMembers } from "@/data/teamMembers";
import { Button } from "@/components/ui/button";
import { PageSEO } from "@/components/PageSEO";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";


type Props = {
  member: TeamMember;
  meta: {
    title: string;
    description: string;
    canonical: string;
    openGraph: {
      title: string;
      description: string;
      url: string;
      images: string;
    };
  };
  schema: any[];
};

export default function TeamMemberPage({ member, meta, schema }: Props) {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: aboutRef, isVisible: aboutVisible } = useScrollAnimation();
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation();

  // Update document meta for SEO
  useEffect(() => {
    if (member) {
      document.title = member.metaTitle;
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute("content", member.metaDescription);
      }
    }
  }, [member]);

  if (!member) {
    return (
      <>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Team Member Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The team member you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link href="/about">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to About
              </Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageSEO
      title={meta.title}
      description={meta.description}
      canonical={meta.canonical}
      ogTitle={meta.openGraph.title}
      ogDescription={meta.openGraph.description}
      ogURL={meta.openGraph.url}
      ogImage={meta.openGraph.images}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      </PageSEO>
      {/* Hero Section */}
      <section className="pt-28 pb-12 bg-hero-bg">
        <div className="container-custom">
          <PageBreadcrumbs
            items={[{ label: "About", href: "/about" }, { label: member.name }]}
          />

          <div
            ref={heroRef}
            className={cn(
              "flex flex-col md:flex-row items-center gap-8",
              heroVisible ? "animate-fade-up" : "opacity-0"
            )}
          >
            {/* Avatar */}
            <div className="w-40 overflow-hidden h-40 md:w-48 md:h-48 rounded-full gradient-bg flex items-center justify-center text-5xl md:text-6xl font-bold text-primary-foreground shadow-glow shrink-0">
              {/* {member.avatar} */}
              <Image alt="" src={member.image} height={200} width={200} />
            </div>

            {/* Info */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-2">
                {member.name}
              </h1>
              <p className="text-xl text-primary font-semibold mb-4">
                {member.role}
              </p>
              <p className="text-muted-foreground max-w-2xl leading-relaxed">
                {member.shortBio}
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3 mt-6 justify-center md:justify-start">
                {member.social.fiverr && (
                  <Link
                    href={member.social.fiverr}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <Facebook className="w-5 h-5" />
                  </Link>
                )}
                {member.social.github && (
                  <Link
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-5 h-5" />
                  </Link>
                )}
                {member.social.linkedin && (
                  <Link
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Link>
                )}
                {member.social.twitter && (
                  <Link
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    aria-label="Twitter Profile"
                  >
                    <Twitter className="w-5 h-5" />
                  </Link>
                )}
                {member.social.portfolio && (
                  <Link
                    href={member.social.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    aria-label="Personal Portfolio"
                  >
                    <Globe className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className=" py-16 bg-background">
        <div className="container-custom">
          <div
            ref={aboutRef}
            className={cn(
              "grid lg:grid-cols-3 gap-8",
              aboutVisible ? "animate-fade-up" : "opacity-0"
            )}
          >
            {/* Main Bio */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-primary" />
                About {member.name.split(" ")[0]}
              </h2>
              <div className="prose prose-lg text-muted-foreground max-w-none">
                {member.fullBio.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              <Card className="border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold gradient-text">
                    {member.yearsOfExperience}+ years
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    in the industry
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Core Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {member.coreExpertise.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="font-medium"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className=" py-16 bg-secondary/30">
        <div className="container-custom">
          <div
            ref={skillsRef}
            className={cn(skillsVisible ? "animate-fade-up" : "opacity-0")}
          >
            <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
              <Code2 className="w-6 h-6 text-primary" />
              Skills
            </h2>

            <div className="flex flex-wrap gap-3">
              {member.skills.map((tool) => (
                <div
                  key={tool}
                  className="px-5 py-3 rounded-full font-medium bg-accent transition-colors"
                >
                  {tool}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const getStaticPaths = async () => {
  try {
    const paths: string[] = [];
    teamMembers.forEach((item: any) => {
      paths.push(`/team/${item?.slug}`);
    });
    return {
      paths,
      fallback: true,
    };
  } catch (_error) {
    return {
      paths: [],
      fallback: true,
    };
  }
};

export const getStaticProps = async (context: { params: { slug: string } }) => {
  try {
    const member = teamMembers.find(
      (item) => item.slug === context.params.slug
    );

    if (!member) {
      return {
        props: {
          member: null,
          meta: null,
          schema: null,
        },
      };
    }
    const meta = {
      title: `${member.name} – ${member.role} | Quick Pic Convert Team`,
      description: `${member.name} is a ${
        member.role
      } at Quick Pic Convert, specializing in ${member.skills.join(", ")}.`,
      canonical: `https://quickpicconvert.com/team/${member.slug}`,
      openGraph: {
        title: `${member.name} – ${member.role}`,
        description: member.fullBio,
        url: `https://quickpicconvert.com/team/${member.slug}`,
        images: member.image,
      },
    };
    const PERSON_SCHEMA_OBJECT = {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `https://quickpicconvert.com/team/${member.slug}#person`,
      name: member.name,
      url: `https://quickpicconvert.com/team/${member.slug}`,
      image: `https://quickpicconvert.com/images/team/${member.slug}.webp`,
      jobTitle: member.role,
      worksFor: {
        "@type": "Organization",
        name: "Quick Pic Convert",
        url: "https://quickpicconvert.com",
      },
      description: member.shortBio,
      sameAs: member.social,
      knowsAbout: member.skills,
    };
    const PROFILE_PAGE_SCHEMA_OBJECT = {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `https://quickpicconvert.com/team/${member.slug}#profilepage`,
      mainEntity: {
        "@id": `https://quickpicconvert.com/team/${member.slug}#person`,
      },
      name: `${member.name} – ${member.role} at Quick Pic Convert`,
      url: `https://quickpicconvert.com/team/${member.slug}`,
      inLanguage: "en",
    };
    const BREADCRUMB_SCHEMA_OBJECT = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://quickpicconvert.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: "https://quickpicconvert.com/about",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Team",
          item: "https://quickpicconvert.com/about#team",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Hasnain Alam",
          item: `https://quickpicconvert.com/team/${member.slug}`,
        },
      ],
    };

    return {
      props: {
        member,
        meta,
        schema: [
          PERSON_SCHEMA_OBJECT,
          PROFILE_PAGE_SCHEMA_OBJECT,
          BREADCRUMB_SCHEMA_OBJECT,
        ],
      },
    };
  } catch (_error) {
    return { props: { member: null, meta: null, schema: null } };
  }
};
