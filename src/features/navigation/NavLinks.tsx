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

const comingSoon: string[] = [];

interface Props {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export default function NavLinks({ isMobile = false, onLinkClick }: Props) {
  const pathname = usePathname();

  return (
    <div className="links-div">
      {routes.map(({ key, label, icon: Icon, path }) => {
        const isActive   = pathname === path;
        const isDisabled = comingSoon.includes(key);

        return (
          <Link
            key={key}
            href={path}
            className={`${isActive ? 'active' : ''}`}
            {...(isMobile && onLinkClick ? { onClick: onLinkClick } : {})}
            style={isDisabled ? { opacity: 0.35, pointerEvents: 'none' } : {}}
          >
            <div className="link-content">
              <Icon />
              <label>{label}</label>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
