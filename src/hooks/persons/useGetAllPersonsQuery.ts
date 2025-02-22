'use client'
import { useQuery } from "@tanstack/react-query";
import { getAllPersons } from "@/services/api/persons/personService";

// хз как тут делать пагинацию
export const useGetPersonsQuery = () => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await getAllPersons(),
    queryKey: ['persons'],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};

