'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOrderProduct as deleteorderproductApi } from '@/services/api/orderProducts/orderProductService';

interface DeleteOrderProductMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useDeleteOrderProductMutation = (args: DeleteOrderProductMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: deleteOrderProduct,
  } = useMutation({
    mutationFn: async (id: number | string) => await deleteorderproductApi(id),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['orderProducts'],
      });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError
  });

  return { isPending, isError, deleteOrderProduct };
};