import { useContext } from 'react';
import { CatalogSortContext, ICatalogSortContext } from '../contexts/catalogSortContext';

export const useCatalogSortContext = () => useContext<ICatalogSortContext>(CatalogSortContext);