import { TFavoriteProduct } from '@/services/api/favoriteProducts/favoriteProductType';
import React from 'react';
import styles from './favorite.module.css'
import Product from '@/components/Product/Product';

type FavoriteProps = {
  favoriteProducts: TFavoriteProduct[];
}

const Favorite = (props: FavoriteProps) => {
  const { favoriteProducts } = props;
  return (
    <>
      <div className={styles.favoriteProducts}>
        {...favoriteProducts.map((x) => (
          <Product
            key={`favorite product key: ${x.id}`}
            {...(x.product)}
            favoriteProduct={x}
            isInFavorite={true}
          />
        ))}
      </div>
    </>
  );
};

export default Favorite;