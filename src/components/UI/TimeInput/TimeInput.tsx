import React from 'react';
import styles from "./timeInput.module.css";
import { InputHTMLAttributes } from 'react';


type InputProps2 = {
  inputProps: InputHTMLAttributes<HTMLInputElement>,
  label: string,
  error?: string,
  sizeInput?: 'xsmall' | 'small' | 'medium' | 'large',
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void
}

const TimeInput = (props: InputProps2) => {
  const { inputProps, onChange = () => { }, label, sizeInput = 'medium', error = '' } = props;
  return (
    <div className={styles.field}>
      <input
        className={`${styles.input} ${styles[sizeInput]}`}
        {...inputProps}
        type='date'
        onChange={(e) => {
          if (inputProps.onChange) {
            inputProps.onChange(e);
          }
          onChange(e)
        }}
      />
      <label className={styles.label} htmlFor={inputProps.id}>{label}</label>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default TimeInput;