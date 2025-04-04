'use client'
import { useQuery } from "@tanstack/react-query";
import { getOneImage } from "@/services/api/images/imageService";

export const useGetOneImageQuery = (id: string | number) => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await getOneImage(id),
    queryKey: ['images', Number(id)],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};

