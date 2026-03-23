'use client';

import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useResponsive } from '@/hooks/useResponsive';
import NavLinks from './NavLinks';
import MobileMenu from './MobileMenu';
import ThemeSwitcherWeb from '@/components/ThemeSwitcherWeb';
import ThemeSwitcherTablet from '@/components/ThemeSwitcherTablet';
import '@/components/Navbar.scss';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDesktop, isTablet } = useResponsive();

  return (
    <div className="nav-bar">
      <div className="links-div-logo"><h1>SV</h1></div>

      {isDesktop && (
        <>
          <NavLinks />
          <ThemeSwitcherWeb />
        </>
      )}

      {isTablet && (
        <>
          <NavLinks />
          <ThemeSwitcherTablet />
        </>
      )}

      {!isDesktop && !isTablet && (
        <button className="flat-button hamburger-icon" onClick={() => setIsMenuOpen(true)}>
          <FaBars />
        </button>
      )}

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
}
