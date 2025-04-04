import { useContext } from 'react';
import { OrderSetterContext, IOrderSetterContext } from '../contexts/orderSetterContext';

export const useOrderSetterContext = () => useContext<IOrderSetterContext>(OrderSetterContext);