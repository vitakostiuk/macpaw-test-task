import SearchBar from './SearchBar';
import EmojiPage from './EmojiPage';
import PropTypes from 'prop-types';
import s from './Header.module.css';

const Header = ({ handleSearchbarSubmit }) => {
  return (
    <header className={s.Header}>
      <SearchBar handleSearchbarSubmit={handleSearchbarSubmit} />
      <EmojiPage />
    </header>
  );
};

Header.propTypes = {
  handleSearchbarSubmit: PropTypes.func.isRequired,
};

export default Header;
