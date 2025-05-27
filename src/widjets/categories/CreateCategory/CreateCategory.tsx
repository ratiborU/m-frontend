'use client'
import React, { useState } from 'react';
import styles from "./createCategory.module.css";
import Input from '@/components/UI/Input/Input';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCreateCategoryMutation } from '@/hooks/categories/useCreateCategoryMutation';
// import { useCreateCategoryMutation } from '@/hooks/Categorys/useCreateCategoryMutation';
// import { createCategorySchema, TCreateCategorySchema } from './models';
import { z } from "zod";
import Textarea from '@/components/UI/Textarea/Textarea';

export const createCategorySchema = z.object({
  name: z.string().min(1, 'мало'),
  description: z.string().min(1, 'мало'),
})

export type TCreateCategorySchema = z.infer<typeof createCategorySchema>;

const CreateCategory = () => {
  const notify = () => toast.success("Пользователь успешно создан");
  const notifyError = (text: string) => toast.error(`Произошла ошибка! ${text}`);
  const { register, handleSubmit, formState: { errors } } = useForm<TCreateCategorySchema>({ resolver: zodResolver(createCategorySchema) });
  // const [parametersCount, setParametersCount] = useState(1);
  const [parameters, setParameters] = useState<string[][]>([['', '']]);


  const onSuccess = () => {
    notify();
  }

  const onError = (error: Error) => {
    notifyError(error.message);
  }

  const { createCategory, isPending } = useCreateCategoryMutation({ onSuccess, onError });

  const onSubmit = async (data: TCreateCategorySchema) => {
    const parametersToSend = parameters.reduce((acc, cur) => {
      acc[cur[0]] = cur[1].split('\n');
      return acc;
    }, {})
    data.parameters = parametersToSend;
    await createCategory(data);
  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.block}>
          <Input
            label='Название категории*'
            sizeInput='large'
            error={errors.name?.message}
            inputProps={{
              placeholder: '',
              id: 'create-сategory-name',
              autoComplete: 'new-passport',
              ...register('name')
            }}
          />
          <Input
            label='Описание'
            sizeInput='large'
            error={errors.description?.message}
            inputProps={{
              placeholder: '',
              id: 'create-сategory-description',
              autoComplete: 'new-passport',
              ...register('description')
            }}
          />

          {...parameters.map((x, i) =>
            <div key={`category add ${i}`} className={styles.parameterBlock}>
              <Input
                label='Название'
                sizeInput='small'
                error={errors.description?.message}
                inputProps={{
                  placeholder: '',
                  id: `create-сategory-parameter ${i}`,
                  defaultValue: parameters[i][0],
                  autoComplete: 'new-passport',
                  onChange: (e) => {
                    const pars = [...parameters];
                    pars[i][0] = String(e.target.value);
                    setParameters(pars);
                  }
                }}
              />
              <Textarea
                label='Допустимые значения'
                sizeInput='l'
                error={errors.description?.message}
                inputProps={{
                  placeholder: 'Значение    enter',
                  id: `create-сategory-parameter values ${i}`,
                  defaultValue: parameters[i][1],
                  autoComplete: 'new-passport',
                  onChange: (e) => {
                    const pars = [...parameters];
                    pars[i][1] = String(e.target.value);
                    setParameters(pars);
                  }
                }}
              />
            </div>
          )}

          {/* </div> */}
          <div className={styles.parametersButtons}>
            <Button
              type="button"
              // loading={isPending}
              size='large'
              variant='contained'
              onClick={() => setParameters([...parameters, ['', '']])}
            >
              Добавить
            </Button>
            <Button
              type="button"
              // loading={isPending}
              size='large'
              variant='outlined'
              onClick={() => setParameters(parameters.slice(0, parameters.length - 1))}
            >
              Убрать
            </Button>
          </div>
          <Button
            type="submit"
            loading={isPending}
            size='large'
            variant='contained'
          >
            Создать
          </Button>

        </div>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        limit={4}
      />
    </>
  );
}

export default CreateCategory;