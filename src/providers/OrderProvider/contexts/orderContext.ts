import { createContext } from 'react';

export interface IOrderContext {
  address: string,
  fio: string,
  phone: string,
  email: string,
  productsCartCount: number,
  discountPerPackage: number
}

export const OrderContext = createContext<IOrderContext>({
  address: '',
  fio: '',
  phone: '',
  email: '',
  productsCartCount: 0,
  discountPerPackage: 0
});