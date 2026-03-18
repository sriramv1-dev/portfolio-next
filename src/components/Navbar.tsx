'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  IoHomeOutline,
  IoBusinessOutline,
  IoExtensionPuzzleOutline,
  IoBarChartOutline,
} from 'react-icons/io5';
import { MdOutlineContactMail } from 'react-icons/md';
import { FaLinkedin } from 'react-icons/fa';
import { AiFillGithub, AiOutlineClose } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import ThemeSwitcher from './ThemeSwitcher';
import './Navbar.scss';

const routes = [
  { key: 'home', label: 'Home', icon: IoHomeOutline, path: '/' },
  { key: 'about', label: 'About', icon: IoBusinessOutline, path: '/about' },
  { key: 'projects', label: 'Projects', icon: IoExtensionPuzzleOutline, path: '/projects' },
  { key: 'skills', label: 'Skills', icon: IoBarChartOutline, path: '/skills' },
  { key: 'contact', label: 'Contact', icon: MdOutlineContactMail, path: '/contact' },
];

const socialLinks = [
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

function getPrimaryLinks(
  isMobile: boolean,
  pathname: string,
  onLinkClick?: (isMobile: boolean) => void
) {
  const linksDiv = (isMobile ? 'mobile-' : '') + 'links-div';
  const linkContent = (isMobile ? 'mobile-' : '') + 'link-content';

  return routes.map(({ key, label, icon: Icon, path }) => {
    const isActive = pathname === path;

    return (
      <div key={`${key}-div`} className={linksDiv}>
        <Link
          key={key}
          href={path}
          className={isActive ? 'active' : ''}
          {...(isMobile && onLinkClick
            ? { onClick: () => onLinkClick(isMobile) }
            : {})}
        >
          <div key={`${key}-content`} className={linkContent}>
            <Icon />
            <label key={`${key}-label`}>{label}</label>
          </div>
        </Link>
      </div>
    );
  });
}

function getSecondaryLinks(isMobile: boolean) {
  const linksDiv = (isMobile ? 'mobile-' : '') + 'links-div';
  const linkContent = (isMobile ? 'mobile-' : '') + 'link-content';

  return socialLinks.map(({ key, title, href, icon: Icon }) => (
    <div key={`${key}-div`} className={linksDiv}>
      <a key={`${key}-anchor`} target="_blank" rel="noreferrer" href={href}>
        <div key={`${key}-content`} className={linkContent}>
          <Icon />
          <label key={`${key}-label`}>{title}</label>
        </div>
      </a>
    </div>
  ));
}

export default function Navbar() {
  const [showNav, setShowNav] = useState(true);
  const pathname = usePathname();

  const primaryLinkClick = (isMobile: boolean) => {
    if (isMobile) setShowNav(false);
  };

  return (
    <div className="nav-bar">
      <div className="links-div-logo">
        <h1>SV</h1>
      </div>
      {getPrimaryLinks(false, pathname)}
      {getSecondaryLinks(false)}
      <div className="theme-switcher-nav"><ThemeSwitcher /></div>
      <button
        className={`flat-button ${showNav ? 'hamburger-icon' : 'close-icon'}`}
        onClick={() => setShowNav((prev) => !prev)}
      >
        {showNav ? <FaBars /> : <AiOutlineClose />}
      </button>
      {!showNav && (
        <div className="mobile-view">
          {getPrimaryLinks(true, pathname, primaryLinkClick)}
          {getSecondaryLinks(true)}
          <hr />
          <div className="theme-switcher-mobile"><ThemeSwitcher /></div>
        </div>
      )}
    </div>
  );
}
