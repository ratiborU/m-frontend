'use client'
import styles from "./registration.module.css";
import Input from "@/components/UI/Input/Input";
import Title from "@/components/UI/Title/Title";
import Button from "@/components/UI/Button/Button";
import Link from "next/link";
import { useForm } from "react-hook-form";
// import { RegistrationScheme } from "./models";
import { useRegistrationMutation } from "@/hooks/auth/useRegistrationMutation";
import { useRouter } from "next/navigation";
import { usePersonContext } from "@/providers/PersonProvider/hooks/usePersonContext";
import { usePersonSetterContext } from "@/providers/PersonProvider/hooks/usePersonSetterContext";
import { LocalStorageService } from "@/lib/helpers/localStorageService";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createPersonSchema = z.object({
  fio: z.string().min(1, 'Это обязательное поле'),
  email: z.string().min(1, 'Это обязательное поле'),
  phoneNumber: z.string().min(1, 'Это обязательное поле'),
  password: z.string().min(1, 'Это обязательное поле'),
  repeatPassword: z.string().min(1, 'Это обязательное поле'),
  // delivery: z.string(),
}).refine(data => data.password === data.repeatPassword, {
  message: "Пароли должны совпадать",
  path: ["repeatPassword"]
});
type RegistrationScheme = z.infer<typeof createPersonSchema>;

export default function Registration() {
  const router = useRouter();
  // добавить zod
  const { register, handleSubmit, formState: { errors }, setError } = useForm<RegistrationScheme>({ resolver: zodResolver(createPersonSchema) });
  const person = usePersonContext();
  const setPerson = usePersonSetterContext()

  // test142@example.com
  // 89826556207
  // eslint-disable-next-line
  const onSuccess = (data: any) => {
    setPerson.setId(data.person.id);
    setPerson.setFio(`${data.person.secondName} ${data.person.firstName} ${data.person.fatherName}`)
    setPerson.setEmail(data.person.email)
    setPerson.setPhone(data.person.phoneNumber)
    LocalStorageService.save('id', data.person.id);
    LocalStorageService.save('fio', `${data.person.secondName} ${data.person.firstName} ${data.person.fatherName}`);
    LocalStorageService.save('email', data.person.email);
    LocalStorageService.save('phone', data.person.phoneNumber);
    router.push('/');
  }

  const onError = () => {
    setError('email', {
      type: "server",
      message: 'эта почта или телефон уже заняты'
    });
    setError('phoneNumber', {
      type: "server",
      message: 'эта почта или телефон уже заняты'
    })
  }

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
          error={errors.fio?.message}
        />
        <Input
          label='Логин'
          inputProps={{
            placeholder: 'Ваша почта...',
            id: 'registration-login',
            ...register('email'),
            defaultValue: person.email
          }}
          error={errors.email?.message}
        />
        <Input
          label='Телефон'
          inputProps={{
            placeholder: 'Ваш телефон...',
            id: 'registration-phone',
            ...register('phoneNumber'),
            defaultValue: person.phone
          }}
          error={errors.phoneNumber?.message}
        />
        <Input
          label='Пароль'
          inputProps={{
            placeholder: '',
            id: 'registration-password',
            ...register('password')
          }}
          error={errors.password?.message}
        />
        <Input
          label='Повторите пароль'
          inputProps={{
            placeholder: '',
            id: 'registration-repeat-password',
            ...register('repeatPassword')
          }}
          error={errors.repeatPassword?.message}
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
