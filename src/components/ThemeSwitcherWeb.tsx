'use client';
import DynamicIcon from './DynamicIcon';
import { useThemeSwitcher } from '@/hooks/useThemeSwitcher';
import styles from './ThemeSwitcherWeb.module.css';

export default function ThemeSwitcherWeb() {
  const { theme, toggleTheme, DARK, hue, handleHueChange, isColorPicking, setIsColorPicking } = useThemeSwitcher();
  return (
    <div className={styles.wrapper}>
      <button className={styles.btn} onClick={toggleTheme}>
        <DynamicIcon name={theme === DARK ? 'BsFillCloudMoonFill' : 'BsFillCloudSunFill'} />
      </button>
      <button className={styles.btn} onClick={() => setIsColorPicking(!isColorPicking)}>
        <DynamicIcon name="AiOutlineBgColors" />
      </button>
      {isColorPicking && (
        <div className={styles.pickerPanel}>
          <button className={styles.closeBtn} onClick={() => setIsColorPicking(false)}>
            <DynamicIcon name="IoCloseSharp" />
          </button>
          <input type="range" min="0" max="360" value={hue} onChange={handleHueChange} className={styles.slider} />
        </div>
      )}
    </div>
  );
}
