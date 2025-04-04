'use client'
import { useQuery } from "@tanstack/react-query";
import { getAllPersons } from "@/services/api/persons/personService";

// хз как тут делать пагинацию
export const useGetPersonOptionsQuery = () => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => {
      const persons = await getAllPersons();
      return persons.rows.map(x => ({ value: x.id, text: `${x.secondName} ${x.firstName}` }))
    },
    queryKey: ['persons', 'options'],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};

