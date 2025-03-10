import { createContext } from 'react';

export type TSort = '' | 'popular' | 'rate' | 'rasePrice' | 'decreasePrice';

export interface ICatalogSortContext {
  sort: TSort,
}

export const CatalogSortContext = createContext<ICatalogSortContext>({
  sort: '',
});