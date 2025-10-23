import React from 'react';
// import { productColumns } from './columns';
// import BaseGrid from '@/widjets/BaseGrid/BaseGrid';
import { getAllPersons } from '@/services/api/persons/personService';
import PersonsTable from '@/widjets/persons/PersonsTable/PersonsTable';

const page = async () => {
  const persons = await getAllPersons();

  return (
    <PersonsTable persons={persons} />
    // <BaseGrid columns={productColumns} data={persons.rows.filter(x => x.firstName != '')} />
  );
};

export default page;