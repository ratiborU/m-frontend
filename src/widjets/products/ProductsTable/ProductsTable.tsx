import BaseGrid from '@/widjets/BaseGrid/BaseGrid';
import React from 'react';
import { productColumns } from './columns';
import { getAllProducts } from './action';

const ProductsTable = async () => {
  const products = await getAllProducts();

  return (
    <div>
      <BaseGrid columns={productColumns} data={products.rows} />
    </div>
  );
};

export default ProductsTable;