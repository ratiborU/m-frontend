import React from 'react';
import styles from './category.module.css'

type TParameterProps = {
  text: string,
  values: string[],
  onClick?: () => void,
}

const Parameter = (props: TParameterProps) => {
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

export default Parameter;