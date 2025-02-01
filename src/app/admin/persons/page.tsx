import React from 'react';
// import { productsData } from '@/services/mock/mockProducts';
import { productColumns } from './columns';
import BaseGrid from '@/widjets/BaseGrid/BaseGrid';
// import Button from '@/components/UI/Button/Button';

export async function generateStaticParams() {
  const response = await fetch(`http://localhost:5000/api/persons?limit=101&page=1`, {
    next: {
      revalidate: 3600, // обновлять каждый час
      tags: ['persons']
    }
  });
  const persons = await response.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return persons.map((persons: { id: any; }) => persons.id);
}


const page = async () => {
  const response = await fetch(`http://localhost:5000/api/persons?limit=100&page=1`, {
    next: {
      revalidate: 3600, // обновлять каждый час
      tags: ['persons']
    }
  });
  const persons = await response.json();

  return (
    <div>
      пользователи
      <BaseGrid columns={productColumns} data={persons.rows} />

    </div>
  );
};

export default page;