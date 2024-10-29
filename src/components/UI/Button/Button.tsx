'use client'
import React from 'react';
import styles from "./button.module.css";

type ButtonProps = {
  text: string;
  size: 'l' | 'm' | 's',
  type?: 'filled' | 'outlined',
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const Button = (props: ButtonProps) => {
  const { text, size = 'l', type = 'filled', onClick = () => { } } = props;
  return (
    <button className={`${styles.button} ${styles[size]} ${styles[type]}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;