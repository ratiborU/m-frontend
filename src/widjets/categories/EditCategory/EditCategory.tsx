'use client'
import React, { useEffect, useState } from 'react';
import styles from "./editCategory.module.css";
import Input from '@/components/UI/Input/Input';
import { Button } from '@mui/material';
import { TCategory } from '@/services/api/categories/categoryType';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUpdateCategoryMutation } from '@/hooks/categories/useUpdateCategoryMutation';
import { useDeleteCategoryMutation } from '@/hooks/categories/useDeleteCategoryMutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import Textarea from '@/components/UI/Textarea/Textarea';

export const editCategorySchema = z.object({
  name: z.string().min(1, 'мало'),
  description: z.string().min(1, 'мало'),
})

export type TEditCategorySchema = z.infer<typeof editCategorySchema>;


const EditCategory = (props: TCategory) => {
  const { name, description, parameters } = props;
  const [parametersState, setParametersState] = useState<string[][]>([['', '']]);

  const notify = () => toast.success("Пользователь успешно изменен!");
  const notifyDelete = () => toast.success("Пользователь успешно удален!");
  const notifyError = (text: string) => toast.error(`Произошла ошибка! ${text}`);

  const { register, handleSubmit, formState: { errors } } = useForm<TEditCategorySchema>({ resolver: zodResolver(editCategorySchema) });

  useEffect(() => {
    const newParameters = Object.entries(parameters).map(x => [x[0], x[1].join('\n')]);
    setParametersState(newParameters);
  }, [parameters])

  const onSuccess = () => {
    notify();
  }

  const onError = (error: Error) => {
    notifyError(error.message);
  }

  const { updateCategory, isPending } = useUpdateCategoryMutation({ onSuccess, onError });

  const onSuccessDelete = () => {
    notifyDelete();
  }

  const onErrorDelete = (error: Error) => {
    notifyError(error.message);
  }

  const { deleteCategory, isPending: isPendingDelete } = useDeleteCategoryMutation({ onSuccess: onSuccessDelete, onError: onErrorDelete });

  const onSubmit = async (data: TEditCategorySchema) => {
    const parametersStateToSend = parametersState.reduce((acc, cur) => {
      acc[cur[0]] = cur[1].split('\n');
      return acc;
    }, {})
    data.parameters = parametersStateToSend;
    await updateCategory({ ...props, ...data });
  }

  const onDelete = async () => {
    await deleteCategory(props.id);
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
              id: 'edit-Category-second-name',
              autoComplete: 'new-passport',
              defaultValue: name,
              ...register('name')
            }}
          />
          <Input
            label='Имя'
            sizeInput='large'
            inputProps={{
              placeholder: '',
              id: 'edit-Category-first-name',
              autoComplete: 'new-passport',
              defaultValue: description,
              ...register('description')
            }}
          />
          {...parametersState.map((x, i) =>
            <div key={`category add ${i}`} className={styles.parameterBlock}>
              <Input
                label='Название'
                sizeInput='small'
                error={errors.description?.message}
                inputProps={{
                  placeholder: '',
                  id: `create-сategory-parameter ${i}`,
                  defaultValue: parametersState[i][0],
                  autoComplete: 'new-passport',
                  onChange: (e) => {
                    const pars = [...parametersState];
                    pars[i][0] = String(e.target.value);
                    setParametersState(pars);
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
                  defaultValue: parametersState[i][1],
                  autoComplete: 'new-passport',
                  onChange: (e) => {
                    const pars = [...parametersState];
                    pars[i][1] = String(e.target.value);
                    setParametersState(pars);
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
              onClick={() => setParametersState([...parametersState, ['', '']])}
            >
              Добавить
            </Button>
            <Button
              type="button"
              // loading={isPending}
              size='large'
              variant='outlined'
              onClick={() => setParametersState(parametersState.slice(0, parametersState.length - 1))}
            >
              Убрать
            </Button>
          </div>
          <div className={styles.buttons}>
            <Button
              loading={isPending}
              type="submit"
              size='large'
              variant='contained'
            >
              Сохранить
            </Button>
            <Button
              loading={isPendingDelete}
              onClick={onDelete}
              size='large'
              variant='outlined'
            >
              Удалить
            </Button>
          </div>
        </div>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        limit={4}
      />
    </>
  );
};

export default EditCategory;