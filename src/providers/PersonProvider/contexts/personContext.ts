import { createContext } from 'react';

export interface IPersonContext {
  id: string;
  fio: string,
  email: string,
  phone: string,
  address: string,
  longitude: number,
  latitude: number
}

export const PersonContext = createContext<IPersonContext>({
  id: '',
  fio: '',
  email: '',
  phone: '',
  address: '',
  longitude: 0,
  latitude: 0
});