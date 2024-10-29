import React from 'react';
// import { productsData } from '@/services/mock/mockProducts';
import { productColumns } from './columns';
import BaseGrid from '@/widjets/BaseGrid/BaseGrid';
// import Button from '@/components/UI/Button/Button';

export async function generateStaticParams() {
  const response = await fetch(`http://localhost:5000/api/products?limit=101&page=1`, {
    next: {
      revalidate: 3600, // обновлять каждый час
      tags: ['products']
    }
  });
  const products = await response.json();
  console.log(products);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return products.map((products: { id: any; }) => products.id);
}

const page = async () => {
  const response = await fetch(`http://localhost:5000/api/products?limit=100&page=1`, {
    next: {
      revalidate: 3600, // обновлять каждый час
      tags: ['products']
    }
  });
  const products = await response.json();

  return (
    <div>
      <BaseGrid columns={productColumns} data={products.rows} />

    </div>
  );
};

export default page;