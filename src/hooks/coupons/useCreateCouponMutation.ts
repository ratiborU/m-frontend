'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnswer as createAnswerApi } from '@/services/api/answers/answerService';
import { TAnswerCreate } from '@/services/api/answers/answerType';

interface CreateAnswerMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useCreateAnswerMutation = (args: CreateAnswerMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: createAnswer,
  } = useMutation({
    mutationFn: async (data: TAnswerCreate) => await createAnswerApi(data),
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

  return { isPending, isError, createAnswer };
};