'use client'
import BaseGrid from '@/widjets/BaseGrid/BaseGrid';
import React, { useState } from 'react';
import { productColumns } from './columns';
// import { getAllComments } from '@/services/api/comments/commentService';
import styles from './commentsTable.module.css'
import { TComment } from '@/services/api/comments/commentType';
import Input from '@/components/UI/Input/Input';
import SelectInput from '@/components/UI/SelectInput/SelectInput';
import { useDebouncedCallback } from 'use-debounce';

type CommentsTableProps = {
  comments?: TComment[];
}

const optionsOrdered = [
  { value: "all", text: "Все комментарии" },
  { value: "answered", text: "С ответом" },
  { value: "notanswered", text: "Без ответа" },
]

const CommentsTable = (props: CommentsTableProps) => {
  const { comments = [] } = props;

  const [commentsState, setCommentsState] = useState(comments);
  const [search, setSearch] = useState('');
  const [answeredFilter, setAnsweresFilter] = useState('all');
    
  const debounce = useDebouncedCallback(() => {
      const filteredProducts = comments.filter(p => 
        p.text.toLowerCase().includes(search.toLowerCase()) || 
        `${p.person.secondName} ${p.person.firstName} ${p.person.fatherName}`.toLowerCase().includes(search.toLowerCase())
      );
      if (answeredFilter == 'all') {
        setCommentsState(filteredProducts);
      } else if (answeredFilter == 'answered') {
        setCommentsState(filteredProducts.filter(p => !!p.answer));
      } else if (answeredFilter == 'notanswered') {
        setCommentsState(filteredProducts.filter(p => !p.answer));
      }
    }, 500)

  return (
    <div className={styles.block}>
      <div className={styles.inputs}>
        <Input inputProps={{
          placeholder: '',
          onChange: e => {
            setSearch(e.target.value);
            debounce();
          }
        }}
          label={'Поиск'}
          sizeInput='medium'
        />
        <SelectInput selectProps={{
          defaultValue: 'all',
          onChange: e => {
            setAnsweresFilter(e.target.value);
            debounce();
          }
        }}
          label={'Дата заказа'}
          sizeInput='small'
          options={optionsOrdered}
        />
      </div>
      <BaseGrid columns={productColumns} data={commentsState} />
    </div>
  );
};

export default CommentsTable;