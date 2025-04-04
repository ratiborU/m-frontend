import React from 'react';
import { productColumns } from './columns';
import BaseGrid from '@/widjets/BaseGrid/BaseGrid';
import { getAllPersons } from '@/services/api/persons/personService';

const page = async () => {
  const persons = await getAllPersons();

  return (
    <BaseGrid columns={productColumns} data={persons.rows} />
  );
};

export default page;