'use client'
import { TImage } from '@/services/api/images/imageType';
import { TProduct } from '@/services/api/products/productType';
import React, { useState } from 'react';
import styles from './product.module.css'
import Image from 'next/image';
import BasketToOrderCard from '@/components/BasketToOrderCard/BasketToOrderCard';
import star from '../../../public/Star rate.svg'
import starGrey from '../../../public/Star rate gray filled.svg'
import NameAndProperty from '@/components/UI/NameAndProperty/NameAndProperty';
import { TComment } from '@/services/api/comments/commentType';
import Product from '@/components/Product/Product';
import ProductCard from '@/components/ProductCard/ProductCard';
import Comment from '@/components/Comment/Comment';
import LeaveComment from '@/components/LeaveComment/LeaveComment';
import Gallery from '@/components/Gallery/Gallery';

export interface ProductProps {
  product: TProduct,
  images: TImage[],
  simularProducts?: TProduct[],
  comments?: TComment[],
  comment?: TComment,
}

const ProductWidget = (props: ProductProps) => {
  const { product, images, simularProducts = [], comments, comment } = props;

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const characteristics = product.characteristics.split('\r\n').map(x => x.split(': '));
  const galeryImages = [`http://localhost:5000/${product.mainImage}`, ...images.map(x => `http://localhost:5000/${x.path}`)]

  const onGalleryOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsGalleryOpen(true);
    document.getElementById('dark-window')!.addEventListener("click", onGalleryClose);
    document.body.style.overflow = 'hidden';
  }

  const onGalleryClose = () => {
    setIsGalleryOpen(false);
    document.getElementById('dark-window')!.removeEventListener("click", onGalleryClose);
    document.body.style.overflow = 'scroll'
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <div className={styles.firstBlock}>
            <div className={styles.images}>
              <Image
                src={`http://localhost:5000/${product.mainImage}`}
                onClick={onGalleryOpen}
                alt={''}
                width={400}
                height={400}
                className={styles.image}
              />

              <div className={styles.miniImages}>
                {
                  ...images.slice(0, 4).map(x => (
                    <Image
                      src={`http://localhost:5000/${x.path}`}
                      className={styles.image}
                      onClick={onGalleryOpen}
                      alt={''}
                      width={90}
                      height={90}
                    />
                  ))
                }
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.titleBlock}>
                <h1 className={styles.title}>{product.name}</h1>
                <div className={styles.infoBlock}>
                  <p className={styles.price}>{product.price} ₽</p>
                  <div className={styles.rateBlock}>
                    <p className={styles.rate}>{product.rate}</p>
                    <div className={styles.rateStars}>
                      {[...Array(Number(Math.round(Number(product.rate))))].map((_x, i) => <Image key={`comment home: ${product.id} ${i}`} src={star} alt='' width={24} height={24} />)}
                      {[...Array(5 - Number(Math.round(Number(product.rate))))].map((_x, i) => <Image key={`comment home: ${product.id} ${i + product.rate}`} src={starGrey} alt='' width={24} height={24} />)}
                    </div>
                    <p className={styles.commentsCount}>{product.commentsCount} отзывов</p>
                  </div>

                </div>
              </div>
              <div className={styles.aboutblock}>
                <h2 className={styles.aboutTitle}>О товаре</h2>
                {product.description.split('\r\n').filter(x => x != '').map((x, i) => (
                  <p key={`description paragraph: ${i}`} className={styles.aboutDescription}>{x}</p>
                ))}
              </div>
            </div>
            <ProductCard product={product} />
          </div>

          <div className={styles.characteristics}>
            <h2 className={styles.characteristicsTitle}>Характеристики</h2>
            <div className={styles.characteristicsCloumns}>
              <div className={styles.characteristicsList}>
                {characteristics.filter((_x, i) => i % 2 == 0).map((x, i) => (
                  <NameAndProperty key={`characteristic key: ${product.id} ${i}`} name={x[0]} value={x[1]} />
                ))}
              </div>
              <div className={styles.characteristicsList}>
                {characteristics.filter((_x, i) => i % 2 == 1).map((x, i) => (
                  <NameAndProperty key={`characteristic key: ${product.id} ${i}`} name={x[0]} value={x[1]} />
                ))}
              </div>
            </div>
          </div>

          <div className={styles.sameProducts}>
            <h2 className={styles.characteristicsTitle}>Похожие товары</h2>
            <div className={styles.simularProducts}>
              {...simularProducts.map(x => <Product key={`simular product ${product.id}: ${x.id}`} {...x} />)}
            </div>
          </div>
          <div className={styles.comments}>
            <div>
              <h2 className={styles.commentsTitle}>Отзывы</h2>
              <div className={styles.commentsBlock}>
                {...comments!.map(x => (
                  <Comment key={`comment for product: ${product.id} ${x.id}`} {...x} />
                ))}
              </div>
            </div>
            <LeaveComment product={product} comment={comment} />

          </div>
        </div>
      </div>

      <Gallery isVisible={isGalleryOpen} images={galeryImages} />
    </>
  );
};

export default ProductWidget;