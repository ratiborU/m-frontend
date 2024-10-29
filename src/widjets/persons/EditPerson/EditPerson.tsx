'use client'
import React from 'react';
import styles from "./editPerson.module.css";
import Input from '@/components/UI/Input/Input';
import { Button } from '@mui/material';
import { TPerson } from '@/services/types/personType';
import { useForm } from 'react-hook-form';
import { postPerson } from './action';
import { PersonScheme } from './models';


const EditPerson = (props: TPerson) => {
  const { firstName, secondName, fatherName, email, phoneNumber } = props;

  const { register, handleSubmit } = useForm<PersonScheme>();

  const onSubmit = async (data: PersonScheme) => {
    await postPerson({ ...props, ...data });
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
            <Button type="submit" size='large' variant='contained'>Сохранить</Button>
            <Button size='large' variant='outlined'>Удалить</Button>
          </div>
        </div>
      </form>
    </>

  );
};

export default EditPerson;