import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Sriram Voonna — Full Stack Developer with experience in React, Node.js, and cloud technologies.',
  openGraph: {
    title: 'About | Sriram Voonna',
    url: 'https://sriram-voonna-portfolio.vercel.app/companies',
    type: 'website',
  },
};

export default function CompaniesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
