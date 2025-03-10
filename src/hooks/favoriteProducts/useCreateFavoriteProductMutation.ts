'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFavoriteProduct as createFavoriteProductApi } from '@/services/api/favoriteProducts/favoriteProductService';
import { TFavoriteProductCreate } from '@/services/api/favoriteProducts/favoriteProductType';

interface CreateFavoriteProductMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useCreateFavoriteProductMutation = (args: CreateFavoriteProductMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: createFavoriteProduct,
  } = useMutation({
    mutationFn: async (data: TFavoriteProductCreate) => await createFavoriteProductApi(data),
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

  return { isPending, isError, createFavoriteProduct };
};