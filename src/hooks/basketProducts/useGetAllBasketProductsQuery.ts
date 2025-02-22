'use client'
import { useQuery } from "@tanstack/react-query";
import { getAllBasketProducts } from "@/services/api/basketProducts/basketProductService";

// хз как тут делать пагинацию
export const useGetBasketProductsQuery = () => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await getAllBasketProducts(),
    queryKey: ['basketProducts'],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};

