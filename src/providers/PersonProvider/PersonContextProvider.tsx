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
  const [phone, setPhone] = useState(LocalStorageService.get('phone') || '');
  const [address, setAddress] = useState(LocalStorageService.get('address') || '');
  const [longitude, setLongitude] = useState(LocalStorageService.get('longitude') || 60.63);
  const [latitude, setLatitude] = useState(LocalStorageService.get('latitude') || 56.84);

  const value = useMemo(() => ({ id, fio, email, phone, address, longitude, latitude }), [id, fio, email, phone, address, longitude, latitude]);
  const setterValue = { setId, setFio, setEmail, setPhone, setAddress, setLongitude, setLatitude };

  return (
    <PersonContext.Provider value={value}>
      <PersonSetterContext.Provider value={setterValue}>
        {children}
      </PersonSetterContext.Provider>
    </PersonContext.Provider>
  );
};