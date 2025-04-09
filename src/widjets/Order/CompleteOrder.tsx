import React from 'react';
import styles from './order.module.css'

const CompleteOrder = () => {
  return (
    <p className={styles.endBlock}>
      ваш заказ был успешно обраотан и принят, уведомление с чеком придут вам на почту, чтобы посмотреть историю заказов на сайте зарегистрируйтесь
    </p>
  );
};

export default CompleteOrder;