'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOrderProduct as updateOrderProductApi } from '@/services/api/orderProducts/orderProductService';
import { TOrderProduct } from '@/services/api/orderProducts/orderProductType';

interface UpdateOrderProductMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useUpdateOrderProductMutation = (args: UpdateOrderProductMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: updateOrderProduct,
  } = useMutation({
    mutationFn: async (data: TOrderProduct) => await updateOrderProductApi(data),
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

  return { isPending, isError, updateOrderProduct };
};