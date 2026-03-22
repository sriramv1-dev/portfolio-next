'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IoHomeOutline,
  IoBusinessOutline,
  IoExtensionPuzzleOutline,
  IoBarChartOutline,
} from 'react-icons/io5';
import { MdOutlineContactMail } from 'react-icons/md';
import { NavRoute } from '@/types';

const routes: NavRoute[] = [
  { key: 'home',     label: 'Home',      icon: IoHomeOutline,            path: '/' },
  { key: 'about',    label: 'Companies', icon: IoBusinessOutline,        path: '/companies' },
  { key: 'skills',   label: 'Skills',    icon: IoBarChartOutline,        path: '/skills' },
  { key: 'contact',  label: 'Contact',   icon: MdOutlineContactMail,     path: '/contact' },
  { key: 'projects', label: 'Projects',  icon: IoExtensionPuzzleOutline, path: '/projects' },
];

const comingSoon = ['projects'];

interface Props {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export default function NavLinks({ isMobile = false, onLinkClick }: Props) {
  const pathname = usePathname();
  const linksDiv    = (isMobile ? 'mobile-' : '') + 'links-div';
  const linkContent = (isMobile ? 'mobile-' : '') + 'link-content';

  return (
    <>
      {routes.map(({ key, label, icon: Icon, path }) => {
        const isActive   = pathname === path;
        const isDisabled = comingSoon.includes(key);

        return (
          <div key={`${key}-div`} className={linksDiv}>
            <Link
              key={key}
              href={path}
              className={`${isActive ? 'active' : ''} ${isDisabled ? 'nav-disabled' : ''}`}
              {...(isMobile && onLinkClick ? { onClick: onLinkClick } : {})}
              style={isDisabled ? { opacity: 0.35, pointerEvents: 'none' } : {}}
            >
              <div key={`${key}-content`} className={linkContent}>
                <Icon />
                <label key={`${key}-label`}>{label}</label>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
}
