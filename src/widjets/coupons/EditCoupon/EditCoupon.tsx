'use client'
import React from 'react';
import styles from "./editCoupon.module.css";
import Input from '@/components/UI/Input/Input';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { editCouponSchema, TEditCouponSchema } from './models';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateCouponMutation } from '@/hooks/coupons/useUpdateCouponMutation';
import SelectInput from '@/components/UI/SelectInput/SelectInput';
// import { useGetProductOptionsQuery } from '@/hooks/products/useGetProductOptionsQuery';
import { useGetPersonOptionsQuery } from '@/hooks/persons/useGetPersonOptionsQuery';
import { TEditCouponProps } from './models';
import { useDeleteCouponMutation } from '@/hooks/coupons/useDeleteCouponMutation';

// можеть быть нужно передавать данные о options с page
const EditCoupon = (props: TEditCouponProps) => {
  const { coupon } = props;
  const notify = () => toast.success("Заказ успешно создан");
  const notifyError = (text: string) => toast.error(`Произошла ошибка! ${text}`);

  const { register, handleSubmit, formState: { errors } } = useForm<TEditCouponSchema>({ resolver: zodResolver(editCouponSchema) });
  // const { data: productOptions } = useGetProductOptionsQuery();
  const { data: personOptions } = useGetPersonOptionsQuery();

  const onSuccess = () => {
    notify();
  }

  const onError = (error: Error) => {
    notifyError(error.message);
  }

  const { updateCoupon, isPending } = useUpdateCouponMutation({ onSuccess, onError });
  const { deleteCoupon, isPending: isDeleting } = useDeleteCouponMutation({ onSuccess, onError });

  const onSubmit = async (data: TEditCouponSchema) => {
    await updateCoupon({ ...coupon, ...data });
  }

  const onDelete = async () => {
    await deleteCoupon(coupon.id);
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
              id: 'Edit-coupon-text',
              autoComplete: 'new-passport',
              ...register('text'),
              defaultValue: coupon.text
            }}
          />

          <Input
            label='Значение'
            sizeInput='large'
            error={errors.value?.message}
            inputProps={{
              placeholder: '',
              id: 'Edit-coupon-value',
              autoComplete: 'new-passport',
              ...register('value'),
              defaultValue: coupon.value
            }}
          />

          <Input
            label='Скидка'
            sizeInput='large'
            error={errors.discount?.message}
            inputProps={{
              placeholder: '10% или 500',
              id: 'Edit-coupon-discount',
              autoComplete: 'new-passport',
              ...register('discount'),
              defaultValue: coupon.discount
            }}
          />

          <SelectInput
            label='ФИО'
            sizeInput='large'
            selectProps={{
              ...register('personId'),
              defaultValue: coupon.personId
            }}
            options={personOptions || []}
          />
          {/* <CheckBox
            label='Только на одно использование'
            inputProps={{

            }}
          /> */}
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
              loading={isDeleting}
              type="button"
              size='large'
              variant='outlined'
              onClick={onDelete}
            >
              Удалить
            </Button>
          </div>

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

export default EditCoupon;