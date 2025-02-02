import React from 'react';
// import { productsData } from '@/services/mock/mockProducts';
import { productColumns } from './columns';
import BaseGrid from '@/widjets/BaseGrid/BaseGrid';
import { cookies } from 'next/headers';
// import Button from '@/components/UI/Button/Button';

export async function generateStaticParams() {
  const token = cookies().get('token')?.value
  const response = await fetch(`http://localhost:5000/api/persons?limit=101&page=1`, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    // cache: 'no-cache',
    next: {
      // revalidate: 3600, // обновлять каждый час
      tags: ['persons']
    }
  });
  const persons = await response.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return persons.map((persons: { id: any; }) => persons.id);
}


const page = async () => {
  const token = cookies().get('access')?.value
  console.log(token);
  const response = await fetch(`http://localhost:5000/api/persons?limit=100&page=1`, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    cache: 'no-cache',
    next: {
      // revalidate: 3600, // обновлять каждый час

      tags: ['persons']
    }
  });
  const persons = await response.json();
  console.log(persons);
  return (
    <div>
      пользователи
      <BaseGrid columns={productColumns} data={persons.rows} />

    </div>
  );
};

export default page;