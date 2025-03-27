import React from 'react';
import Favorite from '@/widjets/Favorite/Favorite';
import { getAllFavoriteProductsByPersonId } from '@/services/api/favoriteProducts/favoriteProductService';
import { cookies } from 'next/headers';
import Title from '@/components/Title/Tile';

const page = async () => {
  const favoriteProducts = await getAllFavoriteProductsByPersonId(cookies().get('personId')?.value || 1);
  return (
    <>
      <div >
        <Favorite favoriteProducts={favoriteProducts.rows} />
      </div>

    </>
  );
};

export default page;