'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
  DARK: string;
  LIGHT: string;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const DARK = 'dark';
const LIGHT = 'light';
const STORAGE_KEY = 'portfilio.theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<string>(LIGHT);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTheme(stored);
      document.documentElement.setAttribute('color-scheme', stored);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === DARK ? LIGHT : DARK;
    setTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.setAttribute('color-scheme', next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, DARK, LIGHT }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
