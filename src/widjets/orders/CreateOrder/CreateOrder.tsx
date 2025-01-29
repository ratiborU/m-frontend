'use client'
import React from 'react';
import styles from "./createOrder.module.css";
import Input from '@/components/UI/Input/Input';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { postPerson } from './action';
import { PersonScheme } from './models';


const CreateOrder = () => {
  const { register, handleSubmit } = useForm<PersonScheme>();

  const onSubmit = async (data: PersonScheme) => {
    await postPerson(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.block}>
        <Input
          label='ФИО'
          sizeInput='large'
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
          inputProps={{
            placeholder: '',
            id: 'create-person-password',
            autoComplete: 'new-passport',
            ...register('status')
          }}
        />

        <div className={styles.buttons}>
          <Button type="submit" size='large' variant='contained'>Создать</Button>
          <Button size='large' variant='outlined'>Удалить</Button>
        </div>
      </div>
    </form>
  );
}

export default CreateOrder;