'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBasketProduct as createBasketProductApi } from '@/services/api/basketProducts/basketProductService';
import { TBasketProductCreate } from '@/services/api/basketProducts/basketProductType';

interface CreateBasketProductMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useCreateBasketProductMutation = (args: CreateBasketProductMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: createBasketProduct,
  } = useMutation({
    mutationFn: async (data: TBasketProductCreate) => await createBasketProductApi(data),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['basketProducts'],
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

  return { isPending, isError, createBasketProduct };
};