'use client'
// todo вынести код в отдельный компонент который сделать client

import styles from "./login.module.css";
import Input from "@/components/UI/Input/Input";
import Title from "@/components/UI/Title/Title";
import Button from "@/components/UI/Button/Button";
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function Login() {
  const router = useRouter()
  return (
    <div className={styles.block}>
      <Title text='Вход' size='l' />
      {/* <Input label='Логин' placeholder='Ваша почта...' id='login-login' />
      <Input label='Пароль' placeholder='Пароль...' id='login-password' /> */}
      <Button text='Войти' size='l' onClick={() => { router.push('/admin/products') }} />
      <div className={styles.text}>
        <p>Еще нет аккаунта?</p>
        <Link href="http://localhost:3000/authorization/registration" className={styles.link}>Зарегистрироваться</Link>
      </div>
      <div className={`${styles.text} ${styles.mt}`}>
        <p>Забыли пароль?</p>
        <Link href="http://localhost:3000/authorization/registration" className={styles.link}>Восстановить доступ</Link>
      </div>
    </div>
  );
}
