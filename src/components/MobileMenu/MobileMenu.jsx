import { NavLink } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext, themes } from 'context/themeContect';
import { navButtons } from '../../data/navigation';
import { ReactComponent as CloseMenu } from 'images/close-20.svg';
import s from './MobileMenu.module.css';

const MobileMenu = ({ openMenu }) => {
  const [isClickCloseMenu, setIsClickCloseMenu] = useState(false);

  useEffect(() => {
    const handleTransformScreen = e => {
      if (!e.matches) return;
      setIsClickCloseMenu(true);
    };

    window
      .matchMedia('(min-width: 768px)')
      .addEventListener('change', handleTransformScreen);
    return () => {
      window
        .matchMedia('(min-width: 768px)')
        .removeEventListener('change', handleTransformScreen);
    };
  }, []);

  const closeMenu = () => {
    setIsClickCloseMenu(prevCloseMenu => !prevCloseMenu);
    openMenu();
  };

  const { theme } = useContext(ThemeContext);
  return (
    <div className={isClickCloseMenu ? s.ContainerIsHidden : s.Container}>
      <div className={s.CloseMenu} onClick={closeMenu}>
        <CloseMenu />
      </div>
      <nav className={s.NavList}>
        {navButtons.map(({ name, path }, index) => (
          <ul key={index}>
            <li className={s.ItemWrapper}>
              <NavLink
                to={path}
                className={({ isActive }) => {
                  if (theme === themes.light && !isActive) {
                    return s.BtnText;
                  }
                  if (theme === themes.light && isActive) {
                    return s.BtnTextActive;
                  }
                  if (theme === themes.dark && !isActive) {
                    return s.BtnTextDark;
                  }
                  if (theme === themes.dark && isActive) {
                    return s.BtnTextActive;
                  }
                }}
              >
                {name}
              </NavLink>
            </li>
          </ul>
        ))}
      </nav>
    </div>
  );
};

export default MobileMenu;
