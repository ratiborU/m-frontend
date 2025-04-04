'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFavoriteProductNoRevalidate as deleteFavoriteProductNoRevalidateApi } from '@/services/api/favoriteProducts/favoriteProductService';

interface DeleteFavoriteProductMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useDeleteFavoriteProductNoRevalidateMutation = (args: DeleteFavoriteProductMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: deleteFavoriteProductNoRevalidate,
  } = useMutation({
    mutationFn: async (id: number | string) => await deleteFavoriteProductNoRevalidateApi(id),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['products'],
      });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError
  });

  return { isPending, isError, deleteFavoriteProductNoRevalidate };
};