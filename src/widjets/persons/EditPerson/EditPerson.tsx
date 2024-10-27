'use client'
import React from 'react';
import styles from "./editPerson.module.css";
import Input from '@/components/UI/Input/Input';
// import { Button } from '@mui/material';
import { Button } from '@mui/material';
import { TPerson } from '@/services/types/personType';
import { useForm } from 'react-hook-form';
import { postPerson } from './action';
// import { revalidatePath, revalidateTag } from 'next/cache';

type PersonScheme = {
  firstName: string,
  secondName: string,
  fatherName: string,
  email: string,
  phoneNumber: string,
  // password: string,
  // role: string,
  // isActivated: boolean,
  // activationLink: string
}

// interface EditPersonProps extends TPerson {
//   // onSubmit?: (person: TPerson) => void;
// }

const EditPerson = (props: TPerson) => {
  const { firstName, secondName, fatherName, email, phoneNumber } = props;
  // console.log(props.firstName);

  const { register, handleSubmit } = useForm<PersonScheme>();
  // const [state, formAction] = useFormState<State, PersonScheme>(postPerson, null);

  const onSubmit = async (data: PersonScheme) => {
    const person = await postPerson({ ...props, ...data });
    console.log(person);
  }

  return (
    <>
      {/* <Button size='large' variant='contained'>Сохранить</Button> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.block}>
          <Input
            label='Фамилия'
            sizeInput='l'
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
            sizeInput='l'
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
            sizeInput='l'
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
            sizeInput='l'
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
            sizeInput='l'
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