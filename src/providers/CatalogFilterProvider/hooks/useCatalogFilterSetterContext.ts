import { useContext } from 'react';
import { CatalogFilterSetterContext, ICatalogFilterSetterContext } from '../contexts/catalogFilterSetterContext';

export const useCatalogFilterSetterContext = () => useContext<ICatalogFilterSetterContext>(CatalogFilterSetterContext);