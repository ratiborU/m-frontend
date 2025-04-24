import React from 'react';
import { cookies } from 'next/headers';
import { getAllBasketProductsByPersonId } from '@/services/api/basketProducts/basketProductService';
import Basket from '@/widjets/Basket/Basket';

const page = async () => {
  const basketProducts = await getAllBasketProductsByPersonId(cookies().get('personId')?.value || 1);

  return (
    <Basket products={basketProducts.rows} />
  );
};

export default page;