'use client'
import React from 'react';
import styles from "./createOrder.module.css";
import Input from '@/components/UI/Input/Input';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { createOrderSchema, TCreateOrderSchema } from './models';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateOrderMutation } from '@/hooks/orders/useCreateOrderMutation';


const CreateOrder = () => {
  const notify = () => toast.success("Заказ успешно создан");
  const notifyError = (text: string) => toast.error(`Произошла ошибка! ${text}`);
  const { register, handleSubmit, formState: { errors } } = useForm<TCreateOrderSchema>({ resolver: zodResolver(createOrderSchema) });

  const onSuccess = () => {
    notify();
  }

  const onError = (error: Error) => {
    notifyError(error.message);
  }

  const { createOrder, isPending } = useCreateOrderMutation({ onSuccess, onError });

  const onSubmit = async (data: TCreateOrderSchema) => {
    alert('hola')
    await createOrder(data);
  }

  return (
    <>
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
              ...register('status')
            }}
          />

          <Button
            type="submit"
            loading={isPending}
            size='large'
            variant='contained'
          >
            Создать
          </Button>
        </div>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        limit={4}
      />
    </>
  );
}

export default CreateOrder;