'use client';

import { useResponsive } from '@/hooks/useResponsive';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const { isDesktop } = useResponsive();

  return (
    <div
      className="container home-page"
      style={!isDesktop ? {
        overflow: 'hidden',
        height: 'auto',
        minHeight: '100vh',
        padding: '0',
      } : {}}
    >
      {children}
    </div>
  );
}
