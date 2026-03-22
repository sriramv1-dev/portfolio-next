import type { Metadata } from 'next';
import './projects.scss';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Projects by Sriram Voonna — coming soon.',
  openGraph: {
    title: 'Projects | Sriram Voonna',
    url: 'https://sriram-voonna-portfolio.vercel.app/projects',
    type: 'website',
  },
};

export default function ProjectsPage() {
  return (
    <div className="container projects-page">
      <div className="text-zone">
        <h1>Projects</h1>
        <p>Coming soon — check back later.</p>
      </div>
    </div>
  );
}
