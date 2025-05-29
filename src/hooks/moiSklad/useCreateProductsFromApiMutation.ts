'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { createProduct as createProductApi } from '@/services/api/Products/ProductService';
// import { TProductCreate } from '@/services/api/Products/ProductType';
import { createProductsFromApi } from '@/services/api/moiSklad/moiSkladService';

interface CreateProductMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useCreateProductsFromApiMutation = (args: CreateProductMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: createProducts,
  } = useMutation({
    mutationFn: async () => await createProductsFromApi(),
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

  return { isPending, isError, createProducts };
};