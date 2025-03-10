'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct as updateProductApi } from '@/services/api/products/productService';


interface UpdateProductMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useUpdateProductMutation = (args: UpdateProductMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: updateProduct,
  } = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await updateProductApi(data)
      return response;
    },
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

  return { isPending, isError, updateProduct };
};