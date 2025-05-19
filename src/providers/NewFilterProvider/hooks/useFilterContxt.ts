import { useContext } from 'react';
import { FilterContext, IFilterContext } from '../contexts/filterContext';

export const useFilterContext = () => useContext<IFilterContext>(FilterContext);