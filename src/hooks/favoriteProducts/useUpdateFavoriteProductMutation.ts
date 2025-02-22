'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateFavoriteProduct as updateFavoriteProductApi } from '@/services/api/favoriteProducts/favoriteProductService';
import { TFavoriteProduct } from '@/services/api/favoriteProducts/favoriteProductType';

interface UpdateFavoriteProductMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useUpdateFavoriteProductMutation = (args: UpdateFavoriteProductMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: updateFavoriteProduct,
  } = useMutation({
    mutationFn: async (data: TFavoriteProduct) => await updateFavoriteProductApi(data),
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

  return { isPending, isError, updateFavoriteProduct };
};