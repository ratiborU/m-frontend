'use client'
import React from 'react';
import styles from "./createComment.module.css";
import Input from '@/components/UI/Input/Input';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { postPerson } from './action';
import { CommentScheme } from './models';


const CreateComment = () => {
  const { register, handleSubmit } = useForm<CommentScheme>();

  const onSubmit = async (data: CommentScheme) => {
    await postPerson(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.block}>
        <Input
          label='Текст'
          sizeInput='large'
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
          inputProps={{
            placeholder: '',
            id: 'create-person-email',
            autoComplete: 'new-passport',
            ...register('productId')
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

export default CreateComment;