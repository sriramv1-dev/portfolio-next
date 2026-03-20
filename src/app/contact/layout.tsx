import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Sriram Voonna — Full Stack Developer available for opportunities.',
  openGraph: {
    title: 'Contact | Sriram Voonna',
    url: 'https://sriramvoonna.vercel.app/contact',
    type: 'website',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
