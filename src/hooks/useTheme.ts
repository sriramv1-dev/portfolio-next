'use client';

import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const LIGHT = 'light';
const DARK = 'dark';

const useTheme = () => {
  const [theme, setTheme] = useLocalStorage('portfilio.theme', DARK);

  useEffect(() => {
    document.documentElement.setAttribute('color-scheme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === LIGHT ? DARK : LIGHT);

  return { theme, toggleTheme, LIGHT, DARK };
};

export default useTheme;
