'use client'
import { TProduct } from '@/services/api/products/productType';
import React from 'react';
import styles from './product.module.css'
import Image from 'next/image';
import star from '../../../public/Star rate.svg'
import Link from 'next/link';
import CartButton from '../UI/CartButton/CartButton';
import FavoriteButton from '../UI/FavoriteButton/FavoriteButton';

interface IProductProps extends TProduct {
  isInMainPage?: boolean,
  isFavorite?: boolean,
  count?: number,
  isInFavorite?: boolean,
}

const Product = (props: IProductProps) => {
  const {
    id,
    name,
    commentsCount,
    rate,
    price,
    discount,
    mainImage,
    isInMainPage = false,
    isInFavorite = false,
    // isFavorite = false,
    // count = 0,
  } = props

  return (
    <div className={styles.mainBlock}>
      <div className={`${styles.block} ${!isInMainPage ? styles.freeBlock : ''}`}>
        <Link href={`/catalog/${id}`}>
          <Image className={styles.image} src={`http://localhost:5000/${mainImage}`} alt='' width={248} height={248} />
        </Link>

        <Link href={`/catalog/${id}`}>
          <p className={styles.title}>{name}</p>
        </Link>
        {/* если отзывов нет то не показывать */}
        <div className={styles.rates}>
          <Image src={star} alt='' width={24} height={24} />
          <p className={styles.rate}>{rate}</p>
          <p className={styles.comments}>{commentsCount} отзыва</p>
        </div>
        <div className={styles.prices}>
          <p className={styles.newPrice}>{Number(price) - Number(discount)} ₽</p>
          <p className={styles.price}>{price}  ₽</p>
        </div>

        <FavoriteButton product={props} revalidate={isInFavorite} />

        <CartButton
          className={styles.button}
          text={'В корзину'}
          size={'m'}
          // innerCount={count}
          product={props}
        />
      </div>

    </div>

  );
};

export default Product;