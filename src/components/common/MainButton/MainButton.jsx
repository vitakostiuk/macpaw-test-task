import PropTypes from 'prop-types';
import s from './MainButton.module.css';

const MainButton = ({ onClick, children }) => {
  return (
    <button type="button" onClick={onClick} className={s.BigButton}>
      {children}
    </button>
  );
};

MainButton.defaultProps = {
  onClick: () => null,
  children: null,
};

MainButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default MainButton;
