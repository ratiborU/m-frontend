import React from 'react';
import EditPerson from '@/widjets/persons/EditPerson/EditPerson';
import { getOnePerson } from '@/services/api/persons/personService';

const page = async ({ params }: { params: { personId: string } }) => {
  const { personId } = params;
  const person = await getOnePerson(personId)

  return (
    <div>
      <EditPerson {...person} />
    </div>
  );
};

export default page;