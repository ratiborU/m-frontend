'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment as createCommentApi } from '@/services/api/comments/commentService';
import { TCommentCreate } from '@/services/api/comments/commentType';

interface CreateCommentMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useCreateCommentMutation = (args: CreateCommentMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: createComment,
  } = useMutation({
    mutationFn: async (data: TCommentCreate) => await createCommentApi(data),
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

  return { isPending, isError, createComment };
};