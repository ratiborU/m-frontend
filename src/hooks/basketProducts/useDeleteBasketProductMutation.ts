'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBasketProduct as deleteBasketProductApi } from '@/services/api/basketProducts/basketProductService';


interface DeleteBasketProductMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useDeleteBasketProductMutation = (args: DeleteBasketProductMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: deleteBasketProduct,
  } = useMutation({
    mutationFn: async (id: number | string) => await deleteBasketProductApi(id),
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

  return { isPending, isError, deleteBasketProduct };
};