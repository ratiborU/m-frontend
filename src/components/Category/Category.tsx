import React from 'react';
import styles from './category.module.css'

type TCategoryProps = {
  text: string,
  value: string,
  currentValue: string,
  onClick?: () => void,
}

const Category = (props: TCategoryProps) => {
  const { text, onClick, value, currentValue } = props
  const active = value == currentValue ? styles.active : '';
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