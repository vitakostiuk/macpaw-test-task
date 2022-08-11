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
      <div className={s.Container}>
        <BackBtn />
        <MainButton
          onClick={onClick}
          text={text}
          classNameBigBtn={classNameBigBtn}
          classNameText={classNameText}
        />
      </div>

      {children}
    </div>
  );
};

export default PageHeader;
