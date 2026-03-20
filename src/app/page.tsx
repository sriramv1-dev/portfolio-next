import type { Metadata } from 'next';
import MyLogo from '@/components/MyLogo';
import Hero from '@/features/home/Hero';
import './home.scss';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Full Stack Developer specializing in React, JavaScript and TypeScript. Based in New Jersey.',
  keywords: ['Sriram Voonna', 'Full Stack Developer', 'React developer', 'JavaScript', 'TypeScript'],
  openGraph: {
    title: 'Sriram Voonna | Full Stack Developer',
    description: 'Full Stack Developer specializing in React, JavaScript and TypeScript.',
    url: 'https://portfolio-next-pi-one.vercel.app',
    siteName: 'Sriram Voonna Portfolio',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="container home-page">
      <Hero />
      <div className="box2">
        <MyLogo />
      </div>
    </div>
  );
}
