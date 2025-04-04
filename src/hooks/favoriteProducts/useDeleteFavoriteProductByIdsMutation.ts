'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFavoriteProductByIds as deleteFavoriteProductByIdsApi } from '@/services/api/favoriteProducts/favoriteProductService';
import { TFavoriteProductCreate } from '@/services/api/favoriteProducts/favoriteProductType';

interface DeleteFavoriteProductMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useDeleteFavoriteProductByIdsMutation = (args: DeleteFavoriteProductMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: deleteFavoriteProductByIds,
  } = useMutation({
    mutationFn: async (data: TFavoriteProductCreate) => await deleteFavoriteProductByIdsApi(data),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['favoriteProducts'],
      });
      client.invalidateQueries({
        queryKey: ['products'],
      });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError
  });

  return { isPending, isError, deleteFavoriteProductByIds };
};