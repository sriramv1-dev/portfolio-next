'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaExternalLinkAlt, FaYoutube } from 'react-icons/fa';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
  isVideo?: boolean;
}

export default function ProjectCard({ 
  title, 
  description, 
  image, 
  url, 
  tags,
  isVideo = false
}: ProjectCardProps) {
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <a href={url} target="_blank" rel="noopener noreferrer" className="project-card-link">
        <div className="project-image">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          <div className="project-overlay">
            <div className="view-project">
              {isVideo ? <FaYoutube /> : <FaExternalLinkAlt />}
            </div>
          </div>
        </div>
        
        <div className="project-info">
          <h3>{title}</h3>
          <p>{description}</p>
          <div className="project-tags">
            {tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    </motion.div>
  );
}
