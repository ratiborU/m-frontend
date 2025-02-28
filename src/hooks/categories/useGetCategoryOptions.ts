'use client'
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/services/api/categories/categoryService";

// хз как тут делать пагинацию
export const useGetCategoryOptionsQuery = () => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => {
      const categories = await getAllCategories();
      return categories.rows.map(x => ({ value: x.id, text: x.name }))
    },
    queryKey: ['categories', 'options'],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};

