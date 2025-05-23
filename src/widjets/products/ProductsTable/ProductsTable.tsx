'use client'
import BaseGrid from '@/widjets/BaseGrid/BaseGrid';
import React from 'react';
import { productColumns } from './columns';
// import { getAllProducts } from '@/services/api/products/productService';
import { exportExcel } from './exportExcel';
import { TProduct } from '@/services/api/products/productType';
import { Button } from '@mui/material';
import styles from './productsTable.module.css'
import { TOrderProduct } from '@/services/api/orderProducts/orderProductType';
import { getSellsByProductsLastMonth, getSellsByProductsThisMonth } from './getProductsLastMonth';
import { exportExcelMonth } from './exportExcelMonth';

type ProductsTableProps = {
  products?: TProduct[];
  orderProducts?: TOrderProduct[]
}

const ProductsTable = (props: ProductsTableProps) => {
  const { products = [], orderProducts = [] } = props;

  const lastMonth: TProduct[] = getSellsByProductsLastMonth(products, orderProducts);
  const thisMonth: TProduct[] = getSellsByProductsThisMonth(products, orderProducts);
  console.log(products);

  return (
    <div>
      <BaseGrid columns={productColumns} data={products} />
      <div className={styles.buttons}>
        <Button
          size='large'
          variant='contained'
          onClick={() => exportExcel(products, 'Товары')}
        >
          Скачать список продуктов в Excel
        </Button>
        <Button
          size='large'
          variant='contained'
          onClick={() => exportExcelMonth(lastMonth, 'Товары')}
        >
          Скачать продажи по продуктам за прошлый месяц в Excel
        </Button>
        <Button
          size='large'
          variant='contained'
          onClick={() => exportExcelMonth(thisMonth, 'Товары')}
        >
          Скачать продажи по продуктам за этот месяц в Excel
        </Button>
      </div>
    </div>
  );
};

export default ProductsTable;