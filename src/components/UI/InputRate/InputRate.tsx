'use client'
import React, { useState } from 'react';
import star from '../../../../public/Star rate.svg';
import starGrey from '../../../../public/Star rate gray filled.svg';
import Image from 'next/image';
import InputRateButton from './InputRateButton';
import styles from './inputRate.module.css'

type InputRateProps = {
  rate?: number,
  setRate?: (value: number) => void
}

const InputRate = (props: InputRateProps) => {
  const { rate = 0, setRate = () => { } } = props;
  const [currentRate, setCurrentRate] = useState(rate);
  const [hoverRate, setHoverRate] = useState(0);

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
          key={`input rate button key: i`}
          rate={i + 1}
          currentRate={currentRate}
          hoverRate={hoverRate}
          onClick={onClick(i)}
          onHover={() => 1}
        />
      ))}
    </div>
  );
};

export default InputRate;