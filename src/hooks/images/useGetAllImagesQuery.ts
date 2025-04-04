'use client'
import { useQuery } from "@tanstack/react-query";
import { getAllImages } from "@/services/api/images/imageService";

// хз как тут делать пагинацию
export const useGetImagesQuery = () => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await getAllImages(),
    queryKey: ['images'],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};

