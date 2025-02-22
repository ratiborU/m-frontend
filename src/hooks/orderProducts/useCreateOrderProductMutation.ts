'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrderProduct as createOrderproductApi } from '@/services/api/orderProducts/orderProductService';
import { TOrderProductCreate } from '@/services/api/orderProducts/orderProductType';


interface CreateOrderProductMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useCreateOrderProductMutation = (args: CreateOrderProductMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: createOrderProduct,
  } = useMutation({
    mutationFn: async (data: TOrderProductCreate) => await createOrderproductApi(data),
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

  return { isPending, isError, createOrderProduct };
};