import React from 'react';
// import { productsData } from '@/services/mock/mockProducts';
import { productColumns } from './columns';
import BaseGrid from '@/widjets/BaseGrid/BaseGrid';
// import { cookies } from 'next/headers';
import { getAllPersons } from '@/services/api/persons/personService';
// import Button from '@/components/UI/Button/Button';

export async function generateStaticParams() {
  // const token = cookies().get('token')?.value
  const response = await getAllPersons();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return response.rows.map((persons: { id: any; }) => persons.id);
}


const page = async () => {
  const persons = await getAllPersons();

  return (
    <div>
      пользователи
      <BaseGrid columns={productColumns} data={persons.rows} />

    </div>
  );
};

export default page;