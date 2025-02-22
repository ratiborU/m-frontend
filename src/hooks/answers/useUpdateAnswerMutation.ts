'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAnswer as updateAnswerApi } from '@/services/api/answers/answerService';
import { TAnswer } from '@/services/api/answers/answerType';

interface UpdateAnswerMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useUpdateAnswerMutation = (args: UpdateAnswerMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: updateAnswer,
  } = useMutation({
    mutationFn: async (data: TAnswer) => await updateAnswerApi(data),
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

  return { isPending, isError, updateAnswer };
};