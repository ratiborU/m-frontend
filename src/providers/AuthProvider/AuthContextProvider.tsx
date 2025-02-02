import { FC, ReactNode, useMemo, useState } from 'react';
import { AuthContext } from './contexts/authContext';
import { AuthSetterContext } from './contexts/authSetterContext';
// import { UserSecretStorageService } from '../../lib/helpers/userSecreetStorageService';

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = (props) => {
  const { children } = props;
  const [isAuth, setIsAuth] = useState(false);

  const value = useMemo(() => ({ isAuth }), [isAuth]);
  const setterValue = { setIsAuth };

  return (
    <AuthContext.Provider value={value}>
      <AuthSetterContext.Provider value={setterValue}>
        {children}
      </AuthSetterContext.Provider>
    </AuthContext.Provider>
  );
};