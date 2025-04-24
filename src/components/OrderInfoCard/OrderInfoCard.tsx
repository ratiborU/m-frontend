import React from 'react';
import styles from './orderInfoCard.module.css'
import { TOrder } from '@/services/api/orders/orderType';
import NameAndProperty from '../UI/NameAndProperty/NameAndProperty';
import { parseDate } from '@/lib/helpers/parseDate';

type OrderInfoCardProps = {
  order: TOrder,
}

const OrderInfoCard = (props: OrderInfoCardProps) => {
  const { order } = props;

  return (
    <div className={styles.orderCard}>
      <div className={styles.titleFlex}>
        <h3 className={styles.title}>Заказ от {parseDate(order.createdAt)}</h3>
        <p className={styles.price}>{order.price} ₽</p>
      </div>
      <div className={styles.deliveryInfo}>
        <NameAndProperty name={order.status} value={'Дата доставки'} size='s' />
        {/* <NameAndProperty name='Адрес' value={order.address} size='s' /> */}
        <p className={styles.addressInfo}>{order.address}</p>
      </div>
      <div className={styles.products}>
        {
          order.order_products?.length != 0
            ? <>{...order.order_products!.map(x => (
              <NameAndProperty key={`name and property for orderInfo cart: ${order.id} ${x.id}`} name={`${x.product?.name}` || 'Товар'} value={`${x.count} шт`} size='s' />
            ))}</>
            : <></>
        }
      </div>
      <div></div>

    </div>
  );
};

export default OrderInfoCard;