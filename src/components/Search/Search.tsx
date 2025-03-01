import React from 'react';
import styles from './search.module.css'

const Search = () => {
  return (
    // Лучше застилизовать, пока норм
    <input
      className={styles.search}
      type='text'
      placeholder='Найти любой товар...'
    />
  );
};

export default Search;