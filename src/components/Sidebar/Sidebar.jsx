import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext, themes } from 'context/themeContect';
import Navigation from '../Navigation';
import { ReactComponent as LogoPaw } from 'images/paw.svg';
import { ReactComponent as LogoText } from 'images/PetsPaw.svg';
import { ReactComponent as LogoTextWhite } from 'images/PetsPaw-white.svg';
import ThemeSwitcher from 'components/common/ThemeSwitcher';
import s from './Sidebar.module.css';

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={s.Wrapper}>
      <header className={s.Sidebar}>
        <div className={s.Container}>
          {' '}
          <NavLink to="/">
            <div className={s.LogoWrapper}>
              <LogoPaw width="106" height="24" className={s.LogoPaw} />
              {theme === themes.light ? (
                <LogoText width="106" height="24" className={s.LogoText} />
              ) : (
                <LogoTextWhite width="106" height="24" className={s.LogoText} />
              )}
            </div>
          </NavLink>
          <ThemeSwitcher />
        </div>
        <h1 className={theme === themes.light ? s.Title : s.TitleDark}>
          Hi intern!
        </h1>
        <p className={s.SubTitle}>Welcome to MI 2022 Front-end test</p>
        <Navigation />
      </header>
    </div>
  );
};

export default Sidebar;
