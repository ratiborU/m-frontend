import React from 'react';
import Order from '@/widjets/Order/Order';
import { getOnePerson } from '@/services/api/persons/personService';
import { getAllBasketProductsByPersonId } from '@/services/api/basketProducts/basketProductService';
import { cookies } from 'next/headers';

const page = async () => {
  const person = await getOnePerson(cookies().get('personId')?.value || 0);
  const basketProducts = await getAllBasketProductsByPersonId(cookies().get('personId')?.value || 0);

  return (
    <>
      <Order person={person} products={basketProducts.rows} />
    </>
  );
};

export default page;