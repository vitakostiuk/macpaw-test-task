import React from 'react';
import BackBtn from 'components/common/BackBtn';
import MainButton from 'components/common/MainButton';
import s from './PageHeader.module.css';

const PageHeader = ({
  text,
  onClick,
  classNameBigBtn,
  classNameText,
  children,
}) => {
  return (
    <div className={s.BtnWrapper}>
      <BackBtn />
      <MainButton
        onClick={onClick}
        text={text}
        classNameBigBtn={classNameBigBtn}
        classNameText={classNameText}
      />
      {children}
    </div>
  );
};

export default PageHeader;
