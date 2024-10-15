import React from 'react';
import styles from "./input.module.css";

type InputProps = {
    label: string
    placeholder: string,
    id: string
}

const Input = (props: InputProps) => {
    const {label, placeholder, id} = props;
    return (
        <div className={styles.field}>
            <input 
                className={styles.input} 
                id={id}
                type="text" 
                // ref={ref}
                // {...props}
                placeholder={placeholder}
            />
            <label className={styles.label} htmlFor={id}>{label}</label>
        </div>
    );
};

export default Input;