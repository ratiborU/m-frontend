'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TPerson } from '@/services/api/persons/personType';
import { updatePerson as updatePersonApi } from '@/services/api/persons/personService';


interface UpdatePersonMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useUpdatePersonMutation = (args: UpdatePersonMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: updatePerson,
  } = useMutation({
    mutationFn: async (data: TPerson) => await updatePersonApi(data),
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

  return { isPending, isError, updatePerson };
};