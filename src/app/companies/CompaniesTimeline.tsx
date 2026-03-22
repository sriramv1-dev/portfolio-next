'use client';

import Image from 'next/image';
import { experienceData } from '@/data/portfolio';
import styles from './companies-timeline.module.css';

export default function CompaniesTimeline() {
  return (
    <div className={styles.timeline}>
      {experienceData.map((job, index) => {
        const isLeft = index % 2 === 0;
        const isCurrent = !job.to;
        const dateRange = isCurrent ? `${job.from} — Present` : `${job.from} — ${job.to}`;

        const card = (
          <div className={`${styles.card} ${isCurrent ? styles.current : ''}`}>
            <div className={styles.cardHeader}>
              <div className={styles.logoWrapper}>
                <Image
                  src={job.logo}
                  alt={job.company}
                  width={40}
                  height={40}
                  className={styles.logo}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <div className={styles.meta}>
                <p className={styles.company}>
                  {job.company}
                  {isCurrent && <span className={styles.badge}>Current</span>}
                </p>
                <p className={styles.role}>{job.role}</p>
              </div>
            </div>
            <p className={styles.dates}>{dateRange}</p>
            <ul className={styles.bullets}>
              {job.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        );

        return (
          <div key={job.id} className={`${styles.item} ${isLeft ? styles.itemLeft : styles.itemRight}`}>
            <div className={styles.side}>{isLeft ? card : <div className={styles.empty} />}</div>
            <div className={styles.center}>
              <div className={`${styles.dot} ${isCurrent ? styles.dotCurrent : ''}`} />
              <div className={styles.line} />
            </div>
            <div className={styles.side}>{!isLeft ? card : <div className={styles.empty} />}</div>
          </div>
        );
      })}
    </div>
  );
}
