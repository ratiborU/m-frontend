'use client'
import React from 'react';
import styles from "./createPerson.module.css";
// import Input from '@/components/UI/Input/Input';
import Input from '@/components/UI/Input/Input';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { postPerson } from './action';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

type PersonScheme = {
  firstName: string,
  secondName: string,
  fatherName: string,
  email: string,
  phoneNumber: string,
  password: string,
  role: string,
  // isActivated: boolean,
  // activationLink: string
}

const CreatePerson = () => {

  const { register, handleSubmit } = useForm<PersonScheme>();

  const onSubmit = async (data: PersonScheme) => {
    // "use server"
    const person = await postPerson(data);
    console.log(person);
    // revalidateTag('persons')
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
              id: 'create-person-second-name',
              autoComplete: 'new-passport',
              ...register('secondName')
            }}
          />
          <Input
            label='Имя'
            sizeInput='large'
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
            inputProps={{
              placeholder: '',
              id: 'create-person-role',
              autoComplete: 'new-passport',
              ...register('role')
            }}
          />

          <div className={styles.buttons}>
            <Button type="submit" size='large' variant='contained'>Создать</Button>
            <Button size='large' variant='outlined'>Удалить</Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default CreatePerson;