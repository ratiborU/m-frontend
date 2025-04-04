import { createContext } from 'react';

export interface ICatalogFilterSetterContext {
  setStartPrice: (value: number) => void,
  setEndPrice: (value: number) => void,
  setCategoryIds: (value: string[]) => void,
  setMaterial: (value: string[]) => void,
  setSize: (value: string[]) => void,
  setShape: (value: string[]) => void,
}

export const CatalogFilterSetterContext = createContext<ICatalogFilterSetterContext>({
  setStartPrice: () => { },
  setEndPrice: () => { },
  setCategoryIds: () => { },
  setMaterial: () => { },
  setSize: () => { },
  setShape: () => { },
});