import React from 'react';
import { cookies } from 'next/headers';
import { getAllBasketProductsByPersonId } from '@/services/api/basketProducts/basketProductService';
import Basket from '@/widjets/Basket/Basket';
import { getLoyalty } from '@/services/api/loyalty/loyaltyService';

const page = async () => {
  const basketProducts = await getAllBasketProductsByPersonId(cookies().get('personId')?.value || 1);
  const loyalty = await getLoyalty();

  return (
    <Basket products={basketProducts.rows} loyalty={loyalty} />
  );
};

export default page;