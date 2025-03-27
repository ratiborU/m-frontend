import React from 'react';
import styles from './title.module.css'

type TitleProps = {
  text: string,
  className?: string,
  margin?: boolean,
  marginTop?: boolean,
}

const Title = (props: TitleProps) => {
  const { text, className = '', margin = true, marginTop = true } = props
  return (
    <div
      className={`${styles.title} ${className}`}
      style={{
        marginLeft: margin ? '70px' : '0',
        marginRight: margin ? '70px' : '0',
        marginTop: marginTop ? '70px' : '0'
      }}
    >
      {text}
    </div>
  );
};

export default Title;