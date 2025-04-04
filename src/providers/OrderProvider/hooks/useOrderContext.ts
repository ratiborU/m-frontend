import { useContext } from 'react';
import { OrderContext, IOrderContext } from '../contexts/orderContext';

export const useOrderContext = () => useContext<IOrderContext>(OrderContext);