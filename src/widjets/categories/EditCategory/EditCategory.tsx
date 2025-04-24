'use client'
import React from 'react';
import styles from "./editCategory.module.css";
import Input from '@/components/UI/Input/Input';
import { Button } from '@mui/material';
import { TCategory } from '@/services/api/categories/categoryType';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUpdateCategoryMutation } from '@/hooks/categories/useUpdateCategoryMutation';
import { useDeleteCategoryMutation } from '@/hooks/categories/useDeleteCategoryMutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";

export const editCategorySchema = z.object({
  name: z.string().min(1, 'мало'),
  description: z.string().min(1, 'мало'),
})

export type TEditCategorySchema = z.infer<typeof editCategorySchema>;


const EditCategory = (props: TCategory) => {
  const { name, description } = props;

  const notify = () => toast.success("Пользователь успешно изменен!");
  const notifyDelete = () => toast.success("Пользователь успешно удален!");
  const notifyError = (text: string) => toast.error(`Произошла ошибка! ${text}`);

  const { register, handleSubmit } = useForm<TEditCategorySchema>({ resolver: zodResolver(editCategorySchema) });

  const onSuccess = () => {
    notify();
  }

  const onError = (error: Error) => {
    notifyError(error.message);
  }

  const { updateCategory, isPending } = useUpdateCategoryMutation({ onSuccess, onError });

  const onSuccessDelete = () => {
    notifyDelete();
  }

  const onErrorDelete = (error: Error) => {
    notifyError(error.message);
  }

  const { deleteCategory, isPending: isPendingDelete } = useDeleteCategoryMutation({ onSuccess: onSuccessDelete, onError: onErrorDelete });

  const onSubmit = async (data: TEditCategorySchema) => {
    await updateCategory({ ...props, ...data });
  }

  const onDelete = async () => {
    await deleteCategory(props.id);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.block}>
          <Input
            label='Фамилия'
            sizeInput='large'
            inputProps={{
              placeholder: '',
              id: 'edit-Category-second-name',
              autoComplete: 'new-passport',
              defaultValue: name,
              ...register('name')
            }}
          />
          <Input
            label='Имя'
            sizeInput='large'
            inputProps={{
              placeholder: '',
              id: 'edit-Category-first-name',
              autoComplete: 'new-passport',
              defaultValue: description,
              ...register('description')
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
              onClick={onDelete}
              size='large'
              variant='outlined'
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
};

export default EditCategory;