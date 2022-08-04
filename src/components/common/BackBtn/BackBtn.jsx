import { useContext } from 'react';
import { ThemeContext, themes } from 'context/themeContect';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeftBtn } from 'images/back-20.svg';
import s from './BackBtn.module.css';

const BackBtn = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleClickBackBtn = () => {
    navigate(-1);
  };

  return (
    <button
      type="button"
      className={theme === themes.light ? s.LeftArrowBtn : s.LeftArrowBtnDark}
      onClick={handleClickBackBtn}
    >
      <ArrowLeftBtn />
    </button>
  );
};

export default BackBtn;
