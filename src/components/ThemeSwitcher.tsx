'use client';
import { useState } from 'react';
import DynamicIcon from './DynamicIcon';
import useTheme from '@/hooks/useTheme';
import styles from './ThemeSwitcher.module.css';

const ThemeSwitcher = () => {
  const { theme, toggleTheme, DARK } = useTheme();
  const [isColorPicking, setIsColorPicking] = useState(false);
  const [hue, setHue] = useState<number>(240);

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHue = Number(e.target.value);
    setHue(newHue);
    document.documentElement.style.setProperty('--_hue', String(newHue));
  };

  return (
    <div className={styles.wrapper}>
      <button className="flat-button" onClick={toggleTheme}>
        <DynamicIcon name={theme === DARK ?
          'BsFillCloudMoonFill' : 'BsFillCloudSunFill'} />
      </button>

      <button className="flat-button"
        onClick={() => setIsColorPicking(true)}>
        <DynamicIcon name="AiOutlineBgColors" />
      </button>

      {isColorPicking && (
        <div className={styles.pickerPanel}>
          <button className={`flat-button ${styles.closeBtn}`}
            onClick={() => setIsColorPicking(false)}>
            <DynamicIcon name="IoCloseSharp" />
          </button>
          <input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={handleHueChange}
            className={styles.slider}
            aria-label="Change color theme"
          />
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
