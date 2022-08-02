import React from 'react';
import s from './Likes.module.css';
import Header from 'components/Header';
import BackBtn from 'components/common/BackBtn';
import MainButton from 'components/common/MainButton';

const Likes = () => {
  return (
    <>
      {' '}
      <Header />
      <div className={s.Paper}>
        <div className={s.BtnWrapper}>
          <BackBtn />
          <MainButton
            // onClick={() => setIsClickVoting(true)}
            className={s.BigButton}
          >
            LIKES
          </MainButton>
        </div>
        {/* 
    {isLoading && (
      <div className={s.Loader}>
        <BallTriangle
          height="70"
          width="70"
          color="#ff868e"
          ariaLabel="loading"
        />
      </div>
    )} */}

        {/* {imageUrl && (
      <div className={s.ImgWrapper}>
        <img src={imageUrl} alt="cat" className={s.Img}></img>
      </div>
    )} */}

        {/* {query && (
      <div className={s.ImgWrapper}>
        <img src={resultByquery.url} alt="cat" className={s.Img} />
      </div>
    )} */}
      </div>
    </>
  );
};

export default Likes;
