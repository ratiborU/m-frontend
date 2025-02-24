'use client'
import React from 'react';
import styles from "./editOrder.module.css";
import Input from '@/components/UI/Input/Input';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { putOrder } from './action';
import { EditOrderProps, PersonScheme } from './models';
import OrderProduct from '@/components/OrderProduct/OrderProduct';
import { editOrderSchema, TEditOrderSchema } from './models';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUpdateOrderMutation } from '@/hooks/orders/useUpdateOrderMutation';
import { useDeleteOrderMutation } from '@/hooks/orders/useDeleteOrderMutation';

const EditOrder = (props: EditOrderProps) => {
  const {
    id,
    price,
    address,
    delivery,
    deliveryDays,
    comment,
    status,
    personId,
    updatedAt,
    createdAt,
    orderProducts
  } = props;
  const notify = () => toast.success("Заказ успешно создан");
  const notifyDelete = () => toast.success("Заказ успешно удален");
  const notifyError = (text: string) => toast.error(`Произошла ошибка! ${text}`);

  const { register, handleSubmit, formState: { errors } } = useForm<TEditOrderSchema>({ resolver: zodResolver(editOrderSchema) });

  const onSuccess = () => {
    notify();
  }

  const onError = (error: Error) => {
    notifyError(error.message);
  }

  const { updateOrder, isPending } = useUpdateOrderMutation({ onSuccess, onError });

  const onSuccessDelete = () => {
    notifyDelete();
  }

  const onErrorDelete = (error: Error) => {
    notifyError(error.message);
  }

  const { deleteOrder, isPending: isPendingDelete } = useDeleteOrderMutation({ onSuccess: onSuccessDelete, onError: onErrorDelete });

  const onSubmit = async (data: TEditOrderSchema) => {
    await updateOrder({
      id, createdAt, updatedAt, ...data
    });
  }

  const onDelete = async () => {
    await deleteOrder(id);
  }

  return (
    <>
      <div className={styles.flex}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.block}>
            <Input
              label='ФИО'
              sizeInput='large'
              error={errors.personId?.message}
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
              error={errors.price?.message}
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
              error={errors.address?.message}
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
              error={errors.delivery?.message}
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
              error={errors.deliveryDays?.message}
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
              error={errors.comment?.message}
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
              error={errors.status?.message}
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
              }}
            />

            <div className={styles.buttons}>
              <Button
                loading={isPending}
                type="submit"
                size='large'
                variant='contained'
              >
                Сохранить
              </Button>
              <Button
                loading={isPendingDelete}
                size='large'
                variant='outlined'
                onClick={onDelete}
              >
                Удалить
              </Button>
            </div>
          </div>
        </form>
        <div className={styles.products}>
          {!!orderProducts && orderProducts.map((product, i) => {
            return <OrderProduct key={product.id} product={product.product} count={orderProducts[i].count} />
          })}
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        limit={4}
      />
    </>
  );
};

export default EditOrder;