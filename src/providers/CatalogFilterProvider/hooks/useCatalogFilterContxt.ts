import { useContext } from 'react';
import { CatalogFilterContext, ICatalogFilterContext } from '../contexts/catalogFilterContext';

export const useCatalogFilterContext = () => useContext<ICatalogFilterContext>(CatalogFilterContext);