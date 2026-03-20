import type { Metadata } from 'next';
import './projects.scss';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore projects built by Sriram Voonna — React applications, full stack apps, and more.',
  openGraph: {
    title: 'Projects | Sriram Voonna',
    url: 'https://sriramvoonna.vercel.app/projects',
    type: 'website',
  },
};

export default function ProjectsPage() {
  return (
    <div className="container projects-page">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          height: '100vh',
        }}
      >
        <div className="text-zone">
          <h1>My Projects...</h1>
        </div>
      </div>
    </div>
  );
}
