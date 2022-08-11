import { useState } from 'react';
import SearchBar from './SearchBar';
import EmojiPage from './EmojiPage';
import PropTypes from 'prop-types';
import MobileMenu from 'components/MobileMenu';
import s from './Header.module.css';

const Header = () => {
  const [isClickOpenMenu, setIsClickOpenMenu] = useState(false);

  const openMenu = () => {
    setIsClickOpenMenu(prevOpenMenu => !prevOpenMenu);
  };

  return (
    <header className={s.Header}>
      {isClickOpenMenu && <MobileMenu openMenu={openMenu} />}
      <EmojiPage openMenu={openMenu} />
      <SearchBar />
    </header>
  );
};

Header.propTypes = {
  handleSearchbarSubmit: PropTypes.func,
};

export default Header;
