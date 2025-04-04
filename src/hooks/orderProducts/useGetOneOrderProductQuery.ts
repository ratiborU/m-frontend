'use client'
import { useQuery } from "@tanstack/react-query";
import { getOneOrderProduct } from "@/services/api/orderProducts/orderProductService";

export const useGetOneOrderProductQuery = (id: string | number) => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await getOneOrderProduct(id),
    queryKey: ['orderProducts', Number(id)],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};

