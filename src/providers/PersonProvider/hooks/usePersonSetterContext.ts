import { useContext } from 'react';
import { PersonSetterContext, IPersonSetterContext } from '../contexts/personSetterContext';

export const usePersonSetterContext = () => useContext<IPersonSetterContext>(PersonSetterContext);