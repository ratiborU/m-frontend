'use client'

import { TProduct } from '@/services/api/products/productType';
import React, { useState } from 'react';
import styles from './leaveComment.module.css';
import Image from 'next/image';
import star from '../../../public/Star rate.svg'
import starGrey from '../../../public/Star rate gray filled.svg'
import Textarea from '../UI/Textarea/Textarea';
import Button from '../UI/Button/Button';
// import { Button } from '@mui/material';
import InputRate from '../UI/InputRate/InputRate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCreateCommentMutation } from '@/hooks/comments/useCreateCommentMutation';
import { useUpdateCommentMutation } from '@/hooks/comments/useUpdateCommentMutation';
import { useDeleteCommentMutation } from '@/hooks/comments/useDeleteCommentMutation';
import { TComment } from '@/services/api/comments/commentType';
import { usePersonContext } from '@/providers/PersonProvider/hooks/usePersonContext';

type LeaveCommentProps = {
  product: TProduct,
  comment?: TComment,
}

const commentSchema = z.object({
  text: z.string().min(1, 'мало'),
})

type TCommentSchema = z.infer<typeof commentSchema>;

const LeaveComment = (props: LeaveCommentProps) => {
  const { product, comment } = props;
  const [rate, setRate] = useState(Number(comment?.rate) || 0)
  const person = usePersonContext();

  const { register, handleSubmit } = useForm<TCommentSchema>({ resolver: zodResolver(commentSchema) });

  const { createComment } = useCreateCommentMutation({});
  const { updateComment } = useUpdateCommentMutation({});
  const { deleteComment } = useDeleteCommentMutation({});

  const onSubmit = async (data: TCommentSchema) => {
    if (comment) {
      await updateComment({
        ...comment,
        text: data.text,
        rate: String(rate)
      })
    } else {
      await createComment({
        text: data.text,
        rate: String(rate),
        personId: person.id,
        productId: product.id,
      })
    }
  }

  const onDelete = async () => {
    if (comment) {
      await deleteComment(comment?.id);
    }
  }

  return (
    <div className={styles.leaveComment}>
      <div className={styles.rateBlock}>
        <p className={styles.rate}>{product.rate}</p>
        <div className={styles.rateStars}>
          {[...Array(Number(Math.round(Number(product.rate))))].map((_x, i) => <Image key={`comment home: ${product.id} ${i}`} src={star} alt='' width={24} height={24} />)}
          {[...Array(5 - Number(Math.round(Number(product.rate))))].map((_x, i) => <Image key={`comment home: ${product.id} ${i + product.rate}`} src={starGrey} alt='' width={24} height={24} />)}
        </div>
        <p className={styles.commentsCount}>{product.commentsCount} отзывов</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <InputRate rate={rate} setRate={(value: number) => setRate(value)} />
        <Textarea
          label='Ваш комментарий'
          inputProps={{
            ...register('text'),
            placeholder: '',
            id: 'leave-comment',
            defaultValue: comment?.text || '',
            style: {
              height: 120,
              minHeight: 120,
            }
          }}
        />
        <div className={styles.buttons}>
          <Button
            text={'Сохранить'}
            size={'xs'}
            buttonProps={{
              style: {
                maxWidth: 200
              }
            }}
          />
          {
            comment && <Button
              text={'Удалить'}
              size={'xs'}
              type='outlined'
              onClick={onDelete}
              buttonProps={{
                type: 'button',
                style: {
                  maxWidth: 200
                }
              }}
            />
          }
        </div>
      </form>
      {/* <p className={styles.text}>Получите от 20 до 50 баллов за отзыв!</p> */}
    </div>
  );
};

export default LeaveComment;