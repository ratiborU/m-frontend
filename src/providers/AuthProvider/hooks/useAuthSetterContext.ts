import { useContext } from 'react';
import { AuthSetterContext, IAuthSetterContext } from '../contexts/authSetterContext';

export const useAuthSetterContext = () => useContext<IAuthSetterContext>(AuthSetterContext);