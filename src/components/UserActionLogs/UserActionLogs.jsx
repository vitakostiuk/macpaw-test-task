import PropTypes from 'prop-types';
import { ThemeContext, themes } from 'context/themeContect';
import { useState, useEffect, useContext } from 'react';
import { ReactComponent as Like } from 'images/like-color-20.svg';
import { ReactComponent as Favorite } from 'images/fav-color-20.svg';
import { ReactComponent as Dislike } from 'images/dislike-color-20.svg';
import s from './UserActionLogs.module.css';

const UserActionLogs = ({ time, id, emoji }) => {
  const [likeStatus, setLikeStatus] = useState(false);
  const [dislikeStatus, setDislikeStatus] = useState(false);
  const [favouriteStatus, setFavouriteStatus] = useState(false);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (emoji === 'Likes') {
      setLikeStatus(true);
    }

    if (emoji === 'Dislikes') {
      setDislikeStatus(true);
    }

    if (emoji === 'Favourites') {
      setFavouriteStatus(true);
    }
  }, [emoji]);

  return (
    <>
      <span className={theme === themes.light ? s.Time : s.TimeDark}>
        {time}
      </span>
      <p className={s.Text}>
        Image ID:{' '}
        <span className={theme === themes.light ? s.Id : s.IdDark}>{id}</span>{' '}
        {`was added to ${emoji}`}
      </p>
      {likeStatus && <Like className={s.Icon} />}
      {dislikeStatus && <Dislike className={s.Icon} />}
      {favouriteStatus && <Favorite className={s.Icon} />}
    </>
  );
};

UserActionLogs.propTypes = {
  time: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
};

export default UserActionLogs;
