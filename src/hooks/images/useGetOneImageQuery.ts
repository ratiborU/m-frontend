'use client'
import { useQuery } from "@tanstack/react-query";
import { getOneProduct } from "@/services/api/productService";

export const useGetOneProductQuery = (id: string | number) => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await getOneProduct(id),
    queryKey: ['products', Number(id)],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};

