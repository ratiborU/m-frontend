'use client'
import React from 'react';
import styles from "./textarea.module.css";
import { TextareaHTMLAttributes } from 'react';


interface TextareaProps {
  inputProps?: TextareaHTMLAttributes<HTMLTextAreaElement>,
  label?: string,
  error?: string,
  sizeInput?: 'm' | 'l',
}

const Textarea = (props: TextareaProps) => {
  const { inputProps, label, sizeInput = 'm', error } = props;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "0px";
    e.target.style.height = e.target.scrollHeight + "px";
  }

  // Ужас ужасный но пока что как сделать иначе я не знаю
  // ибо ref использовать не могу так как он передается
  // в react-hook-form
  const linesCount = Number(String(inputProps?.defaultValue).match(/\n/g)?.length || 0)
  const defaultHeight = 49 + linesCount * 18.715 + 'px';

  return (
    <div className={styles.field}>
      <textarea
        className={`${styles.textarea} ${sizeInput == 'l' ? styles.inputLarge : ''}`}
        {...inputProps}
        style={{
          height: defaultHeight
        }}
        onChange={(e) => {
          handleChange(e);
          if (inputProps?.onChange) {
            inputProps?.onChange(e);
          }
        }}
      />
      <label className={styles.label} htmlFor={inputProps?.id}>{label}</label>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Textarea;