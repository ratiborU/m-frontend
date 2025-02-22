'use client'
import { useQuery } from "@tanstack/react-query";
import { getAllComments } from "@/services/api/comments/commentService";

// хз как тут делать пагинацию
export const useGetCommentsQuery = () => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await getAllComments(),
    queryKey: ['comments'],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};

