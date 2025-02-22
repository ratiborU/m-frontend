'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFavoriteProduct as deleteFavoriteProductApi } from '@/services/api/favoriteProducts/favoriteProductService';

interface DeleteFavoriteProductMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useDeleteFavoriteProductMutation = (args: DeleteFavoriteProductMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: deleteFavoriteProduct,
  } = useMutation({
    mutationFn: async (id: number | string) => await deleteFavoriteProductApi(id),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['favoriteProducts'],
      });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError
  });

  return { isPending, isError, deleteFavoriteProduct };
};