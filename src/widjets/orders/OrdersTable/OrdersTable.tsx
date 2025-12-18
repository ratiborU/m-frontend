'use client'
import BaseGrid from '@/widjets/BaseGrid/BaseGrid';
import React, { useState } from 'react';
import { orderColumns } from './columns';
// import { getAllOrders } from '@/services/api/orders/orderService';
import { Button } from '@mui/material';
import styles from './ordersTable.module.css'
// import { exportExcel } from '@/lib/helpers/exportExcel';
import { TOrder } from '@/services/api/orders/orderType';
import { exportExcel } from './exportExcel';
import Input from '@/components/UI/Input/Input';
import SelectInput from '@/components/UI/SelectInput/SelectInput';
import { useDebouncedCallback } from 'use-debounce';
// import { getOrdersLastMonth, getOrdersThisMonth, getOrdersToSend, getProductsToSend } from './getOrdersLastMonth';
// import { exportExcelProductsToSend } from './exportExcelProducts';

type OrdersTableProps = {
  orders?: TOrder[];
}

const optionsOrdered = [
  { value: "new", text: "Сначала новые" },
  { value: "old", text: "Сначала старые" },
]

const optionsStatus = [
  { value: "all", text: "Все" },
  { value: "Ожидает оплаты", text: "Ожидает оплаты" },
  { value: "Подтвержден", text: "Подтвержден" },
  { value: "Собран", text: "Собран" },
  { value: "В пути", text: "В пути" },
  { value: "Доставлен", text: "Доставлен" },
  { value: "Возврат", text: "Возврат" },
  { value: "Отменен", text: "Отменен" },
]

const OrdersTable = (props: OrdersTableProps) => {
  const { orders = [] } = props;

  // const lastMonth = getOrdersLastMonth(orders);
  // const thisMonth = getOrdersThisMonth(orders);
  // const productsToSend = getProductsToSend(orders);
  // const ordersToSend = getOrdersToSend(orders);

  const [ordersState, setOrdersState] = useState(orders);
  const [search, setSearch] = useState('');
  const [dateSorter, setDateSorter] = useState('new');
  const [statusFilter, setStatusFilter] = useState('all');
  const [pack, setPack] = useState(false);
  
  const debounce = useDebouncedCallback(() => {
    const filteredOrders = orders.filter(p => 
      p.person?.firstName.toLowerCase().includes(search.toLowerCase()) || 
      p.person?.secondName.toLowerCase().includes(search.toLowerCase()) || 
      p.person?.fatherName.toLowerCase().includes(search.toLowerCase()) ||
      p.address.toLowerCase().includes(search.toLowerCase())
    );
    // setOrdersState(filteredOrders);

    const filteredStatusOrders = filteredOrders.filter(p => p.status == statusFilter || statusFilter == 'all');
    // setOrdersState(filteredOrders);
    
    if (dateSorter == 'new') {
      const sortedOrders = [...filteredStatusOrders].sort((a, b) => (Number(new Date(b.createdAt)) - Number((new Date(a.createdAt)))));
      setOrdersState(sortedOrders);
    } else if (dateSorter == 'old') {
      const sortedOrders = [...filteredStatusOrders].sort((a, b) => (Number(new Date(a.createdAt)) - Number((new Date(b.createdAt)))));
      setOrdersState(sortedOrders);
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
          defaultValue: 'old',
          onChange: (e) => {
            setDateSorter(e.target.value);
            debounce();
          }
        }}
          label={'По дате заказа'}
          sizeInput='small'
          options={optionsOrdered}
        />
        <SelectInput selectProps={{
          defaultValue: 'all',
          onChange: (e) => {
            setStatusFilter(e.target.value);
            debounce();
          }
        }}
          label={'Статус'}
          sizeInput='small'
          options={optionsStatus}
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
      </div>
      <BaseGrid columns={orderColumns} data={ordersState} />
      <div className={styles.buttons}>
        <Button
          size='large'
          variant='contained'
          onClick={() => exportExcel(ordersState, 'Заказы')}
        >
          Скачать историю заказов в Excel
        </Button>
      </div>
    </div>
  );
};

export default OrdersTable;