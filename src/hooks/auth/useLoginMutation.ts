'use client'

import { useMutation } from '@tanstack/react-query';
import { TLogin } from '@/services/api/persons/personType';
import { login as loginApi } from '@/services/api/auth/authorizationService';

interface LoginMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useLoginMutation = (args: LoginMutationArgs = {}) => {
  const { onSuccess, onError } = args;

  const {
    isPending,
    isError,
    mutateAsync: login,
  } = useMutation({
    mutationFn: async (data: TLogin) => await loginApi(data),
    onSuccess,
    onError
  });

  return { isPending, isError, login };
};