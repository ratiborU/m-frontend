'use client'
import React from 'react';
import styles from "./editComment.module.css";
import Input from '@/components/UI/Input/Input';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { editCommentSchema, TEditCommentSchema, answerSchema, TAnswerSchema, EditCommentProps } from './models';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUpdateCommentMutation } from '@/hooks/comments/useUpdateCommentMutation';
import { useDeleteCommentMutation } from '@/hooks/comments/useDeleteCommentMutation';
import { useUpdateAnswerMutation } from '@/hooks/answers/useUpdateAnswerMutation';
import { useCreateAnswerMutation } from '@/hooks/answers/useCreateAnswerMutation';
import { useDeleteAnswerMutation } from '@/hooks/answers/useDeleteAnswerMutation';
import { useGetProductOptionsQuery } from '@/hooks/products/useGetProductOptionsQuery';
import { useGetPersonOptionsQuery } from '@/hooks/persons/useGetPersonOptionsQuery';
import SelectInput from '@/components/UI/SelectInput/SelectInput';

// в идеале разделить на 2 виджета
const EditComment = (props: EditCommentProps) => {
  const { id, text, rate, personId, productId, createdAt, updatedAt, answer } = props;
  // какая-то херня внизу
  const notify = () => toast.success("Комментарий успешно изменен");
  const notifyDelete = () => toast.success("Комментарий успешно удален");
  const notifyAnswer = () => toast.success("Ответ успешно сохранен");
  const notifyAnswerDelete = () => toast.success("Ответ успешно удален");
  const notifyError = (text: string) => toast.error(`Произошла ошибка! ${text}`);

  const { data: productOptions } = useGetProductOptionsQuery();
  const { data: personOptions } = useGetPersonOptionsQuery();

  const { register, handleSubmit, formState: { errors } } = useForm<TEditCommentSchema>({ resolver: zodResolver(editCommentSchema) });
  const { register: registerAnswer, handleSubmit: handleSubmitAnswer, formState: { errors: answerErrors } } = useForm<TAnswerSchema>({ resolver: zodResolver(answerSchema) });

  // мутации комментария
  const onSuccess = () => notify()
  const onError = (error: Error) => notifyError(error.message)
  const { updateComment, isPending } = useUpdateCommentMutation({ onSuccess, onError });

  const onSuccessDelete = () => notifyDelete()
  const onErrorDelete = (error: Error) => notifyError(error.message)
  const { deleteComment, isPending: isPendingDelete } = useDeleteCommentMutation({ onSuccess: onSuccessDelete, onError: onErrorDelete });

  const onSubmit = async (data: TEditCommentSchema) => await updateComment({ ...props, ...data })
  const onDelete = async () => await deleteComment(id)

  // мутации ответа
  const onSuccessAnswer = () => notifyAnswer()
  const onErrorAnswer = (error: Error) => notifyError(error.message)
  const { updateAnswer, isPending: isPendingAnswerUpdate } = useUpdateAnswerMutation({ onSuccess: onSuccessAnswer, onError: onErrorAnswer });
  const { createAnswer, isPending: isPendingAnswerCreate } = useCreateAnswerMutation({ onSuccess: onSuccessAnswer, onError: onErrorAnswer });

  const onSuccessAnswerDelete = () => notifyAnswerDelete()
  const onErrorAnswerDelete = (error: Error) => notifyError(error.message)
  const { deleteAnswer, isPending: isPendingAnswerDelete } = useDeleteAnswerMutation({ onSuccess: onSuccessAnswerDelete, onError: onErrorAnswerDelete });

  const onSubmitAnswer = async (data: TAnswerSchema) => {
    if (!answer) {
      await createAnswer({ ...data, commentId: String(id), personId: '1' });
    } else {
      await updateAnswer({ text: data.text, commentId: String(id), personId: '1', id: answer.id, createdAt, updatedAt, });
    }
  }
  const onDeleteAnswer = async () => {
    if (!!answer) {
      await deleteAnswer(answer.id)
    } else {
      notifyError('');
    }
  }

  // const onSubmitAnswer = async (data: TAnswerSchema) => {
  //   if (!answer) {
  //     await postAnswer({ ...data, commentId: String(id), personId: '1' });
  //   } else {
  //     await putAnswer({ ...answer, ...data, commentId: String(id), personId: '1' });
  //   }
  // }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.block}>
          <Input
            label='Комментарий'
            sizeInput='large'
            error={errors.text?.message}
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
            error={errors.rate?.message}
            inputProps={{
              placeholder: '',
              id: 'edit-person-first-name',
              autoComplete: 'new-passport',
              defaultValue: rate,
              ...register('rate')
            }}
          />

          {/* <Input
            label='ФИО'
            sizeInput='large'
            error={errors.personId?.message}
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
            error={errors.productId?.message}
            inputProps={{
              placeholder: '',
              id: 'edit-person-email',
              autoComplete: 'new-passport',
              defaultValue: productId,
              ...register('productId')
            }}
          /> */}
          <SelectInput
            label='ФИО'
            sizeInput='large'
            selectProps={{
              ...register('personId'),
              defaultValue: personId,
            }}
            options={personOptions || []}
          />

          <SelectInput
            label='Продукт'
            sizeInput='large'
            selectProps={{
              ...register('productId'),
              defaultValue: productId,
            }}
            options={productOptions || []}
          />

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
              size='large'
              variant='outlined'
              onClick={onDelete}
            >
              Удалить
            </Button>
          </div>
        </div>
      </form>
      <form onSubmit={handleSubmitAnswer(onSubmitAnswer)}>
        <div className={styles.block}>
          <Input
            label='Комментарий'
            sizeInput='large'
            error={answerErrors.text?.message}
            inputProps={{
              placeholder: '',
              id: 'edit-person-second-name1',
              autoComplete: 'new-passport',
              defaultValue: answer?.text,
              ...registerAnswer('text')
            }}
          />
          <div className={styles.buttons}>
            <Button
              loading={isPendingAnswerUpdate || isPendingAnswerCreate}
              type="submit"
              size='large'
              variant='contained'
            >
              Сохранить
            </Button>
            <Button
              loading={isPendingAnswerDelete}
              size='large'
              variant='outlined'
              onClick={onDeleteAnswer}
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

export default EditComment;