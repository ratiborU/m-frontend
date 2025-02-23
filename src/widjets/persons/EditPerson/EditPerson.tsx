'use client'
import React from 'react';
import styles from "./editPerson.module.css";
import Input from '@/components/UI/Input/Input';
import { Button } from '@mui/material';
import { TPerson } from '@/services/api/persons/personType';
import { useForm } from 'react-hook-form';
import { postPerson } from './action';
import { PersonScheme } from './models';
import { z } from 'zod';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUpdatePersonMutation } from '@/hooks/persons/useUpdatePersonMutation';
import { useDeletePersonMutation } from '@/hooks/persons/useDeletePersonMutation';

const editProductSchema = z.object({
  firstName: z.string().min(1, 'мало'),
  secondName: z.string().min(1, 'мало'),
  fatherName: z.string().min(1, 'мало'),
  email: z.string().min(1, 'мало'),
  phoneNumber: z.string().min(1, 'мало'),
})

type TEditProductSchema = z.infer<typeof editProductSchema>;

const EditPerson = (props: TPerson) => {
  const { firstName, secondName, fatherName, email, phoneNumber } = props;

  const notify = () => toast.success("Пользователь успешно изменен!");
  const notifyDelete = () => toast.success("Пользователь успешно удален!");
  const notifyError = (text: string) => toast.error(`Произошла ошибка! ${text}`);

  const { register, handleSubmit } = useForm<PersonScheme>();

  const onSuccess = () => {
    notify();
  }

  const onError = (error: Error) => {
    notifyError(error.message);
  }

  const { updatePerson, isPending } = useUpdatePersonMutation({ onSuccess, onError });

  const onSuccessDelete = () => {
    notifyDelete();
  }

  const onErrorDelete = (error: Error) => {
    notifyError(error.message);
  }

  const { deletePerson, isPending: isPendingDelete } = useDeletePersonMutation({ onSuccess: onSuccessDelete, onError: onErrorDelete });

  const onSubmit = async (data: PersonScheme) => {
    await updatePerson({ ...props, ...data });
  }

  const onDelete = async () => {
    await deletePerson(props.id);
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
              id: 'edit-person-second-name',
              autoComplete: 'new-passport',
              defaultValue: secondName,
              ...register('secondName')
            }}
          />
          <Input
            label='Имя'
            sizeInput='large'
            inputProps={{
              placeholder: '',
              id: 'edit-person-first-name',
              autoComplete: 'new-passport',
              defaultValue: firstName,
              ...register('firstName')
            }}
          />
          <Input
            label='Отчество'
            sizeInput='large'
            inputProps={{
              placeholder: '',
              id: 'edit-person-father-name',
              autoComplete: 'new-passport',
              defaultValue: fatherName,
              ...register('fatherName')
            }}
          />
          <Input
            label='Почта'
            sizeInput='large'
            inputProps={{
              placeholder: '',
              id: 'edit-person-email',
              autoComplete: 'new-passport',
              defaultValue: email,
              ...register('email')
            }}
          />
          <Input
            label='Телефон'
            sizeInput='large'
            inputProps={{
              placeholder: '',
              id: 'edit-person-phone',
              autoComplete: 'new-passport',
              defaultValue: phoneNumber,
              ...register('phoneNumber')
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

export default EditPerson;