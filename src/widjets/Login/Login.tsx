'use client'
// todo вынести код в отдельный компонент который сделать client

import styles from "./login.module.css";
import Input from "@/components/UI/Input/Input";
import Title from "@/components/UI/Title/Title";
import Button from "@/components/UI/Button/Button";
// import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LoginScheme } from "./models";
// import { login } from "./action";
import { login } from "@/services/api/authorizationService";
// import { cookies } from "next/headers";

export default function Login() {
  // const router = useRouter();

  const { register, handleSubmit } = useForm<LoginScheme>();

  const onSubmit = async (data: LoginScheme) => {
    // await login(data);
    await login(data);
    // console.log(res);
    // await cookies().get('session')?.value
    // router.push('/admin/products')
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
