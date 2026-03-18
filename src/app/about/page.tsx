import { companiesData } from '@/lib/data';
import CompaniesBig from './CompaniesBig';
import CompaniesSmall from './CompaniesSmall';

export default function AboutPage() {
  return (
    <>
      {/* Desktop (≥1280px): radio-carousel layout */}
      <div className="about-desktop">
        <CompaniesBig companies={companiesData} />
      </div>

      {/* Mobile/tablet (<1280px): timeline layout */}
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
