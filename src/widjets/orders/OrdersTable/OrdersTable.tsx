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
import { getOrdersLastMonth, getOrdersThisMonth, getOrdersToSend, getProductsToSend } from './getOrdersLastMonth';
import { exportExcelProductsToSend } from './exportExcelProducts';

type OrdersTableProps = {
  orders?: TOrder[];
}

const OrdersTable = (props: OrdersTableProps) => {
  const { orders = [] } = props;

  const lastMonth = getOrdersLastMonth(orders);
  const thisMonth = getOrdersThisMonth(orders);
  const productsToSend = getProductsToSend(orders);
  const ordersToSend = getOrdersToSend(orders);

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
          onClick={() => exportExcel(lastMonth, 'Заказы')}
        >
          Скачать отчет за прошлый месяц в Excel
        </Button>
        <Button
          size='large'
          variant='contained'
          onClick={() => exportExcel(thisMonth, 'Заказы')}
        >
          Скачать отчет за текущий месяц в Excel
        </Button>
        <Button
          size='large'
          variant='contained'
          onClick={() => exportExcelProductsToSend(productsToSend, 'Заказы')}
        >
          Скачать список товаров к отправке в Excel
        </Button>
        <Button
          size='large'
          variant='contained'
          onClick={() => exportExcel(ordersToSend, 'Заказы')}
        >
          Скачать список заказов к отправек в Excel
        </Button>
      </div>
    </div>
  );
};

export default OrdersTable;