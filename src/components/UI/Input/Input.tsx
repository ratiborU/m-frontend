import React from 'react';
import styles from "./input.module.css";
import { InputHTMLAttributes } from 'react';


type InputProps2 = {
  inputProps: InputHTMLAttributes<HTMLInputElement>,
  label: string,
  sizeInput?: 'small' | 'medium' | 'large',
}

const Input = (props: InputProps2) => {
  const { inputProps, label, sizeInput = 'medium' } = props;
  return (
    <div className={styles.field}>
      <input
        className={`${styles.input} ${styles[sizeInput]}`}
        {...inputProps}
      />
      <label className={styles.label} htmlFor={inputProps.id}>{label}</label>
    </div>
  );
};

export default Input;