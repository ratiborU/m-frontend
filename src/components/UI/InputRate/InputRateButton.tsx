import React from 'react';
import Image from 'next/image';
import star from '../../../../public/Star rate.svg';
import starGrey from '../../../../public/Star rate gray filled.svg';
import styles from './inputRate.module.css'

type InputRateButtonProps = {
  rate: number,
  currentRate: number,
  onClick: () => void
}

const InputRateButton = (props: InputRateButtonProps) => {
  const { rate, currentRate, onClick } = props;

  return (
    <button
      className={styles.button}
      onClick={onClick}
      type='button'
    >
      <Image
        className={styles.image}
        src={currentRate >= rate ? star : starGrey}
        alt={''}
        width={40}
        height={40}
      />
    </button>
  );
};

export default InputRateButton;