'use client'
import styles from "./registration.module.css";
import Input from "@/components/UI/Input/Input";
import Title from "@/components/UI/Title/Title";
import Button from "@/components/UI/Button/Button";
import Link from "next/link";

export default function Registration() {
    return (
        <div className={styles.block}>
            <Title text='Регистрация' size='l'/>
            <Input 
                label='ФИО' 
                placeholder='Иванов Иван Иванович' 
                id='registration-fio'
            />
            <Input 
                label='Логин' 
                placeholder='Ваша почта...' 
                id='registration-login'
            />
            <Input 
                label='Пароль' 
                placeholder='' 
                id='registration-password'
            />
            <Input 
                label='Повторите пароль' 
                placeholder='' 
                id='registration-repeat-password'
            />
            <Button 
                text='Зарегистрироваться' 
                size='l' 
                onClick={() => {}}
            />
            <div className={styles.text}>
                <p>Уже есть аккаунт</p>
                <Link href="http://localhost:3000/authorization/login" className={styles.link}>Войти</Link>
            </div>
        </div>
    );
}
  