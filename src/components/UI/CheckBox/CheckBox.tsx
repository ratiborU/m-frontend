import React, { InputHTMLAttributes } from 'react';
import styles from "./checkBox.module.css";

type CheckBoxProps = {
  inputProps?: InputHTMLAttributes<HTMLInputElement>,
  label?: string | React.ReactNode,
  error?: string,
}


const CheckBox = (props: CheckBoxProps) => {
  const { inputProps = {}, label = '' } = props;
  return (
    <div className={styles.field}>
      <input
        className={styles.input}
        type="checkbox"
        {...inputProps}
      />
      <label className={styles.label} htmlFor={inputProps.id}>{label}</label>
    </div>
  );
};

export default CheckBox;