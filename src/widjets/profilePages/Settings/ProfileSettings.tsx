'use client'
import React from 'react';
import styles from './profileSettings.module.css';
import Input from '@/components/UI/Input/Input';
import Button from '@/components/UI/Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  editPersonProfileSchema,
  TEditPersonProfileSchema,
  changePersonPasswordSchema,
  TChangePersonPasswordSchema
} from './models';
import { TPerson } from '@/services/api/persons/personType';
import { useUpdatePersonMutation } from '@/hooks/persons/useUpdatePersonMutation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type ProfileSettingsProps = {
  person?: TPerson,
}

const ProfileSettings = (props: ProfileSettingsProps) => {
  const { person } = props;
  const fio = `${person?.secondName} ${person?.firstName} ${person?.fatherName}`

  const { register, handleSubmit } = useForm<TEditPersonProfileSchema>({ resolver: zodResolver(editPersonProfileSchema) });
  const { register: registerPassword, handleSubmit: handleSubmitPassword } = useForm<TChangePersonPasswordSchema>({ resolver: zodResolver(changePersonPasswordSchema) });

  const notify = () => toast.success("Пользователь успешно изменен!");
  const notifyDelete = () => toast.success("Пользователь успешно удален!");
  const notifyError = (text: string) => toast.error(`Произошла ошибка! ${text}`);

  const onSuccess = () => {
    notify();
  }

  const onError = (error: Error) => {
    notifyError(error.message);
  }

  const { updatePerson, isPending } = useUpdatePersonMutation({ onSuccess, onError });

  const onSubmit = async (data: TEditPersonProfileSchema) => {
    console.log(data);
    const fioData = data.fio.split(' ');
    await updatePerson({
      ...person!,
      secondName: fioData[0] || '',
      firstName: fioData[1] || '',
      fatherName: fioData[2] || ''
    });
  }

  const onSubmitPassword = async (data: TChangePersonPasswordSchema) => {
    console.log(data);
    await updatePerson({
      ...person!,
      // newPassword: data.newPassword
    });
  }

  return (
    <>
      <div>
        <h1 className={styles.title}>Личные данные</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            label={'ФИО'}
            inputProps={{
              ...register('fio'),
              id: 'profile-settings-fio',
              placeholder: '',
              defaultValue: fio
            }}
          />
          <Input
            label={'Email'}
            inputProps={{
              ...register('email'),
              id: 'profile-settings-email',
              placeholder: 'example@gmail.com',
              defaultValue: person?.email
            }}
          />
          <Input
            label={'Номер телефона'}
            inputProps={{
              ...register('phoneNumber'),
              id: 'profile-settings-phone',
              placeholder: '',
              defaultValue: person?.phoneNumber
            }}
          />
          <Button text={'Сохранить'} size={'s'} />
        </form>

        <h1 className={styles.title2}>Изменить пароль</h1>
        <form className={styles.form} onSubmit={handleSubmitPassword(onSubmitPassword)}>
          <Input
            label={'Старый пароль'}
            inputProps={{
              ...registerPassword('oldPassword'),
              id: 'profile-settings-old-password',
              placeholder: ''
            }}
          />
          <Input
            label={'Новый пароль'}
            inputProps={{
              ...registerPassword('newPassword'),
              id: 'profile-settings-new-password',
              placeholder: ''
            }}
          />
          <Input
            label={'Повторите пароль'}
            inputProps={{
              ...registerPassword('newPasswordAgain'),
              id: 'profile-settings-new-password-repeat',
              placeholder: ''
            }}
          />
          <Button text={'Сохранить'} size={'s'} />
        </form>

      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        limit={4}
      />
    </>
  );
};

export default ProfileSettings;