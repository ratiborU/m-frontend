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
  classname?: string,
  error?: string,
  sizeInput?: 'xsmall' | 'small' | 'medium' | 'large',
  options?: TOption[],
  optionsAr?: string[],
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
    optionsAr = [],
    text = props.sizeInput == 'xsmall' ? 'Выбрать' : 'Выберите вариант...',
    onChange = () => { },
    classname = ''
  } = props;

  return (
    <div className={`${styles.field} ${classname}`}>
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
        {options.length != 0 && options?.map((x) =>
          <option key={`optionKey: ${x.value}`} value={x.value}>{x.text}</option>
        )}
        {options.length == 0 && optionsAr?.map((x) =>
          <option key={`optionKey: ${x}`} value={x}>{x}</option>
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