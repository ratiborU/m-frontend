'use client'
import { useQuery } from "@tanstack/react-query";
import { getAllSimularsByProductId } from "@/services/api/recomendations/recomendationService";
import { getLoyalty } from "@/services/api/loyalty/loyaltyService";

// хз как тут делать пагинацию
export const useGetLoyaltyQuery = () => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await getLoyalty(),
    queryKey: ['loyal'],
    staleTime: 0,
  });

  return { data, isFetching, error };
};

