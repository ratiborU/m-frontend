'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment as deleteCommentApi } from '@/services/api/comments/commentService';

interface DeleteCommentMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useDeleteCommentMutation = (args: DeleteCommentMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: deleteComment,
  } = useMutation({
    mutationFn: async (id: number | string) => await deleteCommentApi(id),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['comments'],
      });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError
  });

  return { isPending, isError, deleteComment };
};