'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCategory as deleteCategoryApi } from '@/services/api/categories/categoryService';

interface DeleteCategoryMutationArgs {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useDeleteCategoryMutation = (args: DeleteCategoryMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: deleteCategory,
  } = useMutation({
    mutationFn: async (id: number | string) => await deleteCategoryApi(id),
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

  return { isPending, isError, deleteCategory };
};