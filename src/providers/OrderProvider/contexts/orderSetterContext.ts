import { createContext } from 'react';

export interface IOrderSetterContext {
  setAddress: (value: string) => void,
  setFio: (value: string) => void,
  setPhone: (value: string) => void,
  setEmail: (value: string) => void,
  setProductsCartCount: (value: number) => void,
  setDiscountPerPackage: (value: number) => void
}

export const OrderSetterContext = createContext<IOrderSetterContext>({
  setAddress: () => { },
  setFio: () => { },
  setPhone: () => { },
  setEmail: () => { },
  setProductsCartCount: () => { },
  setDiscountPerPackage: () => { }
});