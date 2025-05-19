'use client'
import React, { InputHTMLAttributes } from 'react';
import styles from "./radioButtonSF.module.css";

type RadioButtonProps = {
  inputProps?: InputHTMLAttributes<HTMLInputElement>,
  label?: string,
  error?: string,
}


const RadioButtonSF = (props: RadioButtonProps) => {
  const { inputProps = {}, label = '' } = props;


  return (
    <div className={styles.field}>
      <input
        className={styles.input}
        type="radio"
        {...inputProps}
      />
      <label className={styles.label} htmlFor={inputProps.id}>{label}</label>

    </div>
  );
};

export default RadioButtonSF;