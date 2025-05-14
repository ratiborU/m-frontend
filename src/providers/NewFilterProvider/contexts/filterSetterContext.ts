import { createContext } from 'react';

export interface IFilterSetterContext {
  setStartPrice: (value: number) => void,
  setEndPrice: (value: number) => void,
  setCategoryId: (value: string) => void,
  setParameters: (value: object) => void,
}

export const FilterSetterContext = createContext<IFilterSetterContext>({
  setStartPrice: () => { },
  setEndPrice: () => { },
  setCategoryId: () => { },
  setParameters: () => { },
});