'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteImage as deleteImageApi } from '@/services/api/images/imageService';

interface DeleteImageMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useDeleteImageMutation = (args: DeleteImageMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: deleteImage,
  } = useMutation({
    mutationFn: async (id: number | string) => await deleteImageApi(id),
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

  return { isPending, isError, deleteImage };
};