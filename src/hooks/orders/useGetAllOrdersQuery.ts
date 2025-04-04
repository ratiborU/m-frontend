'use client'
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "@/services/api/orders/orderService";

// хз как тут делать пагинацию
export const useGetOrdersQuery = () => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await getAllOrders(),
    queryKey: ['orders'],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};

