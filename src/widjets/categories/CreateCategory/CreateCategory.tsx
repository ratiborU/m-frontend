'use client'
import React from 'react';
import styles from "./createCategory.module.css";
import Input from '@/components/UI/Input/Input';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCreateCategoryMutation } from '@/hooks/categories/useCreateCategoryMutation';
// import { useCreateCategoryMutation } from '@/hooks/Categorys/useCreateCategoryMutation';
// import { createCategorySchema, TCreateCategorySchema } from './models';
import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, 'мало'),
  description: z.string().min(1, 'мало'),
})

export type TCreateCategorySchema = z.infer<typeof createCategorySchema>;

const CreateCategory = () => {
  const notify = () => toast.success("Пользователь успешно создан");
  const notifyError = (text: string) => toast.error(`Произошла ошибка! ${text}`);
  const { register, handleSubmit, formState: { errors } } = useForm<TCreateCategorySchema>({ resolver: zodResolver(createCategorySchema) });

  const onSuccess = () => {
    notify();
  }

  const onError = (error: Error) => {
    notifyError(error.message);
  }

  const { createCategory, isPending } = useCreateCategoryMutation({ onSuccess, onError });

  const onSubmit = async (data: TCreateCategorySchema) => {
    await createCategory(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.block}>
          <Input
            label='Название категории*'
            sizeInput='large'
            error={errors.name?.message}
            inputProps={{
              placeholder: '',
              id: 'create-сategory-name',
              autoComplete: 'new-passport',
              ...register('name')
            }}
          />
          <Input
            label='Описание'
            sizeInput='large'
            error={errors.description?.message}
            inputProps={{
              placeholder: '',
              id: 'create-сategory-description',
              autoComplete: 'new-passport',
              ...register('description')
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

export default CreateCategory;