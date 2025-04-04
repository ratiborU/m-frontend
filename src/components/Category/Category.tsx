import React from 'react';
import styles from './category.module.css'

type TCategoryProps = {
  text: string,
  values: string[],
  onClick?: () => void,
}

const Category = (props: TCategoryProps) => {
  const { text, onClick, values } = props
  const active = values.includes(text) ? styles.active : '';
  return (
    <button
      className={`${styles.category} ${active}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Category;