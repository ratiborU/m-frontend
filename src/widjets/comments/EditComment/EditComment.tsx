'use client'
import React from 'react';
import styles from "./editComment.module.css";
import Input from '@/components/UI/Input/Input';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { postAnswer, postPerson, putAnswer } from './action';
import { AnswerScheme, EditPersonProps, PersonScheme } from './models';
// import { TComment } from '@/services/types/commentType';


const EditComment = (props: EditPersonProps) => {
  const { id, text, rate, personId, productId, answer } = props;

  const { register, handleSubmit } = useForm<PersonScheme>();
  const { register: registerAnswer, handleSubmit: handleSubmitAnswer } = useForm<AnswerScheme>();

  const onSubmit = async (data: PersonScheme) => {
    await postPerson({ ...props, ...data });
  }

  const onSubmitAnswer = async (data: AnswerScheme) => {
    if (!answer) {
      await postAnswer({ ...data, commentId: String(id), personId: '1' });
    } else {
      await putAnswer({ ...answer, ...data, commentId: String(id), personId: '1' });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.block}>
          <Input
            label='Комментарий'
            sizeInput='large'
            inputProps={{
              placeholder: '',
              id: 'edit-person-second-name',
              autoComplete: 'new-passport',
              defaultValue: text,
              ...register('text')
            }}
          />
          <Input
            label='Оценка'
            sizeInput='large'
            inputProps={{
              placeholder: '',
              id: 'edit-person-first-name',
              autoComplete: 'new-passport',
              defaultValue: rate,
              ...register('rate')
            }}
          />
          <Input
            label='ФИО'
            sizeInput='large'
            inputProps={{
              placeholder: '',
              id: 'edit-person-father-name',
              autoComplete: 'new-passport',
              defaultValue: personId,
              ...register('personId')
            }}
          />
          <Input
            label='Продукт'
            sizeInput='large'
            inputProps={{
              placeholder: '',
              id: 'edit-person-email',
              autoComplete: 'new-passport',
              defaultValue: productId,
              ...register('productId')
            }}
          />

          <div className={styles.buttons}>
            <Button type="submit" size='large' variant='contained'>Сохранить</Button>
            <Button size='large' variant='outlined'>Удалить</Button>
          </div>
        </div>
      </form>
      <form onSubmit={handleSubmitAnswer(onSubmitAnswer)}>
        <div className={styles.block}>
          <Input
            label='Комментарий'
            sizeInput='large'
            inputProps={{
              placeholder: '',
              id: 'edit-person-second-name1',
              autoComplete: 'new-passport',
              defaultValue: answer?.text,
              ...registerAnswer('text')
            }}
          />
          {/* <Input
            label='Оценка'
            sizeInput='large'
            inputProps={{
              placeholder: '',
              id: 'edit-person-first-name1',
              autoComplete: 'new-passport',
              defaultValue: answer?.personId,
              ...registerAnswer('personId')
            }}
          />
          <Input
            label='ФИО'
            sizeInput='large'
            inputProps={{
              placeholder: '',
              id: 'edit-person-father-name1',
              autoComplete: 'new-passport',
              defaultValue: answer?.commentId,
              ...registerAnswer('commentId')
            }}
          /> */}
          <div className={styles.buttons}>
            <Button type="submit" size='large' variant='contained'>Сохранить</Button>
            <Button size='large' variant='outlined'>Удалить</Button>
          </div>
        </div>

      </form>
    </>

  );
};

export default EditComment;