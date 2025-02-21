'use client'

import { useMutation } from '@tanstack/react-query';
import { TLogin } from '@/services/types/personType';
import { login as loginApi } from '@/services/api/authorizationService';
// import { createProduct as loginApi } from '@/services/api/testAuthService';

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
    // mutationFn: async (data: TLogin) => console.log(),
    onSuccess,
    onError
  });

  return { isPending, isError, login };
};