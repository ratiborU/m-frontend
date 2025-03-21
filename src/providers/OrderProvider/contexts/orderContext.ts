import { createContext } from 'react';

export interface IOrderContext {
  address: string,
  fio: string,
  phone: string,
  email: string,
}

export const OrderContext = createContext<IOrderContext>({
  address: '',
  fio: '',
  phone: '',
  email: '',
});