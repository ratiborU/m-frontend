import React from 'react';
import ProductsTable from '@/widjets/products/ProductsTable/ProductsTable';

export async function generateStaticParams() {
  const response = await fetch(`http://localhost:5000/api/products?limit=100&page=1`, {
    next: {
      revalidate: 3600, // обновлять каждый час
      tags: ['products']
    }
  });
  const products = await response.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return products.map((products: { id: any; }) => products.id);
}

const page = () => {
  return (
    <ProductsTable />
  );
};

export default page;