'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { IoArrowForwardOutline } from 'react-icons/io5';
import { ProjectCard } from '@/features/projects';

interface Project {
  title: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
  isVideo: boolean;
}

interface ProjectsClientProps {
  projects: Project[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const webProjects = useMemo(() => projects.filter((p) => !p.isVideo), [projects]);
  const videoProjects = useMemo(() => projects.filter((p) => p.isVideo), [projects]);

  const sections = [
    { title: 'Web Applications', projects: webProjects },
    { title: 'Video Content', projects: videoProjects },
  ];

  return (
    <div className="container projects-page">
      <div className="text-zone">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore my latest work, ranging from interactive web applications to 
          creative visual storytelling. Swipe or scroll horizontally to browse.
        </motion.p>
      </div>

      {sections.map((section, idx) => (
        section.projects.length > 0 && (
          <motion.section 
            key={section.title} 
            className="project-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
          >
            <div className="section-header">
              <h2>{section.title}</h2>
              {section.projects.length > 1 && (
                <div className="scroll-hints">
                  <span>Scroll <IoArrowForwardOutline /></span>
                </div>
              )}
            </div>
            <div className="projects-grid">
              {section.projects.map((project) => (
                <div key={project.url} className="project-card-wrapper">
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </motion.section>
        )
      ))}
    </div>
  );
}
