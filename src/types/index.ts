import { ComponentType } from 'react';

export interface NavRoute {
  key: string;
  label: string;
  path: string;
  icon: ComponentType;
}

export interface SocialLink {
  key: string;
  title: string;
  href: string;
  icon: ComponentType;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string[];
}

export interface Skill {
  name: string;
  category: string;
  children?: Skill[];
}
