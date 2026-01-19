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
  const { products = [], } = props;
  
  const [productsState, setProductsState] = useState(products);
  const [search, setSearch] = useState('');
  const [orderedFilter, setOrderedFilter] = useState('all');
  const [pack, setPack] = useState(false);

  const debounce = useDebouncedCallback(() => {
    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.name.toLowerCase().includes(search.toLowerCase()));
    if (orderedFilter == 'all') {
      setProductsState(filteredProducts);
    } else {
      setProductsState(filteredProducts.filter(p => p.orderProductsCount > 0));
    }
  }, 500)

  return (
    <div className={styles.block}>
      <div className={styles.inputs}>
        <Input inputProps={{
          placeholder: '',
          onChange: (e) => {
            setSearch(e.target.value);
            debounce();
          }
        }}
          label={'Поиск'}
          sizeInput='medium'
        />
        <SelectInput selectProps={{
          defaultValue: 'all',
          onChange: (e) => { 
            setOrderedFilter(e.target.value);
            debounce();
          }
        }}
          label={'Заказано'}
          sizeInput='small'
          options={optionsOrdered}
        />
        <Button
          size='large'
          variant={pack ? `contained` : `outlined`}
          style={{
            // width: 'calc(50% - 8px)'
          }}
          onClick={() => setPack(!pack)}
        >
          Упаковка
        </Button>

        {/* <Input inputProps={{}} label={'Поиск'} sizeInput='medium' /> */}
      </div>
      <BaseGrid columns={productColumns} data={productsState} />
      <div className={styles.buttons}>
        <Button
          size='large'
          variant='contained'
          onClick={() => exportExcel(productsState, 'Товары')}
        >
          Скачать список продуктов в Excel
        </Button>
      </div>
    </div>
  );
};

export default ProductsTable;

