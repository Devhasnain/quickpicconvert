import { Github, Linkedin, Twitter, Globe, ArrowLeft, Briefcase, Calendar, Code2, Facebook, } from "lucide-react";
import { TeamMember, teamMembers } from "@/data/teamMembers";
import { Breadcrumb, Button, Container } from "@/components";
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
            <Link href="/about">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to About
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Container element="section" className="py-10">
        <div className="container-custom">
          <Breadcrumb
            items={[
              {
                name: "Home",
                href: "/",
              },
              {
                name: "Hasnain alam",
                href: "/team/hasnain-alam",
              },
            ]}
          />

          <div className={"flex flex-col md:flex-row items-center gap-8"}>
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
              <div
                className="max-w-2xl renderhtml"
                dangerouslySetInnerHTML={{ __html: member.shortBio }}
              />

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
                    title={`${member.name} Portfolio`}
                  >
                    <Twitter className="w-5 h-5" />
                  </Link>
                )}
                {member.social.portfolio && (
                  <Link
                    href={member.social.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-3 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    aria-label={`${member.name} Personal Portfolio`}
                    title={`${member.name} Mern Stack Developer Portfolio Website`}
                  >
                    <Globe className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* About Section */}
      <Container element="section" className="py-12">
        <div className="container-custom">
          <div className={" space-y-12"}>
            {/* Main Bio */}
            <div className=" w-full md:w-8/12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-primary" />
                About {member.name.split(" ")[0]}
              </h2>
               <div
                className="max-w-2xl renderhtml"
                dangerouslySetInnerHTML={{ __html: member.fullBio }}
              />
            </div>

            {/* Sidebar Stats */}
            <div className="w-full md:w-6/12 space-y-6">
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="text-lg font-medium flex items-center gap-2 pb-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  Experience
                </h3>
                <div className="text-3xl font-bold gradient-text">
                  {member.yearsOfExperience}+ years
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  in the industry
                </p>
              </div>

              <div className="border border-gray-200 p-5 rounded-lg">
                <h3 className="text-lg font-medium pb-3">Core Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {member.coreExpertise.map((skill) => (
                    <div
                      key={skill}
                      className="px-5 py-3 rounded-full font-medium bg-white border border-gray-200 hover:border-primary/50 transition-colors"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Skills Section */}
      <Container element="section" className=" py-12">
        <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
          <Code2 className="w-6 h-6 text-primary" />
          Skills
        </h2>

        <div className="flex flex-wrap gap-3">
          {member.skills.map((tool) => (
            <div
              key={tool}
              className="px-5 py-3 rounded-full font-medium bg-white border border-gray-200 hover:border-primary/50 transition-colors"
            >
              {tool}
            </div>
          ))}
        </div>
      </Container>
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
