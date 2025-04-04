'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOrder as updateOrderApi } from '@/services/api/orders/orderService';
import { TOrder } from '@/services/api/orders/orderType';

interface UpdateOrderMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useUpdateOrderMutation = (args: UpdateOrderMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: updateOrder,
  } = useMutation({
    mutationFn: async (data: TOrder) => await updateOrderApi(data),
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

  return { isPending, isError, updateOrder };
};