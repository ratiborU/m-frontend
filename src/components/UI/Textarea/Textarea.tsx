'use client'
import React from 'react';
import styles from "./textarea.module.css";
import { TextareaHTMLAttributes } from 'react';


interface TextareaProps {
  inputProps?: TextareaHTMLAttributes<HTMLTextAreaElement>,
  label?: string,
  sizeInput?: 'm' | 'l',
}

const Textarea = (props: TextareaProps) => {
  const { inputProps, label, sizeInput = 'm' } = props;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "0px";
    e.target.style.height = e.target.scrollHeight + "px";
  }

  return (
    <div className={styles.field}>
      <textarea
        className={`${styles.textarea} ${sizeInput == 'l' ? styles.inputLarge : ''}`}
        {...inputProps}
        onChange={(e) => {
          handleChange(e);
          if (inputProps?.onChange) {
            inputProps?.onChange(e);
          }
        }}
      />
      <label className={styles.label} htmlFor={inputProps?.id}>{label}</label>
    </div>
  );
};

export default Textarea;