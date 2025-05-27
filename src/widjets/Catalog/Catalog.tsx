'use client'
import React from 'react';
import Filter from '@/components/Filter/Filter';
import Sorter from '@/components/Sorter/Sorter';
import styles from './catalog.module.css'
import { TProduct } from '@/services/api/products/productType';
import Product from '@/components/Product/Product';
// import { useCatalogFilterContext } from '@/providers/CatalogFilterProvider/hooks/useCatalogFilterContxt';
import { useCatalogSortContext } from '@/providers/CatalogSortProvider/hooks/useCatalogSortContext';
import SorterMobile from '@/components/Sorter/SorterMobile';
import FilterMobile from '@/components/Filter/FilterMobile';
import { useFilterContext } from '@/providers/NewFilterProvider/hooks/useFilterContxt';

type CatalogProps = {
  products: TProduct[]
}

const Catalog = (props: CatalogProps) => {
  const { products } = props;

  const filter = useFilterContext();
  const sort = useCatalogSortContext()

  const filteredProducts = products
    .filter(product => {
      if (filter.categoryId != product.categoryId && filter.categoryId != '') {
        return false;
      }

      if ((Number(product.price) - Number(product.discount)) < filter.startPrice ||
        (Number(product.price) - Number(product.discount)) > filter.endPrice) {
        return false;
      }

      if (filter.parameters) {
        for (const parameterKey of Object.keys(filter.parameters)) {
          // @ts-expect-error any
          if (filter.parameters[parameterKey] && product.categoryCharacteristics && filter.parameters[parameterKey].length != 0 && !filter.parameters[parameterKey].includes(product.categoryCharacteristics[parameterKey])) {
            return false;
          }
        }
      }
      // if (!filter.material.includes(product.material || '') && filter.material.length > 0) {
      //   return false
      // }
      // if (!filter.shape.includes(product.fasteningType || '') && filter.shape.length > 0) {
      //   return false
      // }
      // if (!filter.size.includes(product.size || '') && filter.size.length > 0) {
      //   return false
      // }
      // Добавить фильтрацию по 
      // материалу, форме и размеру
      return true
    })
    .sort((a, b) => {
      if (sort.sort == 'popular') {
        return Number(b.commentsCount) - Number(a.commentsCount)
      } else if (sort.sort == 'rate') {
        return Number(b.rate) - Number(a.rate)
      } else if (sort.sort == 'rasePrice') {
        return Number(a.price) - Number(a.discount) - Number(b.price) + Number(b.discount)
      } else if (sort.sort == 'decreasePrice') {
        return Number(b.price) - Number(b.discount) - Number(a.price) + Number(a.discount)
      }
      return 1
    });

  // const filteredProducts = products
  //   .filter(product => {
  //     if (!filter.categoryIds.includes(product.category.name) && filter.categoryIds.length > 0) {
  //       return false
  //     }
  //     if ((Number(product.price) - Number(product.discount)) < filter.startPrice ||
  //       (Number(product.price) - Number(product.discount)) > filter.endPrice) {
  //       return false;
  //     }
  //     if (!filter.material.includes(product.material || '') && filter.material.length > 0) {
  //       return false
  //     }
  //     if (!filter.shape.includes(product.fasteningType || '') && filter.shape.length > 0) {
  //       return false
  //     }
  //     if (!filter.size.includes(product.size || '') && filter.size.length > 0) {
  //       return false
  //     }
  //     // Добавить фильтрацию по 
  //     // материалу, форме и размеру
  //     return true
  //   })
  //   .sort((a, b) => {
  //     if (sort.sort == 'popular') {
  //       return Number(b.commentsCount) - Number(a.commentsCount)
  //     } else if (sort.sort == 'rate') {
  //       return Number(b.rate) - Number(a.rate)
  //     } else if (sort.sort == 'rasePrice') {
  //       return Number(a.price) - Number(a.discount) - Number(b.price) + Number(b.discount)
  //     } else if (sort.sort == 'decreasePrice') {
  //       return Number(b.price) - Number(b.discount) - Number(a.price) + Number(a.discount)
  //     }
  //     return 1
  //   })

  return (
    <div className={styles.catalog}>
      <Filter />
      <div className={styles.catalogBlock}>
        <Sorter />
        <div className={styles.filterAndSort}>
          <FilterMobile />
          <SorterMobile />
        </div>
        <div className={styles.products}>
          {...filteredProducts?.map(x => <Product key={`catalog product: ${x.id}`} {...x} />)}
        </div>
      </div>
    </div>
  );
};

export default Catalog;