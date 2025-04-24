'use client'
import React, { useState } from 'react';
import SelectInput from '../UI/SelectInput/SelectInput';
import { TSort } from '@/providers/CatalogSortProvider/contexts/catalogSortContext';
import { useDebouncedCallback } from 'use-debounce';
import { useCatalogSortSetterContext } from '@/providers/CatalogSortProvider/hooks/useCatalogSortSetterContext';
import styles from './sorter.module.css';

const options = [
  {
    value: 'popular',
    text: 'Сначала популярные',
  },
  {
    value: 'rate',
    text: 'С высоким рейтингом',
  },
  {
    value: 'rasePrice',
    text: 'По возрастанию цены',
  },
  {
    value: 'decreasePrice',
    text: 'По убыванию цены',
  },
]

const Sorter = () => {
  const [sortState, setSortState] = useState<TSort>('');
  // const sort = useCatalogSortContext();
  const setSort = useCatalogSortSetterContext();

  const debounce = useDebouncedCallback(() => {
    setSort.setSort(sortState);
  }, 500)

  return (
    <div>
      <SelectInput
        classname={styles.sorter}
        selectProps={{
          style: {
            'width': '240px'
          }
        }}
        label={'Сортировать'}
        sizeInput='medium'
        text='Сортировать...'
        options={options}
        onChange={(e) => {
          setSortState(e?.target.value as TSort)
          debounce()
        }}

      />
    </div>
  );
};

export default Sorter;