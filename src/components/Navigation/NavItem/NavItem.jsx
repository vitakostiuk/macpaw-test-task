import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ThemeContext, themes } from 'context/themeContect';
import { NavLink } from 'react-router-dom';
import s from './NavItem.module.css';

const NavItem = ({ name, image, backgroundColor, path }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <li className={s.ItemWrapper}>
      <div
        className={s.ImgWrapper}
        style={{ backgroundColor: backgroundColor }}
      >
        <img src={image} alt="navImg"></img>
      </div>
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
  );
};

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default NavItem;
