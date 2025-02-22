'use client'
import { useMutation } from '@tanstack/react-query';
import { TPersonCreate } from '@/services/types/personType';
import { registration as registrationApi } from '@/services/api/authorizationService';
// import { login } from '@/services/api/authorizationService';

interface RegistrationMutationArgs {
  onSuccess?: () => void;
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
    // mutationFn: async (data: TRegistrationRequest) => alert('hola'),
    onSuccess,
    onError
  });

  return { isPending, isError, registration };
};