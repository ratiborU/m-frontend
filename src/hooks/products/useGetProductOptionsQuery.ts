'use client'
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/services/api/products/productService";

// хз как тут делать пагинацию
export const useGetProductOptionsQuery = () => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => {
      const products = await getAllProducts()
      return products.rows.map(x => ({ value: x.id, text: x.name }))
    },
    queryKey: ['products', 'options'],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};

