import { createContext } from 'react';

export interface IFilterContext {
  startPrice: number,
  endPrice: number,
  categoryId: string,
  parameters: object
}

export const FilterContext = createContext<IFilterContext>({
  startPrice: 0,
  endPrice: 8000,
  categoryId: '',
  parameters: {}
});