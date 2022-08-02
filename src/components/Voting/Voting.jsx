import * as api from 'services/api-cat';
import { useState, useEffect } from 'react';
import UserActionLogs from '../UserActionLogs';
import { ReactComponent as Like } from 'images/like-white-30.svg';
import { ReactComponent as Favorite } from 'images/fav-white-30.svg';
import { ReactComponent as Dislike } from 'images/dislike-white-30.svg';
import TemplatePage from 'components/common/TemplatePage';
import PageHeader from 'components/common/PageHeader';
import Loader from 'components/common/Loader';
import s from './Voting.module.css';

const getTime = () => {
  const date = new Date().toLocaleTimeString();
  return date.slice(0, 5);
};

const VotingBlock = () => {
  const [oneRandonCat, setOneRandonCat] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [actionLogs, setActionLogs] = useState([]);
  const [isClickVoting, setIsClickVoting] = useState(true);
  const [isClickLike, setIsClickLike] = useState(false);
  const [isClickDislike, setIsClickDislike] = useState(false);
  const [isClickFavourite, setIsClickFavourite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // First fetch random cat and fetch after each click on button VOTING
  useEffect(() => {
    const fetchRandomCat = async () => {
      try {
        setIsLoading(true);

        if (isClickVoting) {
          let randomImg = await api.getData('/images/search');
          setOneRandonCat(randomImg);
          setImageUrl(randomImg[0].url);
          // console.log('randomImg', randomImg);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsClickVoting(false);
        setIsLoading(false);
      }
    };
    fetchRandomCat();
  }, [isClickVoting]);

  // Add LIKE
  useEffect(() => {
    if (!isClickLike) return;
    const addLike = async () => {
      try {
        if (isClickLike) {
          // Click like
          await api.postData('/votes', {
            image_id: oneRandonCat[0].id,
            sub_id: 'User-123',
            value: 1,
          });

          setActionLogs(prevActionLogs => [
            { time: getTime(), id: oneRandonCat[0].id, emoji: 'Likes' },
            ...prevActionLogs,
          ]);
          setIsClickLike(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsClickVoting(false);
      }
    };
    addLike();
  }, [isClickLike, oneRandonCat]);

  // Add DISLIKE
  useEffect(() => {
    if (!isClickDislike) return;

    const addDislike = async () => {
      try {
        if (isClickDislike) {
          // Click Dislike
          await api.postData('/votes', {
            image_id: oneRandonCat[0].id,
            sub_id: 'User-123',
            value: 0,
          });

          setActionLogs(prevActionLogs => [
            { time: getTime(), id: oneRandonCat[0].id, emoji: 'Dislikes' },
            ...prevActionLogs,
          ]);
          setIsClickDislike(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsClickVoting(false);
      }
    };
    addDislike();
  }, [isClickDislike, oneRandonCat]);

  // Add FAVOURITE
  useEffect(() => {
    if (!isClickFavourite) return;

    const addFavourite = async () => {
      try {
        if (isClickFavourite) {
          // Click Dislike
          await api.postData('/favourites', {
            image_id: oneRandonCat[0].id,
            sub_id: 'User-123',
          });

          setActionLogs(prevActionLogs => [
            { time: getTime(), id: oneRandonCat[0].id, emoji: 'Favourites' },
            ...prevActionLogs,
          ]);
          setIsClickFavourite(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsClickVoting(false);
      }
    };
    addFavourite();
  }, [isClickFavourite, oneRandonCat]);

  const handleClickVoting = () => {
    setIsClickVoting(true);
  };

  return (
    <>
      <TemplatePage isLoading={isLoading}>
        <PageHeader text="VOTING" onClick={handleClickVoting} />

        {imageUrl && (
          <div className={s.ImgWrapper}>
            {isLoading && <Loader />}
            {!isLoading && (
              <img src={imageUrl} alt="cat" className={s.Img}></img>
            )}
          </div>
        )}

        <ul className={s.EmojiPage}>
          <li className={s.Item}>
            <button
              type="button"
              className={s.EmojiBtn}
              onClick={() => setIsClickLike(true)}
            >
              <Like />
            </button>
          </li>
          <li className={s.Item}>
            <button
              type="button"
              className={s.EmojiBtn}
              onClick={() => setIsClickFavourite(true)}
            >
              <Favorite />
            </button>
          </li>
          <li className={s.Item}>
            <button
              type="button"
              className={s.EmojiBtn}
              onClick={() => setIsClickDislike(true)}
            >
              <Dislike />
            </button>
          </li>
        </ul>

        {
          <ul className={s.ActionList}>
            {actionLogs.map(({ time, id, emoji }) => (
              <li key={id} className={s.ActionItem}>
                <UserActionLogs time={time} id={id} emoji={emoji} />
              </li>
            ))}
          </ul>
        }
      </TemplatePage>
    </>
  );
};

export default VotingBlock;
