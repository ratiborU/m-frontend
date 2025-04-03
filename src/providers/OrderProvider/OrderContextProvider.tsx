'use client'
import { FC, ReactNode, useMemo, useState } from 'react';
import { OrderContext } from './contexts/orderContext';
import { OrderSetterContext } from './contexts/orderSetterContext';
import { LocalStorageService } from '@/lib/helpers/localStorageService';
// import { UserSecretStorageService } from '../../lib/helpers/userSecretStorageService';

interface OrderContextProviderProps {
  children: ReactNode;
}

export const OrderContextProvider: FC<OrderContextProviderProps> = (props) => {
  const { children } = props;
  const [address, setAddress] = useState(LocalStorageService.get('address') || '');
  const [fio, setFio] = useState(LocalStorageService.get('fio') || '');
  const [phone, setPhone] = useState(LocalStorageService.get('phone') || '');
  const [email, setEmail] = useState(LocalStorageService.get('email') || '');
  const [productsCartCount, setProductsCartCount] = useState(0);
  const [discountPerPackage, setDiscountPerPackage] = useState(0);

  const value = useMemo(() => ({ address, fio, phone, email, productsCartCount, discountPerPackage }),
    [address, fio, phone, email, productsCartCount, discountPerPackage]);
  const setterValue = { setAddress, setFio, setPhone, setEmail, setProductsCartCount, setDiscountPerPackage };

  return (
    <OrderContext.Provider value={value}>
      <OrderSetterContext.Provider value={setterValue}>
        {children}
      </OrderSetterContext.Provider>
    </OrderContext.Provider>
  );
};