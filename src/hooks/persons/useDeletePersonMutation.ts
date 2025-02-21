'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePerson as deletePersonApi } from '@/services/api/personService';


interface DeletePersonMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useDeletePersonMutation = (args: DeletePersonMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: deletePerson,
  } = useMutation({
    mutationFn: async (id: number | string) => await deletePersonApi(id),
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

  return { isPending, isError, deletePerson };
};