import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Technical skills of Sriram Voonna — React, TypeScript, Node.js, Azure, AWS, and more.',
  openGraph: {
    title: 'Skills | Sriram Voonna',
    url: 'https://portfolio-next-pi-one.vercel.app/skills',
    type: 'website',
  },
};

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
