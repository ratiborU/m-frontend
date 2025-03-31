import React from 'react';
import styles from './nameAndProperty.module.css'

type NameAndPropertyProps = {
  name?: string,
  value?: string | number,
  size?: 's' | 'm' | 'l'
}

const NameAndProperty = (props: NameAndPropertyProps) => {
  const { name, value, size = 'm' } = props;



  return (
    <div className={`${styles.block} ${styles[size]}`}>
      <p className={styles.name}>{name}</p>
      <div className={styles.dots}></div>
      <span className={styles.value}>{value}</span>
    </div>
  );
};

export default NameAndProperty;