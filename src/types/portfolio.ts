export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  isPrivate?: boolean;
  featured: boolean;
  highlights: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
  description: string;
  skills: string[];
}

export interface TechItem {
  name: string;
  icon?: string;
  badgeUrl: string;
}

export interface TechCategory {
  category: string;
  items: TechItem[];
}

export interface PersonalInfo {
  name: string;
  shortName: string;
  role: string;
  specialization: string;
  location: string;
  flag: string;
  availability: string;
  about: string;
  email: string;
  phone: string;
  phoneFormatted: string;
  whatsappUrl: string;
  github: string;
  githubUsername: string;
  linkedin: string;
  cvUrl: string;
}

