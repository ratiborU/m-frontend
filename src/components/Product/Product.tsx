'use client'
import { TProduct } from '@/services/api/products/productType';
import React from 'react';
import styles from './product.module.css'
import Image from 'next/image';
import star from '../../../public/Star rate.svg'
import Link from 'next/link';

const Product = (props: TProduct) => {
  const { id, name, commentsCount, rate, price, discount, mainImage } = props
  return (
    <div className={styles.block}>
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
    </div>
  );
};

export default Product;