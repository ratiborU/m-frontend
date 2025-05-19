import React from 'react';
import Favorite from '@/widjets/Favorite/Favorite';
import { getAllFavoriteProductsByPersonId } from '@/services/api/favoriteProducts/favoriteProductService';
import { cookies } from 'next/headers';
import SpecialOfferProducts from '@/widjets/SpecialOfferProducts/SpecialOfferProducts';
import { getAllRecommendations } from '@/services/api/recomendations/recomendationService';

const page = async () => {
  const favoriteProducts = await getAllFavoriteProductsByPersonId(cookies().get('personId')?.value || 0);
  const reccomendations = await getAllRecommendations();

  return (
    <>
      <div >
        <Favorite favoriteProducts={favoriteProducts || []} />
        <SpecialOfferProducts products={reccomendations || []} />
      </div>

    </>
  );
};

export default page;