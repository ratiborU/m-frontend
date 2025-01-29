'use client'
import React from 'react';
import styles from "./editOrder.module.css";
import Input from '@/components/UI/Input/Input';
import { Button } from '@mui/material';
// import { TOrder } from '@/services/types/orderType';
import { useForm } from 'react-hook-form';
import { putOrder } from './action';
import { EditOrderProps, PersonScheme } from './models';
import OrderProduct from '@/components/OrderProduct/OrderProduct';
import { TProduct } from '@/services/types/productType';


const EditOrder = (props: EditOrderProps) => {
  const {
    // id,
    price,
    address,
    delivery,
    deliveryDays,
    comment,
    status,
    personId,
    createdAt,
    products
  } = props;

  const { register, handleSubmit } = useForm<PersonScheme>();

  const onSubmit = async (data: PersonScheme) => {
    await putOrder({ ...props, ...data });
  }

  return (
    <>
      <div className={styles.flex}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.block}>
            <Input
              label='ФИО'
              sizeInput='large'
              inputProps={{
                placeholder: '',
                id: 'create-person-second-name',
                autoComplete: 'new-passport',
                defaultValue: personId,
                ...register('personId')
              }}
            />
            <Input
              label='Сумма'
              sizeInput='large'
              inputProps={{
                placeholder: '',
                id: 'create-person-first-name',
                autoComplete: 'new-passport',
                defaultValue: price,
                ...register('price')
              }}
            />
            <Input
              label='Адрес'
              sizeInput='large'
              inputProps={{
                placeholder: '',
                id: 'create-person-first-name',
                autoComplete: 'new-passport',
                defaultValue: address,
                ...register('address')
              }}
            />
            <Input
              label='Доставка'
              sizeInput='large'
              inputProps={{
                placeholder: '',
                id: 'create-person-father-name',
                autoComplete: 'new-passport',
                defaultValue: delivery,
                ...register('delivery')
              }}
            />
            <Input
              label='Дни'
              sizeInput='large'
              inputProps={{
                placeholder: '',
                id: 'create-person-email',
                autoComplete: 'new-passport',
                defaultValue: deliveryDays,
                ...register('deliveryDays')
              }}
            />
            <Input
              label='Комментарий'
              sizeInput='large'
              inputProps={{
                placeholder: '',
                id: 'create-person-phone',
                autoComplete: 'new-passport',
                defaultValue: comment,
                ...register('comment')
              }}
            />
            <Input
              label='Статус'
              sizeInput='large'
              inputProps={{
                placeholder: '',
                id: 'create-person-password',
                autoComplete: 'new-passport',
                defaultValue: status,
                ...register('status')
              }}
            />
            <Input
              label='Дата заказа'
              sizeInput='large'
              inputProps={{
                placeholder: '',
                id: 'create-person-password',
                autoComplete: 'new-passport',
                defaultValue: createdAt,
                ...register('createdAt')
              }}
            />

            <div className={styles.buttons}>
              <Button type="submit" size='large' variant='contained'>Сохранить</Button>
              <Button size='large' variant='outlined'>Удалить</Button>
            </div>
          </div>
        </form>
        <div className={styles.products}>
          {!!products && products.map(async (x) => {
            const response = await fetch(`http://localhost:5000/api/products/${x.productId}`, { cache: 'no-cache' });
            const product: TProduct = await response.json();
            return <OrderProduct key={x.id} product={product} count={x.count} />
          })}
        </div>
      </div>

    </>

  );
};

export default EditOrder;