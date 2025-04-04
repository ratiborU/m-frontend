import { createContext } from 'react';
import { TSort } from './catalogSortContext';

export interface ICatalogSortSetterContext {
  setSort: (value: TSort) => void,
}

export const CatalogSortSetterContext = createContext<ICatalogSortSetterContext>({
  setSort: () => { },
});