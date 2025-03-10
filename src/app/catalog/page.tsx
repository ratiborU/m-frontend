import Catalog from '@/widjets/Catalog/Catalog';
import React from 'react';
import { getAllProducts } from '@/services/api/products/productService';

const page = async () => {
  const products = await getAllProducts()
  return (
    <>
      <Catalog products={products.rows} />
    </>
  );
};

export default page;