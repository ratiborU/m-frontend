import { getHistoryProductsByPersonId } from '@/services/api/historyProducts/historyProductService';
import ProfileProducts from '@/widjets/profilePages/Products/ProfileProducts';
import { cookies } from 'next/headers';
import React from 'react';

const page = async () => {
  const products = await getHistoryProductsByPersonId(cookies().get('personId')?.value || 0);

  return (
    <ProfileProducts products={products.filter(x => x.count != '0')} />
  );
};

export default page;