'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOrder as deleteOrderApi } from '@/services/api/orders/orderService';

interface DeleteOrderMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useDeleteOrderMutation = (args: DeleteOrderMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: deleteOrder,
  } = useMutation({
    mutationFn: async (id: number | string) => await deleteOrderApi(id),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['orders'],
      });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError
  });

  return { isPending, isError, deleteOrder };
};