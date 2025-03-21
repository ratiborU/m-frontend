import React from 'react';
import styles from './title.module.css'

type TitleProps = {
  text: string,
  className?: string,
}

const Title = (props: TitleProps) => {
  const { text, className = '' } = props
  return (
    <div className={`${styles.title} ${className}`}>
      {text}
    </div>
  );
};

export default Title;