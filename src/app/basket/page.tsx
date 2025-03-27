import React from 'react';
import { cookies } from 'next/headers';
import Title from '@/components/Title/Tile';
import { getAllBasketProductsByPersonId } from '@/services/api/basketProducts/basketProductService';
import Basket from '@/widjets/Basket/Basket';

const page = async () => {
  const basketProducts = await getAllBasketProductsByPersonId(cookies().get('personId')?.value || 1);

  return (
    <>
      <div >

        <Basket products={basketProducts.rows} />
      </div>
    </>
  );
};

export default page;