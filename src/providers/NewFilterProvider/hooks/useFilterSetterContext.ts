import { useContext } from 'react';
import { FilterSetterContext, IFilterSetterContext } from '../contexts/filterSetterContext';

export const useFilterSetterContext = () => useContext<IFilterSetterContext>(FilterSetterContext);