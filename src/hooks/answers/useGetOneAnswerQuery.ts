'use client'
import { useQuery } from "@tanstack/react-query";
import { getOneAnswer } from "@/services/api/answers/answerService";

export const useGetOneAnswerQuery = (id: string | number) => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await getOneAnswer(id),
    queryKey: ['answers', Number(id)],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};

