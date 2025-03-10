'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBasketProduct as updateBasketProductApi } from '@/services/api/basketProducts/basketProductService';
import { TBasketProduct } from '@/services/api/basketProducts/basketProductType';

interface UpdateBasketProductMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useUpdateBasketProductMutation = (args: UpdateBasketProductMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: updateBasketProduct,
  } = useMutation({
    mutationFn: async (data: TBasketProduct) => await updateBasketProductApi(data),
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

  return { isPending, isError, updateBasketProduct };
};