'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategory as createCategoryApi } from '@/services/api/categories/categoryService';
import { TCategoryCreate } from '@/services/api/categories/categoryType';

interface CreateCategoryMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useCreateCategoryMutation = (args: CreateCategoryMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: createCategory,
  } = useMutation({
    mutationFn: async (data: TCategoryCreate) => await createCategoryApi(data),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['categories'],
      });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError
  });

  return { isPending, isError, createCategory };
};