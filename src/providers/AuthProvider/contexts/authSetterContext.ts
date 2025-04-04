import { createContext } from 'react';

export interface IAuthSetterContext {
  setIsAuth: (value: boolean) => void;
}

export const AuthSetterContext = createContext<IAuthSetterContext>({
  setIsAuth: () => { },
});