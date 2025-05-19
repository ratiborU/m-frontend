import React from 'react';
import Order from '@/widjets/Order/Order';
import { getOnePerson } from '@/services/api/persons/personService';
import { getAllBasketProductsByPersonId } from '@/services/api/basketProducts/basketProductService';
import { cookies } from 'next/headers';
import { checkOneCoupon } from '@/services/api/coupons/couponService';

const page = async () => {
  const person = await getOnePerson(cookies().get('personId')?.value || 0);
  const basketProducts = await getAllBasketProductsByPersonId(cookies().get('personId')?.value || 0);
  // const coupon = await checkOneCoupon('ninamed10');
  // console.log(coupon);


  return (
    <>
      <Order person={person} products={basketProducts.rows} />
    </>
  );
};

export default page;