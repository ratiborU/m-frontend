import { useContext } from 'react';
import { AuthContext, IAuthContext } from '../contexts/authContext';

export const useAuthContext = () => useContext<IAuthContext>(AuthContext);