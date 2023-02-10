import { useEffect } from 'react';
import React from 'react';
import './SearchForm.css';

function SearchForm({ getSearch, showInputError }) {
  const [search, setSearch] = React.useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getSearch(search);
  };

  useEffect(() => {
    setSearch('');
  }, []);

  // const isValid = useMemo(() => {
  //   return search.length > 0;
  // }, [search]);

  return (
    <form className="search__form" onSubmit={handleSubmit}>
      <h1 className="search__heading">What's going on in the world?</h1>
      <p className="search__text">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <div className="search-form__input">
        <input
          className="search__input"
          value={search}
          placeholder="Enter topic"
          onChange={handleSearchChange}
        />
        <button
          // disabled={!isValid}
          type="submit"
          className="search__input-button"
        >
          Search
        </button>
      </div>
      {showInputError && (
        <span className="search__form-error">Please enter a keyword</span>
      )}
    </form>
  );
}

export default SearchForm;
