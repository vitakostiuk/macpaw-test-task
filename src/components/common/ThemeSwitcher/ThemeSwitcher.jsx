import { useContext } from 'react';
import { ThemeContext, themes } from 'context/themeContect';
import s from './ThemeSwitcher.module.css';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className={s.Container}>
      <div className={theme === themes.light ? s.Eye : s.CloseEye} />
      <label className={s.Switch}>
        <input
          type="checkbox"
          onChange={toggleTheme}
          checked={theme === themes.light}
        />
        <span className={`${s.Slider} ${s.Round}`}></span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
