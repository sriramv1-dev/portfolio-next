import type { Metadata } from 'next';
import ProjectsClient from './ProjectsClient';
import { projectsData } from '@/data/projects';
import './projects.scss';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A showcase of my recent projects, featuring full-stack development, interactive UI designs, and web applications.',
  openGraph: {
    title: 'Projects | Sriram Voonna',
    url: 'https://sriram-voonna-portfolio.vercel.app/projects',
    type: 'website',
  },
};

export default function ProjectsPage() {
  return <ProjectsClient projects={projectsData} />;
}
