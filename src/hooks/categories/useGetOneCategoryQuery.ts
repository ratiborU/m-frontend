'use client'
import { useQuery } from "@tanstack/react-query";
import { getOneCategory } from "@/services/api/categories/categoryService";

export const useGetOneCategoryQuery = (id: string | number) => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await getOneCategory(id),
    queryKey: ['categories', Number(id)],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};

