import { useState } from 'react';
import css from './Searchbar.module.css';
import Notiflix from 'notiflix';

export const Searchbar = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleChange = ({ target: { value } }) => setValue(value);

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return Notiflix.Notify.failure('insert word for searching.');

    onSearch(value);
    setValue('');
  };

  return (
    <div className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          className={css.searchFormInput}
          type="text"
          placeholder="Search images and photos"
          aria-label="Search"
          value={value}
          onChange={handleChange}
        />

        <button type="submit" className={css.searchFormButton}>
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

Notiflix.Notify.init({
  position: 'right-top',
  width: '300px',
  distance: '10px',
  opacity: 1,
  rtl: false,
  timeout: 1000,
});
