import type { Metadata } from "next";
import { Playwrite_DK_Uloopet, Noto_Sans } from "next/font/google";
import { Navbar } from "@/features/navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { ThemeProvider } from "@/context/ThemeContext";
import "../styles/globals.css";

const playwrite = Playwrite_DK_Uloopet({
  variable: "--font-playwrite",
  weight: ["100", "200", "300", "400"],
});

const notoSans = Noto_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sriram-voonna-portfolio.vercel.app'),
  title: {
    default: 'Sriram Voonna | Full Stack Developer',
    template: '%s | Sriram Voonna',
  },
  description: 'Full Stack Developer specializing in React, JavaScript and TypeScript.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playwrite.variable} ${notoSans.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Sriram Voonna',
              jobTitle: 'Full Stack Developer',
              url: 'https://sriram-voonna-portfolio.vercel.app',
              sameAs: [
                'https://www.linkedin.com/in/sriramvoonna/',
                'https://github.com/sriramv1-dev',
              ],
              knowsAbout: [
                'React',
                'TypeScript',
                'JavaScript',
                'Node.js',
                'Azure',
                'AWS',
              ],
            }),
          }}
        />
        <ThemeProvider>
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
