'use client';

import { useState } from 'react';
import DynamicIcon from './DynamicIcon';
import useTheme from '@/hooks/useTheme';
import './color-change.scss';
import './theme-mode.scss';

const ThemeSwitcher = () => {
  const { theme, toggleTheme, DARK } = useTheme();
  const [isColorPicking, setIsColorPicking] = useState(false);
  const [hue, setHue] = useState<number>(240);

  const handleHueChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newHue = Number((e.target as HTMLInputElement).value);
    setHue(newHue);
    document.documentElement.style.setProperty('--_hue', String(newHue));
  };

  return (
    <div className="theme-switcher-wrapper">
      {/* Dark / Light mode toggle */}
      <button className="flat-button" onClick={toggleTheme}>
        <DynamicIcon name={theme === DARK ? 'BsFillCloudMoonFill' : 'BsFillCloudSunFill'} />
      </button>

      {/* Accent color picker */}
      {isColorPicking && (
        <div className="color-picker-wrapper">
          <button
            className="flat-button close-btn"
            aria-label="Close color picking mode"
            onClick={() => setIsColorPicking(false)}
          >
            <DynamicIcon name="IoCloseSharp" />
          </button>
          <input
            type="range"
            min="0"
            max="360"
            className="picker"
            aria-label="Change the color theme slider"
            value={hue}
            onInput={handleHueChange}
          />
        </div>
      )}

      <button className="flat-button" onClick={() => setIsColorPicking(true)}>
        <DynamicIcon name="AiOutlineBgColors" />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
