import React, { SelectHTMLAttributes } from 'react';
import styles from "./selectInput.module.css";
// import { InputHTMLAttributes } from 'react';

type TOption = {
  value: string,
  text: string,
}

type SelectInputProps = {
  selectProps: SelectHTMLAttributes<HTMLSelectElement>,
  label: string,
  error?: string,
  sizeInput?: 'small' | 'medium' | 'large',
  options?: TOption[],
  text?: string,
  onChange?: (e?: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput = (props: SelectInputProps) => {
  const {
    selectProps,
    label,
    sizeInput = 'medium',
    error = '',
    options = [],
    text = 'Выберите вариант...',
    onChange = () => { },
  } = props;

  return (
    <div className={styles.field}>
      <select
        className={`${styles.input} ${styles[sizeInput]}`}
        defaultValue={selectProps?.defaultValue || ''}
        {...selectProps}
        onChange={(e) => {
          if (selectProps.onChange) {
            selectProps.onChange(e);
          }
          onChange(e);
        }}
      >
        <option disabled hidden value="">{text}</option>
        {...options?.map((x) =>
          <option key={`optionKey: ${x.value}`} value={x.value}>{x.text}</option>
        )}
      </select>
      {/* <input
        className={`${styles.input} ${styles[sizeInput]}`}
        {...inputProps}
      /> */}
      <label className={styles.label} htmlFor={selectProps.id}>{label}</label>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default SelectInput;