'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAnswer as deleteAnswerApi } from '@/services/api/answers/answerService';

interface DeleteAnswerMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useDeleteAnswerMutation = (args: DeleteAnswerMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: deleteAnswer,
  } = useMutation({
    mutationFn: async (id: number | string) => await deleteAnswerApi(id),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['answers'],
      });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError
  });

  return { isPending, isError, deleteAnswer };
};