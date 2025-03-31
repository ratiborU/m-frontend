'use client'
import { useMutation } from '@tanstack/react-query';
import { TPersonCreate } from '@/services/api/persons/personType';
import { registration as registrationApi } from '@/services/api/auth/authorizationService';
// import { login } from '@/services/api/authorizationService';

interface RegistrationMutationArgs {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export const useRegistrationMutation = (args: RegistrationMutationArgs = {}) => {
  const { onSuccess, onError } = args;

  const {
    isPending,
    isError,
    mutateAsync: registration,
  } = useMutation({
    mutationFn: async (data: TPersonCreate) => {
      const response = await registrationApi(data)
      return response;
    },
    onSuccess,
    onError
  });

  return { isPending, isError, registration };
};