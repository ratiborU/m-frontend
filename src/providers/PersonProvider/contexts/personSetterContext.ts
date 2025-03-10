import { createContext } from 'react';

export interface IPersonSetterContext {
  setId: (value: string) => void,
  setFio: (value: string) => void,
  setEmail: (value: string) => void,
}

export const PersonSetterContext = createContext<IPersonSetterContext>({
  setId: () => { },
  setFio: () => { },
  setEmail: () => { },
});