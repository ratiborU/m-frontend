'use client'
import React from 'react';
import styles from "./createCoupon.module.css";
import Input from '@/components/UI/Input/Input';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { createCouponSchema, TCreateCouponSchema } from './models';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateCouponMutation } from '@/hooks/coupons/useCreateCouponMutation';
import SelectInput from '@/components/UI/SelectInput/SelectInput';
// import { useGetProductOptionsQuery } from '@/hooks/products/useGetProductOptionsQuery';
import { useGetPersonOptionsQuery } from '@/hooks/persons/useGetPersonOptionsQuery';
// import RadioButton from '@/components/UI/RadioButton/RadioButton';
// import CheckBox from '@/components/UI/CheckBox/CheckBox';

// можеть быть нужно передавать данные о options с page
const CreateCoupon = () => {
  const notify = () => toast.success("Заказ успешно создан");
  const notifyError = (text: string) => toast.error(`Произошла ошибка! ${text}`);

  const { register, handleSubmit, formState: { errors } } = useForm<TCreateCouponSchema>({ resolver: zodResolver(createCouponSchema) });
  // const { data: productOptions } = useGetProductOptionsQuery();
  const { data: personOptions } = useGetPersonOptionsQuery();

  const onSuccess = () => {
    notify();
  }

  const onError = (error: Error) => {
    notifyError(error.message);
  }

  const { createCoupon, isPending } = useCreateCouponMutation({ onSuccess, onError });

  const onSubmit = async (data: TCreateCouponSchema) => {
    await createCoupon(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.block}>
          <Input
            label='Текст'
            sizeInput='large'
            error={errors.text?.message}
            inputProps={{
              placeholder: '',
              id: 'create-coupon-text',
              autoComplete: 'new-passport',
              ...register('text')
            }}
          />

          <Input
            label='Значение'
            sizeInput='large'
            error={errors.value?.message}
            inputProps={{
              placeholder: '',
              id: 'create-coupon-value',
              autoComplete: 'new-passport',
              ...register('value')
            }}
          />

          <Input
            label='Скидка'
            sizeInput='large'
            error={errors.discount?.message}
            inputProps={{
              placeholder: '10% или 500',
              id: 'create-coupon-discount',
              autoComplete: 'new-passport',
              ...register('discount')
            }}
          />

          <SelectInput
            label='ФИО'
            sizeInput='large'
            selectProps={{
              ...register('personId')
            }}
            options={personOptions || []}
          />
          {/* <CheckBox
            label='Только на одно использование'
            inputProps={{

            }}
          /> */}
          <Button
            loading={isPending}
            type="submit"
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

export default CreateCoupon;