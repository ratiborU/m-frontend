'use client'
import { FC, ReactNode, useMemo, useState } from 'react';
import { CatalogFilterContext } from './contexts/catalogFilterContext';
import { CatalogFilterSetterContext } from './contexts/catalogFilterSetterContext';
// import { UserSecretStorageService } from '../../lib/helpers/userSecreetStorageService';

interface CatalogFilterContextProviderProps {
  children: ReactNode;
}

export const CatalogFilterContextProvider: FC<CatalogFilterContextProviderProps> = (props) => {
  const { children } = props;
  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(2000);
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [material, setMaterial] = useState<string[]>([]);
  const [size, setSize] = useState<string[]>([]);
  const [shape, setShape] = useState<string[]>([]);

  const value = useMemo(
    () => ({ startPrice, endPrice, categoryIds, material, size, shape }),
    [startPrice, endPrice, categoryIds, material, size, shape]
  );
  const setterValue = { setStartPrice, setEndPrice, setCategoryIds, setMaterial, setSize, setShape };

  return (
    <CatalogFilterContext.Provider value={value}>
      <CatalogFilterSetterContext.Provider value={setterValue}>
        {children}
      </CatalogFilterSetterContext.Provider>
    </CatalogFilterContext.Provider>
  );
};