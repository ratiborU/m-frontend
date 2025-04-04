'use client'
import { useQuery } from "@tanstack/react-query";
import { getOneFavoriteProduct } from "@/services/api/favoriteProducts/favoriteProductService";

export const useGetOneFavoriteProductQuery = (id: string | number) => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await getOneFavoriteProduct(id),
    queryKey: ['favoriteProducts', Number(id)],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};

