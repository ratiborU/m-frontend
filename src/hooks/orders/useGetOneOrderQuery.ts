'use client'
import { useQuery } from "@tanstack/react-query";
import { getOneOrder } from "@/services/api/orders/orderService";

export const useGetOneOrderQuery = (id: string | number) => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await getOneOrder(id),
    queryKey: ['orders', Number(id)],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};

