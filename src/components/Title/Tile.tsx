import React from 'react';
import styles from './title.module.css'

type TitleProps = {
  text: string
}

const Title = (props: TitleProps) => {
  const { text } = props
  return (
    <div className={styles.title}>
      {text}
    </div>
  );
};

export default Title;