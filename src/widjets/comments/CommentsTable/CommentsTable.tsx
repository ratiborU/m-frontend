import BaseGrid from '@/widjets/BaseGrid/BaseGrid';
import React from 'react';
import { productColumns } from './columns';
import { getAllComments } from '@/services/api/comments/commentService';

const CommentsTable = async () => {
  const products = await getAllComments();

  return (
    <div>
      <BaseGrid columns={productColumns} data={products.rows} />
    </div>
  );
};

export default CommentsTable;