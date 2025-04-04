'use client'
import { useQuery } from "@tanstack/react-query";
import { getOnePerson } from "@/services/api/persons/personService";

export const useGetOnePersonQuery = (id: string | number) => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await getOnePerson(id),
    queryKey: ['persons', Number(id)],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};

