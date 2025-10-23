'use client'
import { TPerson } from '@/services/api/persons/personType';
import { TPagination } from '@/services/types/paginationType';
import BaseGrid from '@/widjets/BaseGrid/BaseGrid';
import React from 'react';
import { productColumns } from './columns';
import styles from './personsTable.module.css'
import Input from '@/components/UI/Input/Input';

type PersonsTableProps = {
  persons: TPagination<TPerson>
}

const PersonsTable = (props: PersonsTableProps) => {
  const { persons } = props;

  return (
    <div className={styles.block}>
      <div className={styles.inputs}>
        <Input inputProps={{
          placeholder: ''
        }}
          label={'Поиск'}
          sizeInput='medium'
        />
      </div>
      <BaseGrid columns={productColumns} data={persons.rows.filter(x => x.firstName != '')} />
    </div>
  );
};

export default PersonsTable;