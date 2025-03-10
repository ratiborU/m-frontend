'use client'
import { FC, ReactNode, useMemo, useState } from 'react';
import { PersonContext } from './contexts/personContext';
import { PersonSetterContext } from './contexts/personSetterContext';
import { LocalStorageService } from '@/lib/helpers/localStorageService';
// import { UserSecretStorageService } from '../../lib/helpers/userSecretStorageService';

interface PersonContextProviderProps {
  children: ReactNode;
}

export const PersonContextProvider: FC<PersonContextProviderProps> = (props) => {
  const { children } = props;
  const [id, setId] = useState(LocalStorageService.get('id') || '');
  const [fio, setFio] = useState(LocalStorageService.get('fio') || '');
  const [email, setEmail] = useState(LocalStorageService.get('email') || '');

  const value = useMemo(() => ({ id, fio, email }), [id, fio, email]);
  const setterValue = { setId, setFio, setEmail };

  return (
    <PersonContext.Provider value={value}>
      <PersonSetterContext.Provider value={setterValue}>
        {children}
      </PersonSetterContext.Provider>
    </PersonContext.Provider>
  );
};