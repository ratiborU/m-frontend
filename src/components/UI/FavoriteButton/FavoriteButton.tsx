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

type FavoriteButtonProps = {
  onClick?: () => void,
  product: TProduct
}

const FavoriteButton = (props: FavoriteButtonProps) => {
  const { product } = props;
  const [isActivated, setIsActivated] = useState(!!product.favoriteProduct);
  const person = usePersonContext();
  const { createFavoriteProduct } = useCreateFavoriteProductMutation({});
  const { deleteFavoriteProductByIds } = useDeleteFavoriteProductByIdsMutation({});

  const debounced = useDebouncedCallback(async (value: boolean) => {
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
  }, 500);

  const onClickButton = async () => {
    setIsActivated(!isActivated)
    debounced(isActivated);
  }

  return (
    <button
      className={styles.favorite}
      onClick={onClickButton}
    >
      <Image className={styles.image} src={isActivated ? favorite : favoriteBorder} alt={''} width={32} height={32} />
    </button>
  );
};

export default FavoriteButton;