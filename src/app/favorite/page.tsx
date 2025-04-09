import React from 'react';
import Favorite from '@/widjets/Favorite/Favorite';
import { getAllFavoriteProductsByPersonId } from '@/services/api/favoriteProducts/favoriteProductService';
import { cookies } from 'next/headers';

const page = async () => {
  const favoriteProducts = await getAllFavoriteProductsByPersonId(cookies().get('personId')?.value || 0);

  return (
    <>
      <div >
        <Favorite favoriteProducts={favoriteProducts || []} />
      </div>

    </>
  );
};

export default page;