import { createContext } from 'react';

export interface IPersonContext {
  id: string;
  fio: string,
  email: string,
}

export const PersonContext = createContext<IPersonContext>({
  id: '',
  fio: '',
  email: ''
});