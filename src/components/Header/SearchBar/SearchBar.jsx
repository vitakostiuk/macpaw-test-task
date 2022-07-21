import { useState } from 'react';
import { ReactComponent as SearchSvg } from 'images/search-20.svg';
import PropTypes from 'prop-types';
import s from './SearchBar.module.css';

const SearchBar = ({ handleSearchbarSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      alert('Search bar is empty! Please, enter a text.');
      return;
    }
    handleSearchbarSubmit(query);
    setQuery('');
  };

  return (
    <>
      <form className={s.Wrapper} onSubmit={handleSubmit}>
        <input
          placeholder="Search for breeds by name"
          className={s.Input}
          onChange={e => setQuery(e.target.value.toLowerCase())}
        />
        <button type="submit" className={s.Btn}>
          <SearchSvg />
        </button>
      </form>
    </>
  );
};

SearchBar.propTypes = {
  handleSearchbarSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
