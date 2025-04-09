'use client'
// todo вынести код в отдельный компонент который сделать client

import styles from "./login.module.css";
import Input from "@/components/UI/Input/Input";
import Title from "@/components/UI/Title/Title";
import Button from "@/components/UI/Button/Button";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginScheme } from "./models";
import { useLoginMutation } from "@/hooks/auth/useLoginMutation";
import { usePersonSetterContext } from "@/providers/PersonProvider/hooks/usePersonSetterContext";
import { LocalStorageService } from "@/lib/helpers/localStorageService";

export default function Login() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginScheme>();
  const setPerson = usePersonSetterContext()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSuccess = (data: any) => {
    setPerson.setId(data.person.id);
    setPerson.setFio(`${data.person.secondName} ${data.person.firstName} ${data.person.fatherName}`)
    setPerson.setEmail(data.person.email)
    setPerson.setPhone(data.person.phoneNumber)
    LocalStorageService.save('id', data.person.id);
    LocalStorageService.save('fio', `${data.person.secondName} ${data.person.firstName} ${data.person.fatherName}`);
    LocalStorageService.save('email', data.person.email);
    LocalStorageService.save('phone', data.person.phoneNumber);
    if (data.person.role == "ADMIN") {
      router.push('/admin/products');
    } else {
      router.push('/');
    }
  }

  const onError = () => { }

  const { login } = useLoginMutation({ onSuccess, onError });

  const onSubmit = async (data: LoginScheme) => {
    await login(data);
  }



  return (
    <div className={styles.block}>
      <Title text='Вход' size='l' />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          label='Логин'
          inputProps={{
            placeholder: '',
            id: 'login-login',
            ...register('email')
          }}
        />
        <Input
          label='Пароль'
          inputProps={{
            placeholder: '',
            id: 'login-password',
            ...register('password')
          }}
        />
        <Button text='Войти' size='l' />
      </form>


      <div className={styles.text}>
        <p>Еще нет аккаунта?</p>
        <Link href="/authorization/registration" className={styles.link}>Зарегистрироваться</Link>
      </div>
      <div className={`${styles.text} ${styles.mt}`}>
        <p>Забыли пароль?</p>
        <Link href="/authorization/registration" className={styles.link}>Восстановить доступ</Link>
      </div>
    </div>
  );
}
