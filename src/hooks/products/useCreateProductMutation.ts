'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct as createProductApi } from '@/services/api/productService';


interface CreateProductMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useCreateProductMutation = (args: CreateProductMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: createProduct,
  } = useMutation({
    mutationFn: async (data: FormData) => await createProductApi(data),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['products'],
      });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError,
    retry: 2
  });

  return { isPending, isError, createProduct };
};