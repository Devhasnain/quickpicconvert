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
    slug: 'tanveer-ahmed',
    name: 'Tanveer Ahmed',
    role: 'Founder & CEO',
    avatar: 'TA',
    image: '/team/tanveer-ahmed.webp',

    shortBio:
      'Founder of Quick Pic Convert and senior WordPress & PHP developer with 15+ years of experience building scalable web solutions.',

    fullBio: `
Tanveer Ahmed is the Founder and CEO of Quick Pic Convert, with more than 15 years of professional experience in web development. He specializes in WordPress and PHP development, helping businesses build reliable, scalable, and high-performing websites.

Throughout his career, Tanveer has worked with clients across multiple industries, delivering custom WordPress solutions, backend systems, and content-driven platforms. His deep understanding of PHP and the WordPress ecosystem has enabled him to create tools that balance usability, performance, and long-term maintainability.

Quick Pic Convert was founded with a clear vision: to provide fast, secure, and easy-to-use image tools that respect user privacy. Under Tanveer’s leadership, the platform continues to evolve, serving users worldwide with browser-based image processing solutions.

Beyond product development, Tanveer is passionate about mentoring developers, improving web standards, and building tools that make complex technology accessible to everyone.
  `,

    yearsOfExperience: 15,

    coreExpertise: [
      'WordPress Development',
      'PHP Development',
      'Web Architecture',
      'Product Strategy',
      'Business Leadership',
      'Scalable Web Solutions'
    ],

    skills: [
      'WordPress',
      'PHP',
      'MySQL',
      'HTML',
      'CSS',
      'JavaScript',
      'REST APIs',
      'Website Optimization'
    ],

    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    },

  },
  {
    slug: 'hasnain-alam',
    name: 'Hasnain Alam',
    role: 'Lead MERN & Mobile Developer',
    image: '/team/hasnain-alam.webp',
    avatar: 'HA',

    shortBio:
      'MERN Stack and React Native developer building scalable web and mobile applications with a focus on performance and clean architecture.',

    fullBio: `
Hasnain Alam is the Lead MERN & Mobile Developer at Quick Pic Convert, responsible for designing and implementing scalable web and mobile solutions across the platform. With 4 years of professional experience, Hasnain specializes in building high-performance applications using the MERN stack and React Native.

At Quick Pic Convert, Hasnain leads the development of browser-based image tools, ensuring fast performance, clean architecture, and a seamless user experience across devices. His expertise in React, Next.js, Node.js, and MongoDB plays a key role in delivering secure and efficient image processing solutions.

Before joining Quick Pic Convert, Hasnain worked as a MERN Stack Developer on Fiverr, where he collaborated with global clients to build full-stack web applications, REST APIs, real-time systems, and mobile apps using React Native.

Hasnain is passionate about modern JavaScript ecosystems, scalable backend systems, and cross-platform app development. He continuously explores new technologies to improve performance, maintainability, and user experience.
  `,

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
      fiverr: 'https://www.fiverr.com/users/hasnainalam462'
    },

  }

];

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find((member) => member.slug === slug);
}
