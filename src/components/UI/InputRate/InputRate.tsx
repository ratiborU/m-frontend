'use client'
import React, { useState } from 'react';
import InputRateButton from './InputRateButton';
import styles from './inputRate.module.css'

type InputRateProps = {
  rate?: number,
  setRate?: (value: number) => void
}

const InputRate = (props: InputRateProps) => {
  const { rate = 0, setRate = () => { } } = props;
  const [currentRate, setCurrentRate] = useState(rate);

  const onClick = (i: number) => {
    return () => {
      setCurrentRate(i + 1)
      setRate(i + 1)
    }
  }

  return (
    <div className={styles.buttons}>
      {...[...Array(5)].map((x, i) => (
        <InputRateButton
          key={`input rate button key: ${i}`}
          rate={i + 1}
          currentRate={currentRate}
          onClick={onClick(i)}
        />
      ))}
    </div>
  );
};

export default InputRate;