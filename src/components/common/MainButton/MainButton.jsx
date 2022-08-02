import PropTypes from 'prop-types';
import s from './MainButton.module.css';

const MainButton = ({
  onClick,
  classNameBigBtn,
  classNameText,
  text,
  children,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${s.BigButton} ${classNameBigBtn}`}
    >
      {children}
      <span className={`${s.Text} ${classNameText}`}>{text}</span>
    </button>
  );
};

MainButton.defaultProps = {
  onClick: () => null,
  text: '',
};

MainButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.node,
};

export default MainButton;
