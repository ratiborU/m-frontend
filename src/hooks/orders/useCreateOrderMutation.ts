'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder as createOrderApi } from '@/services/api/orders/orderService';
import { TOrderCreate } from '@/services/api/orders/orderType';

interface CreateOrderMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useCreateOrderMutation = (args: CreateOrderMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: createOrder,
  } = useMutation({
    mutationFn: async (data: TOrderCreate) => await createOrderApi(data),
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

  return { isPending, isError, createOrder };
};