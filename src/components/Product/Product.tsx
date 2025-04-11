'use client'
import { TProduct } from '@/services/api/products/productType';
import React, { useEffect, useState } from 'react';
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

  const [height, setHeight] = useState(403);

  useEffect(() => {
    const pElement = document.getElementById(`product card name id: ${id}`)?.clientHeight;
    const rateElement = document.getElementById(`product rate id: ${id}`)?.clientHeight || 0;
    if (!rateElement) {
      setHeight(351 + Number(pElement) + Number(rateElement) - 8)
    } else {
      setHeight(351 + Number(pElement) + Number(rateElement))
    }
  }, [id])

  return (
    <div
      className={styles.mainBlock}
      style={{
        height: height
      }}
    >
      <div className={`${styles.block} ${!isInMainPage ? styles.freeBlock : ''}`}>
        <Link href={`/product/${id}`}>
          <Image className={styles.image} src={`${process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE}/${mainImage}`} alt='' width={248} height={248} />
        </Link>

        <Link href={`/product/${id}`}>
          <p className={styles.title} id={`product card name id: ${id}`}>{name}</p>
        </Link>

        <div id={`product rate id: ${id}`}>
          {
            !!commentsCount && <div className={styles.rates}>
              <Image src={star} alt='' width={24} height={24} />
              <p className={styles.rate}>{rate}</p>
              <p className={styles.comments}>{commentsCount} отзыва</p>
            </div>
          }

        </div>

        <div className={styles.prices}>
          <p className={styles.newPrice}>{Number(price) - Number(discount)} ₽</p>
          <p className={styles.price}>{discount != '0' ? `${price} ₽` : ''}</p>
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