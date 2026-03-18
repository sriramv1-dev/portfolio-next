import SkillsBig from './SkillsBig';
import SkillsSmall from './SkillsSmall';

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
