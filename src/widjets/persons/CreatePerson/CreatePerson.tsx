'use client'
import React from 'react';
import styles from "./createPerson.module.css";
import Input from '@/components/UI/Input/Input';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCreatePersonMutation } from '@/hooks/persons/useCreatePersonMutation';
import { createPersonSchema, TCreatePersonSchema } from './models';


const CreatePerson = () => {
  const notify = () => toast.success("Пользователь успешно создан");
  const notifyError = (text: string) => toast.error(`Произошла ошибка! ${text}`);
  const { register, handleSubmit, formState: { errors } } = useForm<TCreatePersonSchema>({ resolver: zodResolver(createPersonSchema) });

  const onSuccess = () => {
    notify();
  }

  const onError = (error: Error) => {
    notifyError(error.message);
  }

  const { createPerson, isPending } = useCreatePersonMutation({ onSuccess, onError });

  const onSubmit = async (data: TCreatePersonSchema) => {
    await createPerson(data);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.block}>
          <Input
            label='Фамилия'
            sizeInput='large'
            error={errors.secondName?.message}
            inputProps={{
              placeholder: '',
              id: 'create-person-second-name',
              autoComplete: 'new-passport',
              ...register('secondName')
            }}
          />
          <Input
            label='Имя'
            sizeInput='large'
            error={errors.firstName?.message}
            inputProps={{
              placeholder: '',
              id: 'create-person-first-name',
              autoComplete: 'new-passport',
              ...register('firstName')
            }}
          />
          <Input
            label='Отчество'
            sizeInput='large'
            error={errors.fatherName?.message}
            inputProps={{
              placeholder: '',
              id: 'create-person-father-name',
              autoComplete: 'new-passport',
              ...register('fatherName')
            }}
          />
          <Input
            label='Почта'
            sizeInput='large'
            error={errors.email?.message}
            inputProps={{
              placeholder: '',
              id: 'create-person-email',
              autoComplete: 'new-passport',
              ...register('email')
            }}
          />
          <Input
            label='Телефон'
            sizeInput='large'
            error={errors.phoneNumber?.message}
            inputProps={{
              placeholder: '',
              id: 'create-person-phone',
              autoComplete: 'new-passport',
              ...register('phoneNumber')
            }}
          />
          <Input
            label='Пароль'
            sizeInput='large'
            error={errors.password?.message}
            inputProps={{
              placeholder: '',
              id: 'create-person-password',
              autoComplete: 'new-passport',
              ...register('password')
            }}
          />
          <Input
            label='Роль'
            sizeInput='large'
            error={errors.role?.message}
            inputProps={{
              placeholder: '',
              id: 'create-person-role',
              autoComplete: 'new-passport',
              ...register('role')
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

export default CreatePerson;