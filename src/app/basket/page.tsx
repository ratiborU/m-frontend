import React from 'react';
import { cookies } from 'next/headers';
import { getAllBasketProductsByPersonId } from '@/services/api/basketProducts/basketProductService';
import Basket from '@/widjets/Basket/Basket';
import { getLoyalty } from '@/services/api/loyalty/loyaltyService';
import SpecialOfferProducts from '@/widjets/SpecialOfferProducts/SpecialOfferProducts';
import { getAllRecommendations } from '@/services/api/recomendations/recomendationService';

const page = async () => {
  const basketProducts = await getAllBasketProductsByPersonId(cookies().get('personId')?.value || 1);
  // const loyalty = await getLoyalty();
  const reccomendations = await getAllRecommendations();

  return (
    <>
      <Basket products={basketProducts.rows} />
      <SpecialOfferProducts products={reccomendations || []} />
    </>

  );
};

export default page;