'use client'
import { useQuery } from "@tanstack/react-query";
import { getAllOrderProducts } from "@/services/api/orderProducts/orderProductService";

// хз как тут делать пагинацию
export const useGetOrderProductsQuery = () => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await getAllOrderProducts(),
    queryKey: ['orderProducts'],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};

