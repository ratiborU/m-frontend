'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TPersonCreate } from '@/services/api/persons/personType';
import { createPerson as createPersonApi } from '@/services/api/persons/personService';


interface CreatePersonMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useCreatePersonMutation = (args: CreatePersonMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: createPerson,
  } = useMutation({
    mutationFn: async (data: TPersonCreate) => await createPersonApi(data),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['persons'],
      });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError
  });

  return { isPending, isError, createPerson };
};