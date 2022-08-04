import { useContext, useState } from 'react';
import { ThemeContext, themes } from 'context/themeContect';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SearchSvg } from 'images/search-20.svg';
import PropTypes from 'prop-types';
import s from './SearchBar.module.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    // 👇️ redirect to /contacts
    navigate('/search', { state: { query } });

    if (query.trim() === '') {
      alert('Search bar is empty! Please, enter a text.');
      return;
    }
    // handleSearchbarSubmit(query);
    setQuery('');
    e.target.reset();
  };

  return (
    <>
      <form
        className={theme === themes.light ? s.Wrapper : s.WrapperDark}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search for breeds by name"
          className={theme === themes.light ? s.Input : s.InputDark}
          onChange={e => setQuery(e.target.value.toLowerCase())}
        />
        <button
          type="submit"
          className={theme === themes.light ? s.Btn : s.BtnDark}
        >
          <SearchSvg />
        </button>
      </form>
    </>
  );
};

SearchBar.propTypes = {
  handleSearchbarSubmit: PropTypes.func,
};

export default SearchBar;
