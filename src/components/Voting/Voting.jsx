import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import UserActionLogs from '../UserActionLogs';
import { ReactComponent as Like } from 'images/like-white-30.svg';
import { ReactComponent as Favorite } from 'images/fav-white-30.svg';
import { ReactComponent as Dislike } from 'images/dislike-white-30.svg';
import { ReactComponent as ArrowLeftBtn } from 'images/back-20.svg';
import Header from '../Header';
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
  const [query, setQuery] = useState('');
  const [resultByquery, setResultByquery] = useState({});

  axios.defaults.headers.common['x-api-key'] =
    'b1dfeea4-d632-4776-b494-723bac3c8eb2';

  // First fetch random cat and fetch after each click on button VOTING
  useEffect(() => {
    const fetchRandomCat = async () => {
      try {
        setIsLoading(true);

        if (isClickVoting) {
          ///////////
          let { data } = await axios.get(
            'https://api.thecatapi.com/v1/images/search',
          );
          setOneRandonCat(data);
          setImageUrl(data[0].url);
          // console.log(cat);
        }

        // Search by name
        if (query) {
          setOneRandonCat([]);
          setActionLogs([]);
          setImageUrl('');
          let queryResult = await axios.get(
            'https://api.thecatapi.com/v1/images/search',
            {
              params: { q: query },
            },
          );
          console.log('queryResult', queryResult.data);
          setResultByquery(queryResult.data[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsClickVoting(false);
        setIsLoading(false);
      }
    };
    fetchRandomCat();
  }, [isClickVoting, query]);

  // Add LIKE
  useEffect(() => {
    if (!isClickLike) return;
    const addLike = async () => {
      try {
        if (isClickLike) {
          // Click like
          let body = {
            image_id: oneRandonCat[0].id,
            sub_id: 'User-123',
            value: 1,
          };
          let { data } = await axios.post(
            'https://api.thecatapi.com/v1/votes',
            body,
          );
          console.log(data);
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
          let body = {
            image_id: oneRandonCat[0].id,
            sub_id: 'User-123',
            value: 0,
          };
          let { data } = await axios.post(
            'https://api.thecatapi.com/v1/votes',
            body,
          );
          console.log(data);
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
          let body = {
            image_id: oneRandonCat[0].id,
            sub_id: 'User-123',
          };
          let { data } = await axios.post(
            'https://api.thecatapi.com/v1/favourites',
            body,
          );
          console.log(data);
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

  const handleSearchbarSubmit = name => {
    setQuery(name);
  };

  return (
    <>
      {' '}
      <Header handleSearchbarSubmit={handleSearchbarSubmit} />
      <div className={s.Paper}>
        <div className={s.BtnWrapper}>
          <button type="button" className={s.LeftArrowBtn}>
            <ArrowLeftBtn />
          </button>
          <button
            type="button"
            onClick={() => setIsClickVoting(true)}
            className={s.BigButton}
          >
            VOTING
          </button>
        </div>

        {isLoading && (
          <div className={s.Loader}>
            <BallTriangle
              height="70"
              width="70"
              color="#ff868e"
              ariaLabel="loading"
            />
          </div>
        )}

        {imageUrl && (
          <div className={s.ImgWrapper}>
            <img src={imageUrl} alt="cat" className={s.Img}></img>
          </div>
        )}

        {query && (
          <div className={s.ImgWrapper}>
            <img src={resultByquery.url} alt="cat" className={s.Img} />
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
      </div>
    </>
  );
};

export default VotingBlock;