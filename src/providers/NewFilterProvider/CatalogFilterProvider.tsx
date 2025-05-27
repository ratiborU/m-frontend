'use client'
import { FC, ReactNode, useMemo, useState } from 'react';
import { FilterContext } from './contexts/filterContext';
// import { FilterSetterContext } from './contexts/filterSetterContext';
import { FilterSetterContext } from './contexts/filterSetterContext';
// import { UserSecretStorageService } from '../../lib/helpers/userSecreetStorageService';

interface FilterContextProviderProps {
  children: ReactNode;
}

export const FilterContextProvider: FC<FilterContextProviderProps> = (props) => {
  const { children } = props;
  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(4000);
  const [categoryId, setCategoryId] = useState<string>('');
  const [parameters, setParameters] = useState<object>({});

  const value = useMemo(
    () => ({ startPrice, endPrice, categoryId, parameters }),
    [startPrice, endPrice, categoryId, parameters]
  );
  const setterValue = { setStartPrice, setEndPrice, setCategoryId, setParameters };

  return (
    <FilterContext.Provider value={value}>
      <FilterSetterContext.Provider value={setterValue}>
        {children}
      </FilterSetterContext.Provider>
    </FilterContext.Provider>
  );
};