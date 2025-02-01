import React from 'react';
import EditPerson from '@/widjets/persons/EditPerson/EditPerson';
import { TPerson } from '@/services/types/personType';

const page = async ({ params }: { params: { personId: string } }) => {
  const { personId } = params;
  const response = await fetch(`http://localhost:5000/api/persons/${personId}`, { cache: 'no-cache' });
  const person: TPerson = await response.json();
  return (
    <div>
      {/* редактировать пользователя {person.firstName} */}
      <EditPerson {...person} />
    </div>
  );
};

export default page;