'use client'
import BaseGrid from '@/widjets/BaseGrid/BaseGrid';
import React from 'react';
import { orderColumns } from './columns';
// import { getAllOrders } from '@/services/api/orders/orderService';
import { Button } from '@mui/material';
import styles from './ordersTable.module.css'
// import { exportExcel } from '@/lib/helpers/exportExcel';
import { TOrder } from '@/services/api/orders/orderType';
import { exportExcel } from './exportExcel';
import Input from '@/components/UI/Input/Input';
import SelectInput from '@/components/UI/SelectInput/SelectInput';
// import { getOrdersLastMonth, getOrdersThisMonth, getOrdersToSend, getProductsToSend } from './getOrdersLastMonth';
// import { exportExcelProductsToSend } from './exportExcelProducts';

type OrdersTableProps = {
  orders?: TOrder[];
}

const optionsOrdered = [
  { value: "all", text: "Сначала новые" },
  { value: "ordered", text: "Сначала старые" },
]

const optionsStatus = [
  { value: "all", text: "Ожидает оплаты" },
  { value: "ordered", text: "Подтверждено" },
]

const OrdersTable = (props: OrdersTableProps) => {
  const { orders = [] } = props;

  // const lastMonth = getOrdersLastMonth(orders);
  // const thisMonth = getOrdersThisMonth(orders);
  // const productsToSend = getProductsToSend(orders);
  // const ordersToSend = getOrdersToSend(orders);

  return (
    <div className={styles.block}>
      <div className={styles.inputs}>
        <Input inputProps={{
          placeholder: ''
        }}
          label={'Поиск'}
          sizeInput='medium'
        />
        <SelectInput selectProps={{
          defaultValue: 'all'
        }}
          label={'Дата заказа'}
          sizeInput='small'
          options={optionsOrdered}
        />
        <SelectInput selectProps={{
          defaultValue: 'all'
        }}
          label={'Статус'}
          sizeInput='small'
          options={optionsStatus}
        />
      </div>
      <BaseGrid columns={orderColumns} data={orders} />
      <div className={styles.buttons}>
        <Button
          size='large'
          variant='contained'
          onClick={() => exportExcel(orders, 'Заказы')}
        >
          Скачать историю заказов в Excel
        </Button>
      </div>
    </div>
  );
};

export default OrdersTable;