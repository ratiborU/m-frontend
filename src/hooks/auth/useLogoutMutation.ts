'use client'

import { useMutation } from '@tanstack/react-query';
// import { TLogin } from '@/services/api/persons/personType';
import { logout as logoutApi } from '@/services/api/auth/authorizationService';

interface LogoutMutationArgs {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useLogoutMutation = (args: LogoutMutationArgs = {}) => {
  const { onSuccess, onError } = args;

  const {
    isPending,
    isError,
    mutateAsync: logout,
  } = useMutation({
    mutationFn: async () => await logoutApi(),
    onSuccess,
    onError
  });

  return { isPending, isError, logout };
};