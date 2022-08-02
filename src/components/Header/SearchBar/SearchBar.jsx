import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SearchSvg } from 'images/search-20.svg';
import PropTypes from 'prop-types';
import s from './SearchBar.module.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');

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
  handleSearchbarSubmit: PropTypes.func,
};

export default SearchBar;
