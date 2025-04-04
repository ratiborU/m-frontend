import { createContext } from 'react';

export interface ICatalogFilterContext {
  startPrice: number,
  endPrice: number,
  categoryIds: string[],
  material: string[],
  size: string[],
  shape: string[],
}

export const CatalogFilterContext = createContext<ICatalogFilterContext>({
  startPrice: 0,
  endPrice: 8000,
  categoryIds: [],
  material: [], // золото сталь
  size: [], // большой маленький средний
  shape: [], // завальцовка крапан без камня
});