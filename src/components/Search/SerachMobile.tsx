import React, { InputHTMLAttributes } from 'react';
import styles from './search.module.css'
import searchIcon from '../../../public/mobile/Search.svg'
import Image from 'next/image';

type SerachMobileProps = {
  inputProps?: InputHTMLAttributes<HTMLInputElement>,
  label?: string,
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void
}

const SerachMobile = (props: SerachMobileProps) => {
  const { inputProps, onChange = () => { } } = props;
  return (
    <div className={styles.field}>
      <input
        className={styles.input}
        {...inputProps}
        id='search-mobile'
        placeholder=''
        onChange={(e) => {
          if (inputProps?.onChange) {
            inputProps?.onChange(e);
          }
          onChange(e)
        }}
      />
      <label className={styles.label} htmlFor='search-mobile'>Поиск...</label>
      <label className={styles.label2} htmlFor='search-mobile'>
        <Image src={searchIcon} alt={''} />
      </label>
    </div>
  );
};

export default SerachMobile;