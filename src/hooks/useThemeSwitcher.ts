import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export function useThemeSwitcher() {
  const { theme, toggleTheme, DARK } = useTheme();
  const [hue, setHue] = useState<number>(240);
  const [isColorPicking, setIsColorPicking] = useState(false);

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHue = Number(e.target.value);
    setHue(newHue);
    document.documentElement.style.setProperty('--_hue', String(newHue));
  };

  return { theme, toggleTheme, DARK, hue, handleHueChange, isColorPicking, setIsColorPicking };
}
