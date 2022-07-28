import PropTypes from 'prop-types';

const MainButton = ({ onClick, children, className }) => {
  return (
    <button type="button" onClick={onClick} className={className}>
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
