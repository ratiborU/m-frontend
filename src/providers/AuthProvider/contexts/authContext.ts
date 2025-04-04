import { createContext } from 'react';

export interface IAuthContext {
  isAuth: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
});