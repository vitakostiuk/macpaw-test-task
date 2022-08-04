import { useContext } from 'react';
import { ThemeContext, themes } from 'context/themeContect';
import { NavLink } from 'react-router-dom';
import s from './EmojiPage.module.css';

const EmojiPage = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <ul className={s.EmojiPage}>
      <li className={theme === themes.light ? s.Item : s.ItemDark}>
        <NavLink
          to="/likes"
          className={({ isActive }) => {
            if (theme === themes.light && !isActive) {
              return s.LikeLink;
            }
            if (theme === themes.light && isActive) {
              return s.LikeLinkActive;
            }
            if (theme === themes.dark && !isActive) {
              return s.LikeLinkDark;
            }
            if (theme === themes.dark && isActive) {
              return s.LikeLinkActive;
            }
          }}
        ></NavLink>
      </li>
      <li className={theme === themes.light ? s.Item : s.ItemDark}>
        <NavLink
          to="/favourites"
          className={({ isActive }) => {
            if (theme === themes.light && !isActive) {
              return s.FavouriteLink;
            }
            if (theme === themes.light && isActive) {
              return s.FavouriteLinkActive;
            }
            if (theme === themes.dark && !isActive) {
              return s.FavouriteLinkDark;
            }
            if (theme === themes.dark && isActive) {
              return s.FavouriteLinkActive;
            }
          }}
        ></NavLink>
      </li>
      <li className={theme === themes.light ? s.Item : s.ItemDark}>
        <NavLink
          to="/dislikes"
          className={({ isActive }) => {
            if (theme === themes.light && !isActive) {
              return s.DislikeLink;
            }
            if (theme === themes.light && isActive) {
              return s.DislikeLinkActive;
            }
            if (theme === themes.dark && !isActive) {
              return s.DislikeLinkDark;
            }
            if (theme === themes.dark && isActive) {
              return s.DislikeLinkActive;
            }
          }}
        ></NavLink>
      </li>
    </ul>
  );
};

export default EmojiPage;
