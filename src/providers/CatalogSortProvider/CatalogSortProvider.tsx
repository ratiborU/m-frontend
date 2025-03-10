'use client'
import { FC, ReactNode, useMemo, useState } from 'react';
import { CatalogSortContext } from './contexts/catalogSortContext';
import { CatalogSortSetterContext } from './contexts/catalogSortSetterContext';
// import { UserSecretStorageService } from '../../lib/helpers/userSecreetStorageService';
import { TSort } from './contexts/catalogSortContext';

interface CatalogSortContextProviderProps {
  children: ReactNode;
}

export const CatalogSortContextProvider: FC<CatalogSortContextProviderProps> = (props) => {
  const { children } = props;
  const [sort, setSort] = useState<TSort>('');

  const value = useMemo(() => ({ sort }), [sort]);
  const setterValue = { setSort };

  return (
    <CatalogSortContext.Provider value={value}>
      <CatalogSortSetterContext.Provider value={setterValue}>
        {children}
      </CatalogSortSetterContext.Provider>
    </CatalogSortContext.Provider>
  );
};