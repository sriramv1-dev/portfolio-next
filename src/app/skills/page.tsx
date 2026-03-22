'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useResponsive } from '@/hooks/useResponsive';

const SkillsBig = dynamic(() => import('./SkillsBig'), {
  ssr: false,
  loading: () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px', color: 'hsl(var(--txt))' }}>
      Loading skills...
    </div>
  ),
});

const SkillsSmall = dynamic(() => import('./SkillsSmall'), {
  ssr: false,
  loading: () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px', color: 'hsl(var(--txt))' }}>
      Loading skills...
    </div>
  ),
});

const fadeIn = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function SkillsPage() {
  const { isDesktop } = useResponsive();

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {isDesktop ? <SkillsBig /> : <SkillsSmall />}
    </motion.div>
  );
}
