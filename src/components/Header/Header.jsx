import SearchBar from './SearchBar';
import EmojiPage from './EmojiPage';
import PropTypes from 'prop-types';
import s from './Header.module.css';

const Header = () => {
  return (
    <header className={s.Header}>
      <SearchBar />
      <EmojiPage />
    </header>
  );
};

Header.propTypes = {
  handleSearchbarSubmit: PropTypes.func,
};

export default Header;
