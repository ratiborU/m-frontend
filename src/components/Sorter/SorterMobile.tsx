'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './sorter.module.css'
import sortIcon from '../../../public/mobile/Keyboard arrow down.svg'
import RadioButtonSF from '../UI/RadioButtonSF/RadioButtonSF';
import { useCatalogSortSetterContext } from '@/providers/CatalogSortProvider/hooks/useCatalogSortSetterContext';
import { useDebouncedCallback } from 'use-debounce';

const SorterMobile = () => {
  const [isActive, setIsActive] = useState(false);
  const [sortState, setSortState] = useState<'' | 'popular' | 'rate' | 'rasePrice' | 'decreasePrice'>('');
  const setSort = useCatalogSortSetterContext();

  const debounce = useDebouncedCallback(() => {
    setSort.setSort(sortState);
  }, 0)

  const onClose = () => {
    setIsActive(false);
    document.getElementById('dark-window-sort-mobile')?.removeEventListener('click', onClose)
  }


  const onClickButton = () => {
    setIsActive(!isActive);
    document.getElementById('dark-window-sort-mobile')
      ?.addEventListener('click', onClose)
  }

  const onClickOption = (value: '' | 'popular' | 'rate' | 'rasePrice' | 'decreasePrice') => {
    setSortState(value);
    setIsActive(!isActive);
    onClose();
    debounce();
  }

  return (
    <>
      <button
        className={styles.sortButtonMobile}
        type='button'
        onClick={onClickButton}
      >
        Сортировать
        <Image className={isActive ? styles.imageActive : styles.image} src={sortIcon} alt={''} />
      </button>
      <div
        id='dark-window-sort-mobile'
        className={
          isActive
            ? styles.darkWindow
            : styles.darkWindowNone
        }
      ></div>
      <div className={isActive ? styles.sortBlockMobile : styles.sortBlockMobileNone}>
        <RadioButtonSF
          label='По популярности'
          inputProps={{
            id: 'radio-button-sort-mobile-popular',
            name: 'radio-button-sort-mobile',
            onClick: () => onClickOption('popular')
          }}
        />
        <RadioButtonSF
          label='По рейтингу'
          inputProps={{
            id: 'radio-button-sort-mobile-rate',
            name: 'radio-button-sort-mobile',
            onClick: () => onClickOption('rate')
          }}
        />
        <RadioButtonSF
          label='По возрастанию цены'
          inputProps={{
            id: 'radio-button-sort-mobile-rase-price',
            name: 'radio-button-sort-mobile',
            onClick: () => onClickOption('rasePrice')
          }}
        />
        <RadioButtonSF
          label='По Убыванию цены'
          inputProps={{
            id: 'radio-button-sort-mobile-decrease-price',
            name: 'radio-button-sort-mobile',
            onClick: () => onClickOption('decreasePrice')
          }}
        />
      </div>
    </>
  );
};

export default SorterMobile;