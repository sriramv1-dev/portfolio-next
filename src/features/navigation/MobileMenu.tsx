'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoHomeOutline, IoBusinessOutline, IoExtensionPuzzleOutline, IoBarChartOutline } from 'react-icons/io5';
import { MdOutlineContactMail } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import ThemeSwitcherMobile from '@/components/ThemeSwitcherMobile';
import styles from './MobileMenu.module.css';

const routes = [
  { key: 'home',     label: 'Home',      icon: IoHomeOutline,            path: '/' },
  { key: 'about',    label: 'Companies', icon: IoBusinessOutline,        path: '/companies' },
  { key: 'skills',   label: 'Skills',    icon: IoBarChartOutline,        path: '/skills' },
  { key: 'contact',  label: 'Contact',   icon: MdOutlineContactMail,     path: '/contact' },
  { key: 'projects', label: 'Projects',  icon: IoExtensionPuzzleOutline, path: '/projects' },
];

const comingSoon = ['projects'];

interface Props { isOpen: boolean; onClose: () => void; }

export default function MobileMenu({ isOpen, onClose }: Props) {
  const pathname = usePathname();
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.panel}>
        <button className={styles.closeBtn} onClick={onClose}>
          <AiOutlineClose />
        </button>
        <nav className={styles.nav}>
          {routes.map(({ key, label, icon: Icon, path }) => {
            const isActive = pathname === path;
            const isDisabled = comingSoon.includes(key);
            return (
              <Link
                key={key}
                href={path}
                onClick={onClose}
                className={`${styles.link} ${isActive ? styles.active : ''} ${isDisabled ? styles.disabled : ''}`}
                style={isDisabled ? { pointerEvents: 'none' } : {}}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <ThemeSwitcherMobile />
      </div>
    </>
  );
}
