'use client'
import BaseGrid from '@/widjets/BaseGrid/BaseGrid';
import React from 'react';
import { orderColumns } from './columns';
import { getAllOrders } from '@/services/api/orders/orderService';
import { Button } from '@mui/material';
import styles from './ordersTable.module.css'
// import { exportExcel } from '@/lib/helpers/exportExcel';
import { TOrder } from '@/services/api/orders/orderType';
import { exportExcel } from './exportExcel';

type OrdersTableProps = {
  orders?: TOrder[];
}

const OrdersTable = (props: OrdersTableProps) => {
  const { orders = [] } = props;

  // console.log(orders);

  return (
    <div>
      <BaseGrid columns={orderColumns} data={orders} />
      <div className={styles.buttons}>
        <Button
          size='large'
          variant='contained'
          onClick={() => exportExcel(orders, 'Заказы')}
        >
          Скачать историю заказов в Excel
        </Button>
        <Button
          size='large'
          variant='contained'
          onClick={() => exportExcel(orders, 'Заказы')}
        >
          Скачать отчет за прошлый месяц в Excel
        </Button>
      </div>
    </div>
  );
};

export default OrdersTable;