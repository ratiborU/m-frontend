'use client'
import React from 'react';
import styles from "./createComment.module.css";
import Input from '@/components/UI/Input/Input';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { postPerson } from './action';
import { createCommentSchema, TCreateCommentSchema } from './models';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateCommentMutation } from '@/hooks/comments/useCreateCommentMutation';


const CreateComment = () => {
  const notify = () => toast.success("Заказ успешно создан");
  const notifyError = (text: string) => toast.error(`Произошла ошибка! ${text}`);

  const { register, handleSubmit, formState: { errors } } = useForm<TCreateCommentSchema>({ resolver: zodResolver(createCommentSchema) });

  const onSuccess = () => {
    notify();
  }

  const onError = (error: Error) => {
    notifyError(error.message);
  }

  const { createComment, isPending } = useCreateCommentMutation({ onSuccess, onError });

  const onSubmit = async (data: TCreateCommentSchema) => {
    await createComment(data);
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
              id: 'create-person-second-name',
              autoComplete: 'new-passport',
              ...register('text')
            }}
          />
          <Input
            label='Оценка'
            sizeInput='large'
            error={errors.rate?.message}
            inputProps={{
              placeholder: '',
              id: 'create-person-first-name',
              autoComplete: 'new-passport',
              ...register('rate')
            }}
          />
          <Input
            label='ФИО'
            sizeInput='large'
            error={errors.personId?.message}
            inputProps={{
              placeholder: '',
              id: 'create-person-father-name',
              autoComplete: 'new-passport',
              ...register('personId')
            }}
          />
          <Input
            label='Продукт'
            sizeInput='large'
            error={errors.productId?.message}
            inputProps={{
              placeholder: '',
              id: 'create-person-email',
              autoComplete: 'new-passport',
              ...register('productId')
            }}
          />

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

export default CreateComment;