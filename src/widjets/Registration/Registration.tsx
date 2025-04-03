'use client'
import styles from "./registration.module.css";
import Input from "@/components/UI/Input/Input";
import Title from "@/components/UI/Title/Title";
import Button from "@/components/UI/Button/Button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { RegistrationScheme } from "./models";
import { useRegistrationMutation } from "@/hooks/auth/useRegistrationMutation";
import { useRouter } from "next/navigation";
import { usePersonContext } from "@/providers/PersonProvider/hooks/usePersonContext";
import { usePersonSetterContext } from "@/providers/PersonProvider/hooks/usePersonSetterContext";
import { LocalStorageService } from "@/lib/helpers/localStorageService";

export default function Registration() {
  const router = useRouter();
  // добавить zod
  const { register, handleSubmit } = useForm<RegistrationScheme>();
  const person = usePersonContext();
  const setPerson = usePersonSetterContext()

  // test142@example.com
  // 89826556207
  // eslint-disable-next-line
  const onSuccess = (data: any) => {
    setPerson.setId(data.person.id);
    setPerson.setFio(`${data.person.secondName} ${data.person.firstName} ${data.person.fatherName}`)
    setPerson.setEmail(data.person.email)
    LocalStorageService.save('id', data.person.id);
    LocalStorageService.save('fio', `${data.person.secondName} ${data.person.firstName} ${data.person.fatherName}`);
    LocalStorageService.save('email', data.person.email);
    router.push('/');
  }

  const onError = () => { }

  const { registration } = useRegistrationMutation({ onSuccess, onError });

  const onSubmit = async (data: RegistrationScheme) => {
    const sendData = {
      firstName: data.fio.split(' ')[1],
      secondName: data.fio.split(' ')[0],
      fatherName: data.fio.split(' ')[2] || '',
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
    }

    await registration(sendData);
  }

  return (
    <div className={styles.block}>
      <Title text='Регистрация' size='l' />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          label='ФИО'
          inputProps={{
            placeholder: 'Иванов Иван Иванович',
            id: 'registration-fio',
            ...register('fio'),
            defaultValue: person.fio
          }}
        />
        <Input
          label='Логин'
          inputProps={{
            placeholder: 'Ваша почта...',
            id: 'registration-login',
            ...register('email'),
            defaultValue: person.email
          }}
        />
        <Input
          label='Телефон'
          inputProps={{
            placeholder: 'Ваш телефон...',
            id: 'registration-phone',
            ...register('phoneNumber'),
            defaultValue: person.phone
          }}
        />
        <Input
          label='Пароль'
          inputProps={{
            placeholder: '',
            id: 'registration-password',
            ...register('password')
          }}
        />
        <Input
          label='Повторите пароль'
          inputProps={{
            placeholder: '',
            id: 'registration-repeat-password',
            ...register('repeatPassword')
          }}
        />
        <Button
          text='Зарегистрироваться'
          size='l'
        />
      </form>
      <div className={styles.text}>
        <p>Уже есть аккаунт</p>
        <Link href="/authorization/login" className={styles.link}>Войти</Link>
      </div>
    </div>
  );
}
