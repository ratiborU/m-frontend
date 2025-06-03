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
import { useCreateProductsFromApiMutation } from '@/hooks/moiSklad/useCreateProductsFromApiMutation';

type ProductsTableProps = {
  products?: TProduct[];
  orderProducts?: TOrderProduct[]
}

const ProductsTable = (props: ProductsTableProps) => {
  const { products = [], orderProducts = [] } = props;

  console.log(orderProducts);

  const lastMonth: TProduct[] = getSellsByProductsLastMonth(products, orderProducts);
  const thisMonth: TProduct[] = getSellsByProductsThisMonth(products, orderProducts);

  const { createProducts } = useCreateProductsFromApiMutation({});

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
          Скачать продажи за прошлый месяц в Excel
        </Button>
        <Button
          size='large'
          variant='contained'
          onClick={() => exportExcelMonth(thisMonth, 'Товары')}
        >
          Скачать продажи за этот месяц в Excel
        </Button>
        <Button
          size='large'
          variant='contained'
          onClick={async () => await createProducts()}
        >
          Обновить товары
        </Button>
        {/* <Button
          size='large'
          variant='contained'
          onClick={() => alert('обновить остатки')}
        >
          Обновить остатки
        </Button> */}
      </div>
    </div>
  );
};

export default ProductsTable;