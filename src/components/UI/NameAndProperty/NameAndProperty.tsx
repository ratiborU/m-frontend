'use client'
import React, { useEffect, useState } from 'react';
import styles from './nameAndProperty.module.css'

type NameAndPropertyProps = {
  name?: string,
  value?: string | number,
  size?: 's' | 'm' | 'l'
}

const NameAndProperty = (props: NameAndPropertyProps) => {
  const { name, value, size = 'm' } = props;
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    setWidth(document.getElementById(`span element for text: ${name}, ${value}`)?.offsetWidth || 0)
  }, [name, value])

  return (
    <div className={`${styles.block} ${styles[size]}`}>
      <p
        className={styles.name}
        style={{
          minWidth: width == 0 ? undefined : width + 6
        }}
      >
        <span id={`span element for text: ${name}, ${value}`}>
          {name}
        </span>
      </p>
      <div className={styles.dots}></div>
      <span className={styles.value}>{value}</span>
    </div>
  );
};

export default NameAndProperty;