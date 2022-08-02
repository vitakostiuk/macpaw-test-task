import { BallTriangle } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.Loader}>
      <BallTriangle
        height="70"
        width="70"
        color="#ff868e"
        ariaLabel="loading"
      />
    </div>
  );
};

export default Loader;
