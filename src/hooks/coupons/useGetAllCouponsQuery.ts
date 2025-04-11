'use client'
import { useQuery } from "@tanstack/react-query";
import { getAllAnswers } from "@/services/api/answers/answerService";

// хз как тут делать пагинацию
export const useGetAnswersQuery = () => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await getAllAnswers(),
    queryKey: ['answers'],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};

