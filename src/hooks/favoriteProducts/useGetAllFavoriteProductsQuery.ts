'use client'
import { useQuery } from "@tanstack/react-query";
import { getAllFavoriteProducts } from "@/services/api/favoriteProducts/favoriteProductService";

// хз как тут делать пагинацию
export const useGetFavoriteProductsQuery = () => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await getAllFavoriteProducts(),
    queryKey: ['favoriteProducts'],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};

