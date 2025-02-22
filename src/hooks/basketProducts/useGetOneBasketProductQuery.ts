'use client'
import { useQuery } from "@tanstack/react-query";
import { getOneBasketProduct } from "@/services/api/basketProducts/basketProductService";

export const useGetOneBasketProductQuery = (id: string | number) => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await getOneBasketProduct(id),
    queryKey: ['basketProducts', Number(id)],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};

