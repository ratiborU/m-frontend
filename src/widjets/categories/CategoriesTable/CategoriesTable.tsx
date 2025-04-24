import BaseGrid from '@/widjets/BaseGrid/BaseGrid';
import React from 'react';
import { productColumns } from './columns';
import { getAllCategories } from '@/services/api/categories/categoryService';

const CategoriesTable = async () => {
  const products = await getAllCategories();

  return (
    <div>
      <BaseGrid columns={productColumns} data={products.rows} />
    </div>
  );
};

export default CategoriesTable;