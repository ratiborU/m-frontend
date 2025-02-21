'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct as deleteProductApi } from '@/services/api/productService';


interface DeleteProductMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useDeleteProductMutation = (args: DeleteProductMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: deleteProduct,
  } = useMutation({
    mutationFn: async (id: number | string) => await deleteProductApi(id),
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

  return { isPending, isError, deleteProduct };
};