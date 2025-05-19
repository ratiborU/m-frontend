import React from 'react';
import EditCategory from '@/widjets/categories/EditCategory/EditCategory';
import { getOneCategory } from '@/services/api/categories/categoryService';

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const category = await getOneCategory(id)

  return (
    <div>
      <EditCategory {...category} />
    </div>
  );
};

export default page;