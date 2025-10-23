'use client'
import BaseGrid from '@/widjets/BaseGrid/BaseGrid';
import React from 'react';
import { productColumns } from './columns';
// import { getAllComments } from '@/services/api/comments/commentService';
import styles from './commentsTable.module.css'
import { TComment } from '@/services/api/comments/commentType';
import Input from '@/components/UI/Input/Input';
import SelectInput from '@/components/UI/SelectInput/SelectInput';

type CommentsTableProps = {
  comments?: TComment[];
}

const optionsOrdered = [
  { value: "all", text: "Все комментарии" },
  { value: "answered", text: "Без ответа" },
  { value: "notanswered", text: "С ответом" },
]

const CommentsTable = (props: CommentsTableProps) => {
  const { comments = [] } = props;
  // const products = await getAllComments();

  return (
    <div className={styles.block}>
      <div className={styles.inputs}>
        <Input inputProps={{
          placeholder: ''
        }}
          label={'Поиск'}
          sizeInput='medium'
        />
        <SelectInput selectProps={{
          defaultValue: 'all'
        }}
          label={'Дата заказа'}
          sizeInput='small'
          options={optionsOrdered}
        />
      </div>
      <BaseGrid columns={productColumns} data={comments} />
    </div>
  );
};

export default CommentsTable;