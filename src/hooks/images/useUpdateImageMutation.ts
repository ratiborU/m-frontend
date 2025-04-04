'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateImage as updateImageApi } from '@/services/api/images/imageService';

interface UpdateImageMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useUpdateImageMutation = (args: UpdateImageMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: updateImage,
  } = useMutation({
    mutationFn: async (data: FormData) => await updateImageApi(data),
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

  return { isPending, isError, updateImage };
};