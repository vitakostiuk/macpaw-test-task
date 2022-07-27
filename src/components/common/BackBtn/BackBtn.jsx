import { useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeftBtn } from 'images/back-20.svg';
import s from './BackBtn.module.css';

const BackBtn = () => {
  const navigate = useNavigate();

  const handleClickBackBtn = () => {
    navigate(-1);
  };

  return (
    <button
      type="button"
      className={s.LeftArrowBtn}
      onClick={handleClickBackBtn}
    >
      <ArrowLeftBtn />
    </button>
  );
};

export default BackBtn;
