import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto, Reem_Kufi_Ink } from "next/font/google";
import { Navbar } from "@/features/navigation";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

const reemKufiInk = Reem_Kufi_Ink({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-reem-kufi-ink",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-next-pi-one.vercel.app'),
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
    <html lang="en" suppressHydrationWarning className={`${roboto.variable} ${reemKufiInk.variable}`}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Sriram Voonna',
              jobTitle: 'Full Stack Developer',
              url: 'https://portfolio-next-pi-one.vercel.app',
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
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
