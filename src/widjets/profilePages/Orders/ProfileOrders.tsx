import { TOrder } from '@/services/api/orders/orderType';
import React from 'react';
import styles from './profileOrders.module.css'
import OrderInfoCard from '@/components/OrderInfoCard/OrderInfoCard';

type ProfileOrdersProps = {
  orders: TOrder[]
}

const ProfileOrders = (props: ProfileOrdersProps) => {
  const { orders } = props;

  return (
    <div className={styles.block}>
      <h1 className={styles.title}>История заказов</h1>
      <div className={styles.orders}>
        {...orders.map(x => <OrderInfoCard key={`order info card: ${x.id}`} order={x} />)}
      </div>

    </div>
  );
};

export default ProfileOrders;