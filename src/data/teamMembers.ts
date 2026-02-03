export interface TeamMemberProject {
  name: string;
  description: string;
  link?: string;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  image: string;
  avatar: string;
  shortBio: string;
  fullBio: string;
  yearsOfExperience: number;
  coreExpertise: string[];
  skills: string[];
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
    fiverr?:string
  };
  metaTitle: string;
  metaDescription: string;
}

export const teamMembers: TeamMember[] = [
  {
    slug: 'tanveer-ahmed',
    name: 'Tanveer Ahmed',
    role: 'Founder & CEO',
    avatar: 'TA',
    image: "/team/tanveer-ahmed.webp",
    shortBio: 'Visionary leader with 15+ years in tech, passionate about making powerful tools accessible to everyone.',
    fullBio: `Alex Thompson is the founder and CEO of QuickPicConvert, bringing over 15 years of experience in software development and entrepreneurship. With a background in computer science from Stanford University, Alex has worked at leading tech companies including Google and Adobe before founding QuickPicConvert.

Alex's vision was born from a simple frustration: why should image conversion be complicated? This led to the creation of QuickPicConvert, a tool that processes images locally in the browser, ensuring speed and privacy. Under Alex's leadership, the platform has grown to serve over 500,000 users across 50+ countries.

When not building products, Alex enjoys mentoring young entrepreneurs and speaking at tech conferences about the future of web-based tools.`,
    yearsOfExperience: 15,
    coreExpertise: ['Product Strategy', 'Business Development', 'Team Leadership', 'Technical Architecture'],
    skills: ['Figma', 'Jira', 'AWS', 'Google Analytics', 'Notion', 'Slack'],
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      portfolio: 'https://alexthompson.dev',
    },
    metaTitle: 'Alex Thompson - Founder & CEO | QuickPicConvert Team',
    metaDescription: 'Meet Alex Thompson, the visionary founder and CEO of QuickPicConvert. 15+ years of tech experience driving innovation in browser-based image processing.',
  },
  {
    slug: 'hasnain-alam',
    name: 'Hasnain alam',
    role: 'Lead Developer',
    image: "/team/hasnain-alam.webp",
    avatar: 'HA',
    shortBio: 'Full-stack engineer with expertise in WebAssembly and browser APIs, building blazing-fast image tools.',
    fullBio: `Hasnain alam is the Lead Developer at Quick Pic Convert, responsible for the technical implementation of all core features. With 4 years of professional experience, Hasnain specializes in performance optimization and browser-based technologies.

Before joining Quick Pic Convert, Hasnain has worked at Fiverr as a Mern Stack Developer and gained deep expertise in Mern Stack Development. This knowledge has been instrumental in making Quick Pic Convert's image processing incredibly fast.

Hasnain is passionate about open-source development and regularly contributes to image processing libraries. He's also an active speaker at JavaScript conferences, sharing insights about pushing browsers to their limits.`,
    yearsOfExperience: 4,
    coreExpertise: ['Full-Stack Development', 'Frontend Development', 'Backend Development', 'App Development', 'Performance Optimization', 'Browser APIs'],
    skills: ["Javascript", "React Js", "Next Js", "Node js", "Express Js", "MongoDB", "Socket.io", "React Vite", "Nest Js"],
    social: {
      github: 'https://github.com/devhasnain',
      linkedin: 'https://www.linkedin.com/in/devhasnain/',
      fiverr:"https://www.fiverr.com/users/hasnainalam462"
    },
    metaTitle: 'Sarah Chen - Lead Developer | QuickPicConvert Team',
    metaDescription: 'Meet Sarah Chen, Lead Developer at QuickPicConvert. Expert in WebAssembly and browser APIs, building blazing-fast image processing tools.',
  },
];

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find((member) => member.slug === slug);
}
