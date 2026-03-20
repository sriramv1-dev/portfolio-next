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
  { key: 'home', label: 'Home', icon: IoHomeOutline, path: '/' },
  { key: 'about', label: 'About', icon: IoBusinessOutline, path: '/about' },
  { key: 'projects', label: 'Projects', icon: IoExtensionPuzzleOutline, path: '/projects' },
  { key: 'skills', label: 'Skills', icon: IoBarChartOutline, path: '/skills' },
  { key: 'contact', label: 'Contact', icon: MdOutlineContactMail, path: '/contact' },
];

interface Props {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export default function NavLinks({ isMobile = false, onLinkClick }: Props) {
  const pathname = usePathname();
  const linksDiv = (isMobile ? 'mobile-' : '') + 'links-div';
  const linkContent = (isMobile ? 'mobile-' : '') + 'link-content';

  return (
    <>
      {routes.map(({ key, label, icon: Icon, path }) => {
        const isActive = pathname === path;
        return (
          <div key={`${key}-div`} className={linksDiv}>
            <Link
              key={key}
              href={path}
              className={isActive ? 'active' : ''}
              {...(isMobile && onLinkClick ? { onClick: onLinkClick } : {})}
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
