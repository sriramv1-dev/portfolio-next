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
  title: "Sriram Voonna",
  description: "Full Stack Developer / JavaScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${roboto.variable} ${reemKufiInk.variable}`}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
