import type { Metadata } from 'next';
import CompaniesTimeline from './CompaniesTimeline';
import './about.css';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Sriram Voonna — Full Stack Developer with experience in React, Node.js, and cloud technologies.',
  openGraph: {
    title: 'About | Sriram Voonna',
    url: 'https://sriram-voonna-portfolio.vercel.app/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="container about-page">
      <CompaniesTimeline />
    </div>
  );
}
