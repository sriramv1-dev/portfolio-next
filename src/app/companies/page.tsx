'use client';

import { useResponsive } from '@/hooks/useResponsive';
import CompaniesTimeline from './CompaniesTimeline';
import CompaniesTimelineMobile from './CompaniesTimelineMobile';

export default function CompaniesPage() {
  const { isMobile, isTablet } = useResponsive();

  return (
    <div className="container">
      {isMobile ? <CompaniesTimelineMobile /> : <CompaniesTimeline isTablet={isTablet} />}
    </div>
  );
}
