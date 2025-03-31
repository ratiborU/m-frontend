import { TFavoriteProduct } from '@/services/api/favoriteProducts/favoriteProductType';
import React from 'react';
import styles from './favorite.module.css'
import Product from '@/components/Product/Product';
import Title from '@/components/Title/Tile';

type FavoriteProps = {
  favoriteProducts: TFavoriteProduct[];
}

const Favorite = (props: FavoriteProps) => {
  const { favoriteProducts } = props;
  console.log(favoriteProducts);
  return (
    <>
      <div className={styles.wrapper}>
        <Title text={'Избранное'} margin={false} />
        <div className={styles.favoriteProducts}>
          {...favoriteProducts?.map((x) => (
            <Product
              key={`favorite product key: ${x.id}`}
              {...(x.product)}
              favoriteProduct={x}
              isInFavorite={true}
            />
          ))}
        </div>
      </div>

    </>
  );
};

export default Favorite;