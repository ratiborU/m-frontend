'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCategory as updateCategoryApi } from '@/services/api/categories/categoryService';
import { TCategory } from '@/services/api/categories/categoryType';

interface UpdateCategoryMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useUpdateCategoryMutation = (args: UpdateCategoryMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: updateCategory,
  } = useMutation({
    mutationFn: async (data: TCategory) => await updateCategoryApi(data),
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

  return { isPending, isError, updateCategory };
};