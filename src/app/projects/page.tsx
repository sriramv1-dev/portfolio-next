import type { Metadata } from 'next';
import ProjectsClient from './ProjectsClient';
import './projects.scss';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A showcase of my recent projects, featuring full-stack development, interactive UI designs, and web applications.',
  openGraph: {
    title: 'Projects | Sriram Voonna',
    url: 'https://sriram-voonna-portfolio.vercel.app/projects',
    type: 'website',
  },
};

const projectsData = [
  {
    title: 'Nostalgia Cricket Card',
    description: 'A nostalgic digital collectible card game inspired by Big Babol Pocket Cricket. Features dynamic card building, player collection, and a retro 90s aesthetic.',
    image: '/projects/nostalgia.png',
    url: 'https://nostalgia-cricket-card.vercel.app/',
    tags: ['Next.js', 'Framer Motion', 'Sass', 'Digital Collectibles'],
    isVideo: false,
  },
  {
    title: 'Vegetable Village',
    description: 'A creative exploration into the world of miniature vegetable villages. A visual journey showcasing unique designs and community concepts.',
    image: 'https://i.ytimg.com/vi/Ci0_9vzuHjs/maxresdefault.jpg',
    url: 'https://youtube.com/shorts/Ci0_9vzuHjs?si=GJ52A6lCRU0MT-xP',
    tags: ['YouTube Shorts', 'Visual Design', 'Miniature Worlds'],
    isVideo: true,
  },
  {
    title: 'The Story of Seven Fish',
    description: 'A Pixar-style animated retelling of the classic Telugu folk tale "Edu Chepala Katha". Highlighting vibrant colors and storytelling.',
    image: 'https://i.ytimg.com/vi/tIdYzOwS7lg/maxresdefault.jpg',
    url: 'https://youtube.com/shorts/tIdYzOwS7lg',
    tags: ['Animation', 'Storytelling', 'Telugu Folk Tale'],
    isVideo: true,
  },
  {
    title: 'Story Near a Hut',
    description: 'A visual journey through intricately designed miniature worlds, focusing on detail and creative community concepts.',
    image: 'https://i.ytimg.com/vi/M_UYYLWYiOI/maxresdefault.jpg',
    url: 'https://youtube.com/shorts/M_UYYLWYiOI',
    tags: ['Miniature Art', 'Visual Design', 'Creative Concepts'],
    isVideo: true,
  },
  {
    title: 'Enchanted Forest',
    description: 'Exploring mystical and enchanted landscapes through high-fidelity visual renders and artistic community designs.',
    image: 'https://i.ytimg.com/vi/WmYzJuL5oEo/maxresdefault.jpg',
    url: 'https://youtube.com/shorts/WmYzJuL5oEo',
    tags: ['Visual Art', 'Landscape Design', 'Creative Exploration'],
    isVideo: true,
  },
  {
    title: 'Its for our good',
    description: 'A look at futuristic urban designs where nature and architecture blend seamlessly in a miniature scale.',
    image: 'https://i.ytimg.com/vi/u8wMwz1ig-Y/maxresdefault.jpg',
    url: 'https://youtube.com/shorts/u8wMwz1ig-Y',
    tags: ['Urban Design', 'Miniature Worlds', 'Visual Concepts'],
    isVideo: true,
  },
  {
    title: 'Tiny Creatures Big Stories',
    description: 'A whimsical showcase of fantasy-themed miniature villages, highlighting creative architecture and characterful designs.',
    image: 'https://i.ytimg.com/vi/R3bXe1gnBYE/maxresdefault.jpg',
    url: 'https://youtube.com/shorts/R3bXe1gnBYE',
    tags: ['Fantasy Design', 'Miniature Art', 'Creative Storytelling'],
    isVideo: true,
  },
  {
    title: 'Miniature Worlds',
    description: 'Visualizing a highly advanced, sustainable community in a miniature format, focusing on innovation and design.',
    image: 'https://i.ytimg.com/vi/JLkJ9QNz1G4/maxresdefault.jpg',
    url: 'https://youtube.com/shorts/JLkJ9QNz1G4',
    tags: ['Innovation', 'Sustainability', 'Miniature Concepts'],
    isVideo: true,
  },
  {
    title: 'Time Traveller',
    description: 'An otherworldly exploration of village designs inspired by cosmic themes and interstellar aesthetics.',
    image: 'https://i.ytimg.com/vi/kjeOnYc_gho/maxresdefault.jpg',
    url: 'https://youtube.com/shorts/kjeOnYc_gho',
    tags: ['Cosmic Art', 'Visual Design', 'Creative Journey'],
    isVideo: true,
  },


];

export default function ProjectsPage() {
  return <ProjectsClient projects={projectsData} />;
}
