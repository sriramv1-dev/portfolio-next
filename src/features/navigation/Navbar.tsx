'use client';

import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { useResponsive } from '@/hooks/useResponsive';
import { useTheme } from '@/context/ThemeContext';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import NavLinks from './NavLinks';
import MobileMenu from './MobileMenu';
import '@/components/Navbar.scss';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const { theme } = useTheme();

  void isMobile; void isTablet; void isDesktop; void theme;

  return (
    <div className="nav-bar">
      <div className="links-div-logo">
        <h1>SV</h1>
      </div>
      <NavLinks />
      <div className="theme-switcher-nav"><ThemeSwitcher /></div>
      <button
        className={`flat-button ${isMenuOpen ? 'close-icon' : 'hamburger-icon'}`}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        {isMenuOpen ? <AiOutlineClose /> : <FaBars />}
      </button>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
}
