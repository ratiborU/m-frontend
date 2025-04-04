'use client'
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/services/api/products/productService";

// хз как тут делать пагинацию
export const useGetProductsQuery = () => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await getAllProducts(),
    queryKey: ['products'],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};

