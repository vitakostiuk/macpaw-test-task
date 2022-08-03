import { NavLink } from 'react-router-dom';
import s from './EmojiPage.module.css';

const EmojiPage = () => {
  return (
    <ul className={s.EmojiPage}>
      <li className={s.Item}>
        <NavLink
          to="/likes"
          className={({ isActive }) =>
            isActive ? s.LikeLinkActive : s.LikeLink
          }
        ></NavLink>
      </li>
      <li className={s.Item}>
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            isActive ? s.FavouriteLinkActive : s.FavouriteLink
          }
        ></NavLink>
      </li>
      <li className={s.Item}>
        <NavLink
          to="/dislikes"
          className={({ isActive }) =>
            isActive ? s.DislikeLinkActive : s.DislikeLink
          }
        ></NavLink>
      </li>
    </ul>
  );
};

export default EmojiPage;
