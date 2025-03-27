import React from 'react';
import styles from './nameAndProperty.module.css'

type NameAndPropertyProps = {
  name?: string,
  value?: string | number,
}

const NameAndProperty = (props: NameAndPropertyProps) => {
  const { name, value } = props;
  return (
    <div className={styles.block}>
      <p className={styles.name}>{name}</p>
      <div className={styles.dots}></div>
      <p className={styles.value}>{value}</p>
    </div>
  );
};

export default NameAndProperty;