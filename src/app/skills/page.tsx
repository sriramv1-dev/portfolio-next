'use client';

import dynamic from 'next/dynamic';

const SkillsBig = dynamic(() => import('./SkillsBig'), {
  ssr: false,
  loading: () => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '400px',
      color: 'hsl(var(--txt))'
    }}>
      Loading skills...
    </div>
  ),
});

const SkillsSmall = dynamic(() => import('./SkillsSmall'), {
  ssr: false,
  loading: () => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '400px',
      color: 'hsl(var(--txt))'
    }}>
      Loading skills...
    </div>
  ),
});

export default function SkillsPage() {
  return (
    <>
      {/* Desktop (≥1280px): D3 tree chart */}
      <div className="skills-desktop">
        <SkillsBig />
      </div>

      {/* Mobile/tablet (<1280px): collapsible tree */}
      <div className="skills-mobile">
        <SkillsSmall />
      </div>

      <style>{`
        .skills-desktop { display: none; }
        .skills-mobile  { display: block; }
        @media (min-width: 1280px) {
          .skills-desktop { display: block; }
          .skills-mobile  { display: none; }
        }
      `}</style>
    </>
  );
}
