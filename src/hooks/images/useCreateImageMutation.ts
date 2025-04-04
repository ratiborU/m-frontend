'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createImage as createImageApi } from '@/services/api/images/imageService';

interface CreateImageMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useCreateImageMutation = (args: CreateImageMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: createImage,
  } = useMutation({
    mutationFn: async (data: FormData) => await createImageApi(data),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['images'],
      });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError
  });

  return { isPending, isError, createImage };
};