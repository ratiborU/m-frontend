'use client'
import { useQuery } from "@tanstack/react-query";
import { getOneComment } from "@/services/api/comments/commentService";

export const useGetOneCommentQuery = (id: string | number) => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await getOneComment(id),
    queryKey: ['comments', Number(id)],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};

