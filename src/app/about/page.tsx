import type { Metadata } from 'next';
import { companiesData } from '@/lib/data';
import CompaniesBig from './CompaniesBig';
import CompaniesSmall from './CompaniesSmall';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Sriram Voonna — Full Stack Developer with experience in React, Node.js, and cloud technologies.',
  openGraph: {
    title: 'About | Sriram Voonna',
    url: 'https://portfolio-next-pi-one.vercel.app/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <>
      <div className="about-desktop">
        <CompaniesBig companies={companiesData} />
      </div>
      <div className="about-mobile">
        <CompaniesSmall companies={companiesData} />
      </div>
      <style>{`
        .about-desktop { display: none; }
        .about-mobile  { display: block; }
        @media (min-width: 1280px) {
          .about-desktop { display: block; }
          .about-mobile  { display: none; }
        }
      `}</style>
    </>
  );
}
