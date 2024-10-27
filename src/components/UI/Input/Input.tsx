import React from 'react';
import styles from "./input.module.css";
// import { HTMLInputTypeAttribute } from 'react';
import { InputHTMLAttributes } from 'react';

// input props?
// type InputProps = {
//     label: string
//     placeholder: string,
//     id: string,
//     size?: 'm' | 'l',
//     type?: HTMLInputTypeAttribute,
//     // type?: 'text' | "password" | "submit" | "color" | "date" | "email" | "file" | "hidden" | "image" | "url" | "time" | "number" | "radio" | "range" | "reset" | "search" | "button" | "tel" | "week" | "month" | "datetime-local" | "checkbox" 
//     autoComplete?: 'on' | 'off' | 'new-passport'
// }

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    sizeInput?: 'm' | 'l',
}

interface InputProps2 {
    inputProps: InputHTMLAttributes<HTMLInputElement>,
    label: string,
    sizeInput?: 'm' | 'l',
}

const Input = (props: InputProps2) => {
    const {inputProps, label, sizeInput='m'} = props;
    return (
        <div className={styles.field}>
            <input 
                className={`${styles.input} ${sizeInput == 'l' ? styles.inputLarge : ''}`} 
                // id={id}
                // type={type} 
                // ref={ref}
                // {...props}
                // placeholder={placeholder}
                // autoComplete={autoComplete}
                {...inputProps}
            />
            <label className={styles.label} htmlFor={inputProps.id}>{label}</label>
        </div>
    );
};

export default Input;