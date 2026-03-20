'use client';

import { FaLinkedin } from 'react-icons/fa';
import { AiFillGithub } from 'react-icons/ai';
import { SocialLink } from '@/types';

const socialLinks: SocialLink[] = [
  {
    key: 'linkedin',
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sriramvoonna/',
    icon: FaLinkedin,
  },
  {
    key: 'github',
    title: 'Github',
    href: 'https://github.com/sriramv1-dev',
    icon: AiFillGithub,
  },
];

interface Props {
  isMobile?: boolean;
}

export default function SocialLinks({ isMobile = false }: Props) {
  const linksDiv = (isMobile ? 'mobile-' : '') + 'links-div';
  const linkContent = (isMobile ? 'mobile-' : '') + 'link-content';

  return (
    <>
      {socialLinks.map(({ key, title, href, icon: Icon }) => (
        <div key={`${key}-div`} className={linksDiv}>
          <a key={`${key}-anchor`} target="_blank" rel="noreferrer" href={href}>
            <div key={`${key}-content`} className={linkContent}>
              <Icon />
              <label key={`${key}-label`}>{title}</label>
            </div>
          </a>
        </div>
      ))}
    </>
  );
}
