import { TProduct } from '@/services/api/products/productType';
import { TPagination } from '@/services/types/paginationType';
import Catalog from '@/widjets/Catalog/Catalog';
import React from 'react';
// import { getAllProducts } from '@/services/api/products/productService';

const page = async () => {
  // const products = await getAllProducts();
  const products: TPagination<TProduct> = await fetch(`${process.env.BACKEND_URL}/products`)
    .then(data => data.json())

  return (
    <>
      <Catalog products={products.rows || []} />
    </>
  );
};

export default page;