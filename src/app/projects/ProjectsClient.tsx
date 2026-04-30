'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoArrowBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import Image from 'next/image';
import { ProjectCard } from '@/features/projects';
import { ProjectsData } from '@/data/projects';

interface ProjectsClientProps {
  projects: ProjectsData;
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [expandedSection, setExpandedSection] = useState<'web' | 'video' | null>(null);

  const sections = useMemo(() => [
    { id: 'web', title: 'Web Applications', projects: projects.web, isVideo: false },
    { id: 'video', title: 'Video Content', projects: projects.video, isVideo: true },
  ], [projects]);

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
        {expandedSection && (
          <motion.button 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="back-button"
            onClick={() => setExpandedSection(null)}
          >
            <IoArrowBackOutline /> Back to Overview
          </motion.button>
        )}
      </div>

      <div className="projects-container">
        <AnimatePresence mode="wait">
          {!expandedSection ? (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="overview-stacks"
              style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap'}}
            >
              {sections.map((section) => (
                <div key={section.id} className="category-stack-wrapper">
                  <div className="stack-container" onClick={() => setExpandedSection(section.id as 'web' | 'video')}>
                    {section.projects.slice(0, 3).map((project, idx) => (
                      <div key={project.url + idx} className="stacked-card">
                        <Image 
                          src={project.image} 
                          alt={project.title} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                    ))}
                    <div className="stack-overlay">
                      <div className="overlay-content">
                        <h2>{section.title}</h2>
                        <div className="view-all-hint">
                          <span>View All ({section.projects.length})</span>
                          <IoChevronForwardOutline />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="gallery"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="expanded-gallery"
            >
              <div className="projects-grid">
                {sections.find(s => s.id === expandedSection)?.projects.map((project) => (
                  <div key={project.url} className="project-card-wrapper">
                    <ProjectCard 
                      {...project} 
                      isVideo={expandedSection === 'video'} 
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
