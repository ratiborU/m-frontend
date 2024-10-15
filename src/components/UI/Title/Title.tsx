import React from 'react';
import styles from "./title.module.css";

type TitleProps = {
    text: string,
    size: 'l' | 'm' | 's' | 'xs'
}

const Title = (props: TitleProps) => {
    const {text, size} = props
    return (
        <h1 className={styles[size]}>{text}</h1>
    );
};

export default Title;