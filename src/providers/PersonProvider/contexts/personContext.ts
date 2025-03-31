import { createContext } from 'react';

export interface IPersonContext {
  id: string;
  fio: string,
  email: string,
  phone: string,
  address: string,
}

export const PersonContext = createContext<IPersonContext>({
  id: '',
  fio: '',
  email: '',
  phone: '',
  address: '',
});