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
    fiverr?: string
  };
}

export const teamMembers: TeamMember[] = [
  {
    slug: 'hasnain-alam',
    name: 'Hasnain Alam',
    role: 'Lead MERN & Mobile Developer',
    image: '/team/hasnain-alam.webp',
    avatar: 'HA',

    shortBio:
      '<p><a target="_blank" href="https://hasnainalam.com/about">MERN Stack and React Native developer</a> building scalable web and mobile applications with a focus on performance and clean architecture.</p>',

    fullBio: `
    <p>
Hasnain Alam is the <a target="_blank" href="https://hasnainalam.com">Lead MERN & Mobile Developer</a> at Quick Pic Convert, responsible for designing and implementing scalable web and mobile solutions across the platform. With 4 years of professional experience, Hasnain specializes in building high-performance applications using the MERN stack and React Native.

At Quick Pic Convert, Hasnain leads the development of browser-based image tools, ensuring fast performance, clean architecture, and a seamless user experience across devices. His expertise in React, Next.js, Node.js, and MongoDB plays a key role in delivering secure and efficient image processing solutions.

Before joining Quick Pic Convert, Hasnain worked as a MERN Stack Developer on Fiverr, where he collaborated with global clients to build full-stack web applications, REST APIs, real-time systems, and mobile apps using React Native.

Hasnain is passionate about modern JavaScript ecosystems, scalable backend systems, and cross-platform app development. He continuously explores new technologies to improve performance, maintainability, and user experience.
  </p>`,

    yearsOfExperience: 4,

    coreExpertise: [
      'MERN Stack Development',
      'React & Next.js Applications',
      'React Native Mobile Apps',
      'Backend API Development',
      'Real-time Applications',
      'Performance Optimization'
    ],

    skills: [
      'JavaScript',
      'React.js',
      'Next.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'React Native',
      'Socket.io',
      'NestJS',
      'Vite'
    ],

    social: {
      github: 'https://github.com/devhasnain',
      linkedin: 'https://www.linkedin.com/in/devhasnain/',
      fiverr: 'https://www.fiverr.com/users/hasnainalam462',
      portfolio: 'https://hasnainalam.com'
    },

  }

];

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find((member) => member.slug === slug);
}
