'use client'
import { TComment } from '@/services/api/comments/commentType';
import React from 'react';
import styles from './comment.module.css'
import star from '../../../public/Star rate.svg'
import starGray from '../../../public/Star rate gray filled.svg'
import Image from 'next/image';

const Comment = (props: TComment) => {
  const { id, text, rate, createdAt, person, } = props;
  return (
    <div className={styles.comment}>
      <div className={styles.commentInformation}>
        <p className={styles.name}>{person.secondName} {person.firstName}</p>
        <div className={styles.rate}>
          {[...Array(Number(rate))].map((_x, i) => <Image key={`comment home: ${id} ${i}`} src={star} alt='' />)}
          {[...Array(5 - Number(rate))].map((_x, i) => <Image key={`comment home: ${id} ${i + rate}`} src={starGray} alt='' />)}
        </div>
        <p className={styles.date}>{createdAt.slice(0, 10)}</p>
      </div>
      <p className={styles.commentText}>{text}</p>
    </div>
  );
};

export default Comment;