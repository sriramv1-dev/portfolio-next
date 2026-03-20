'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

export default function Hero() {
  return (
    <motion.div
      className="box1"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3 variants={itemVariants}>
        Hi.. <br /> I am
      </motion.h3>

      <motion.h1 variants={itemVariants}>
        Sriram Voonna
      </motion.h1>

      <motion.h2 variants={itemVariants}>
        Full Stack Developer / Javascript
      </motion.h2>

      <motion.div variants={itemVariants}>
        <Link href="/contact" className="flat-button">
          Contact Me
        </Link>
      </motion.div>
    </motion.div>
  );
}
