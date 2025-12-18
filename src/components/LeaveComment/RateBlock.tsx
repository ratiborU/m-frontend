'use client'

import { TProduct } from '@/services/api/products/productType';
import React from 'react';
import styles from './leaveComment.module.css';
import Image from 'next/image';
import star from '../../../public/Star rate.svg'
import starGrey from '../../../public/Star rate gray filled.svg'

type LeaveCommentProps = {
  product: TProduct,
}

const RateBlock = (props: LeaveCommentProps) => {
  const { product } = props;

  return (
    <div className={styles.rateBlock}>
      <p className={styles.rate}>{product.rate}</p>
      <div className={styles.rateStars}>
        {[...Array(Number(Math.round(Number(product.rate))))].map((_x, i) => <Image key={`comment home: ${product.id} ${i}`} src={star} alt='' width={24} height={24} />)}
        {[...Array(5 - Number(Math.round(Number(product.rate))))].map((_x, i) => <Image key={`comment home: ${product.id} ${i + product.rate}`} src={starGrey} alt='' width={24} height={24} />)}
      </div>
      <p className={styles.commentsCount}>{product.commentsCount} отзывов</p>
    </div>
  );
};

export default RateBlock;