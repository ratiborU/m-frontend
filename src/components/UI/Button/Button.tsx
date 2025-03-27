'use client'
import React, { ButtonHTMLAttributes } from 'react';
import styles from "./button.module.css";

type ButtonProps = {
  className?: string,
  text: string;
  size: 'l' | 'm' | 's',
  type?: 'filled' | 'outlined',
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>
}

const Button = (props: ButtonProps) => {
  const { text, className = '', size = 'l', type = 'filled', onClick = () => { }, buttonProps } = props;
  return (
    <button
      className={`${styles.button} ${className} ${styles[size]} ${styles[type]}`}
      onClick={onClick}
      {...buttonProps}
    >
      {text}
    </button>
  );
};

export default Button;