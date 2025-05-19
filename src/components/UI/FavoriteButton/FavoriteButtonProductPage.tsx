'use client'
import React, { useState } from 'react';
import favorite from '../../../../public/favorite_red.svg'
import favoriteBorder from '../../../../public/favorite_border_24dp_888888 white background.svg'
import styles from './favoriteButton.module.css'
import Image from 'next/image';
import { useCreateFavoriteProductMutation } from '@/hooks/favoriteProducts/useCreateFavoriteProductMutation';
import { usePersonContext } from '@/providers/PersonProvider/hooks/usePersonContext';
// import { useDeleteFavoriteProductMutation } from '@/hooks/favoriteProducts/useDeleteFavoriteProductMutation';
import { useDeleteFavoriteProductByIdsMutation } from '@/hooks/favoriteProducts/useDeleteFavoriteProductByIdsMutation';
import { TProduct } from '@/services/api/products/productType';
import { useDebouncedCallback } from 'use-debounce';
import { useCreateFavoriteProductNoRevalidateMutation } from '@/hooks/favoriteProducts/useCreateFavoriteProductNoRevalidateMutation';
import { useDeleteFavoriteProductNoRevalidateMutation } from '@/hooks/favoriteProducts/useDeleteFavoriteProductNoRevalidateMutation';

type FavoriteButtonProps = {
  onClick?: () => void,
  product: TProduct,
  revalidate?: boolean,
}

const FavoriteButtonProductPage = (props: FavoriteButtonProps) => {
  const { product, revalidate } = props;
  const [isActivated, setIsActivated] = useState(!!product.favoriteProduct);
  const person = usePersonContext();
  const { createFavoriteProduct } = useCreateFavoriteProductMutation({});
  const { deleteFavoriteProductByIds } = useDeleteFavoriteProductByIdsMutation({});
  const { createFavoriteProductNoRevalidate } = useCreateFavoriteProductNoRevalidateMutation({});
  const { deleteFavoriteProductNoRevalidate } = useDeleteFavoriteProductNoRevalidateMutation({});

  const debounced = useDebouncedCallback(async (value: boolean) => {
    if (revalidate) {
      if (!value) {
        await createFavoriteProductNoRevalidate({
          productId: product.id,
          personId: person.id
        });
      } else {
        await deleteFavoriteProductNoRevalidate(product.favoriteProduct!.id || '0');
      }
    } else {
      if (!value) {
        await createFavoriteProduct({
          productId: product.id,
          personId: person.id
        });
      } else {
        await deleteFavoriteProductByIds({
          productId: product.id,
          personId: person.id
        });
      }
    }

  }, 500);

  const onClickButton = async () => {
    setIsActivated(!isActivated)
    debounced(isActivated);
  }

  return (
    <button
      className={styles.favoriteProduct}
      onClick={onClickButton}
    >
      <Image className={styles.image} src={isActivated ? favorite : favoriteBorder} alt={''} width={32} height={32} />
    </button>
  );
};

export default FavoriteButtonProductPage;