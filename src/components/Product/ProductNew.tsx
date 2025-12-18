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
  classname?: string,
}

const ProductNew = (props: IProductProps) => {
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
    classname = '',
    productsCount,
  } = props

  const [height, setHeight] = useState(403);

  useEffect(() => {
    const pElement = document.getElementById(`product card name id: ${id}`)?.clientHeight;
    const rateElement = document.getElementById(`product rate id: ${id}`)?.clientHeight || -8;
    const countElement = document.getElementById(`product count id: ${id}`)?.clientHeight || 0;
    const buttonElement = document.getElementById(`product button id: ${id}`)?.clientHeight ? 70 : 60;
    const height = 280 + Number(pElement) + Number(rateElement) + Number(countElement) + Number(buttonElement);
    setHeight(height);
  }, [id])

  return (
    <main className={styles.wrapperblock}>
      <div
        className={`${styles.mainBlock} ${classname}`}
        style={{
          height: height
        }}
      >
        <div className={`${styles.block} ${!isInMainPage ? styles.freeBlock : ''} ${!productsCount ? styles.blockNoButton : ''}`}>
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

          <div id={`product count id: ${id}`}>
            {!productsCount && <p className={styles.count}>Скоро появится в продаже</p>}
            {Number(productsCount) < 10 && Number(productsCount) > 0 && <p className={styles.count}>Осталось {productsCount} шт</p>}
          </div>

          <FavoriteButton product={props} revalidate={isInFavorite} />
          
          <div id={`product button id: ${id}`}>
            {
              !!productsCount && <CartButton
                className={styles.button}
                text={'В корзину'}
                size={'m'}
                // innerCount={count}
                product={props}
              />
            }
          </div>
        </div>
      </div>

      <div className={`${styles.mainMobileBlock} ${classname}`}>
        <div className={`${styles.block} ${!isInMainPage ? styles.freeBlock : ''}`}>
          <Link href={`/product/${id}`}>
            <Image
              className={styles.image}
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE}/${mainImage}`}
              alt=''
              width={248}
              height={248}
            />
          </Link>

          <Link href={`/product/${id}`}>
            <p className={styles.title} id={`product card name id: ${id}`}>{name}</p>
          </Link>

          <div id={`product rate id: ${id}`}>
            {
              !!commentsCount && <div className={styles.rates}>
                <Image src={star} alt='' width={20} height={20} />
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
        </div>
        <div></div>
        <CartButton
          className={styles.button}
          text={'В корзину'}
          size={'m'}
          product={props}
        />
      </div>
    </main>
  );
};

export default ProductNew;