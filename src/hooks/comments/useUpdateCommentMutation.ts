'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateComment as updateCommentApi } from '@/services/api/comments/commentService';
import { TComment } from '@/services/api/comments/commentType';

interface UpdateCommentMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useUpdateCommentMutation = (args: UpdateCommentMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: updateComment,
  } = useMutation({
    mutationFn: async (data: TComment) => await updateCommentApi(data),
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

  return { isPending, isError, updateComment };
};