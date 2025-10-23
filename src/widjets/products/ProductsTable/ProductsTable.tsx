'use client'
import BaseGrid from '@/widjets/BaseGrid/BaseGrid';
import React, { useState } from 'react';
import { productColumns } from './columns';
// import { getAllProducts } from '@/services/api/products/productService';
import { exportExcel } from './exportExcel';
import { TProduct } from '@/services/api/products/productType';
import { Button } from '@mui/material';
import styles from './productsTable.module.css'
import { TOrderProduct } from '@/services/api/orderProducts/orderProductType';
// import { getSellsByProductsLastMonth, getSellsByProductsThisMonth } from './getProductsLastMonth';
// import { exportExcelMonth } from './exportExcelMonth';
// import { useCreateProductsFromApiMutation } from '@/hooks/moiSklad/useCreateProductsFromApiMutation';
import Input from '@/components/UI/Input/Input';
import SelectInput from '@/components/UI/SelectInput/SelectInput';
import { useDebouncedCallback } from 'use-debounce';

type ProductsTableProps = {
  products?: TProduct[];
  orderProducts?: TOrderProduct[]
}

const optionsOrdered = [
  { value: "all", text: "Все варианты" },
  { value: "ordered", text: "Заказано" },
]

const ProductsTable = (props: ProductsTableProps) => {
  const { products = [], orderProducts = [] } = props;

  const [productsState, setProductsState] = useState(products);

  const debounceSearch = useDebouncedCallback(() => {
    // setFilter.setCategoryId(String(filterState.categoryId));
    // setFilter.setStartPrice(filterState.startPrice);
    // setFilter.setEndPrice(filterState.endPrice);
    // setFilter.setParameters({ ...filterState.parameters });
  }, 500)

  return (
    <div className={styles.block}>
      <div className={styles.inputs}>
        <Input inputProps={{
          placeholder: '',
          onChange: () => { }
        }}
          label={'Поиск'}
          sizeInput='medium'
        />
        <SelectInput selectProps={{
          defaultValue: 'all',
          onChange: () => { }
        }}
          label={'Заказано'}
          sizeInput='small'
          options={optionsOrdered}
        />


        {/* <Input inputProps={{}} label={'Поиск'} sizeInput='medium' /> */}
      </div>
      <BaseGrid columns={productColumns} data={products} />
      <div className={styles.buttons}>
        <Button
          size='large'
          variant='contained'
          onClick={() => exportExcel(products, 'Товары')}
        >
          Скачать список продуктов в Excel
        </Button>
      </div>
    </div>
  );
};

export default ProductsTable;

