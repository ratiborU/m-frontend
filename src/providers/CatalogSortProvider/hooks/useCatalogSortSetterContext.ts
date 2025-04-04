import { useContext } from 'react';
import { CatalogSortSetterContext, ICatalogSortSetterContext } from '../contexts/catalogSortSetterContext';

export const useCatalogSortSetterContext = () => useContext<ICatalogSortSetterContext>(CatalogSortSetterContext);