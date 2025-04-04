'use client'
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/services/api/categories/categoryService";

// хз как тут делать пагинацию
export const useGetCategoriesQuery = () => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await getAllCategories(),
    queryKey: ['categories'],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};

