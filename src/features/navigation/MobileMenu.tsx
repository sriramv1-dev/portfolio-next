'use client';

import ThemeSwitcher from '@/components/ThemeSwitcher';
import NavLinks from './NavLinks';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="mobile-view">
      <NavLinks isMobile onLinkClick={onClose} />
      <hr />
      <div className="theme-switcher-mobile"><ThemeSwitcher /></div>
    </div>
  );
}
