import { useContext } from 'react';
import { PersonContext, IPersonContext } from '../contexts/personContext';

export const usePersonContext = () => useContext<IPersonContext>(PersonContext);