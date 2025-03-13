'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFavoriteProductNoRevalidate as createFavoriteProductNoRevalidateApi } from '@/services/api/favoriteProducts/favoriteProductService';
import { TFavoriteProductCreate } from '@/services/api/favoriteProducts/favoriteProductType';

interface CreateFavoriteProductMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useCreateFavoriteProductNoRevalidateMutation = (args: CreateFavoriteProductMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: createFavoriteProductNoRevalidate,
  } = useMutation({
    mutationFn: async (data: TFavoriteProductCreate) => await createFavoriteProductNoRevalidateApi(data),
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

  return { isPending, isError, createFavoriteProductNoRevalidate };
};