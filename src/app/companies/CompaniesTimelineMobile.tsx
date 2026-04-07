'use client';

import Image from 'next/image';
import { experienceData } from '@/data/portfolio';
import styles from './companies-timeline-mobile.module.css';

const accentColors = [
  { dot: '#1D9E75', bg: '#E1F5EE' },
  { dot: '#185FA5', bg: '#E6F1FB' },
  { dot: '#854F0B', bg: '#FAEEDA' },
  { dot: '#993556', bg: '#FBEAF0' },
  { dot: '#534AB7', bg: '#EEEDFE' },
  { dot: '#5F5E5A', bg: '#F1EFE8' },
];

export default function CompaniesTimelineMobile() {
  return (
    <div className={styles.timeline}>
      {experienceData.map((job, index) => {
        const isCurrent = !job.to;
        const dateRange = isCurrent ? `${job.from} — Present` : `${job.from} — ${job.to}`;
        const accent = accentColors[index % accentColors.length];

        return (
          <div key={job.id} className={styles.row}>
            <div className={styles.companySide}>
              <div className={styles.logoWrapper}>
                <Image
                  src={job.logo}
                  alt={job.company}
                  width={36}
                  height={36}
                  className={styles.logo}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <p className={styles.company}>
                {job.company}
                {isCurrent && <span className={styles.badge}>Current</span>}
              </p>
              <p className={styles.role}>{job.role}</p>
              <p className={styles.dates}>{dateRange}</p>
            </div>

            <div className={styles.center}>
              <div className={styles.dot} style={{ borderColor: accent.dot, background: `color-mix(in srgb, ${accent.dot} 15%, transparent)` }} />
              <div className={styles.line} />
            </div>

            <div className={styles.respSide}>
              <div className={styles.respCard} style={{ borderLeftColor: accent.dot }}>
                <p className={styles.respLabel}>Responsibilities</p>
                <ul className={styles.bullets}>
                  {job.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
