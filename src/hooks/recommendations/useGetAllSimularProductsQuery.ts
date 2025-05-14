'use client'
import { useQuery } from "@tanstack/react-query";
import { getAllSimularsByProductId } from "@/services/api/recomendations/recomendationService";

// хз как тут делать пагинацию
export const useGetSimularProductsQuery = (id: number | string) => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await getAllSimularsByProductId(id),
    queryKey: ['simularProducts', id],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};

