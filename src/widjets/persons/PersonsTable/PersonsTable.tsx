'use client'
import { TPerson } from '@/services/api/persons/personType';
import { TPagination } from '@/services/types/paginationType';
import BaseGrid from '@/widjets/BaseGrid/BaseGrid';
import React, { useState } from 'react';
import { productColumns } from './columns';
import styles from './personsTable.module.css'
import Input from '@/components/UI/Input/Input';
import { useDebouncedCallback } from 'use-debounce';

type PersonsTableProps = {
  persons: TPerson[]
}

const PersonsTable = (props: PersonsTableProps) => {
  const { persons } = props;

  const [personsState, setPersonsState] = useState(persons);
  const [search, setSearch] = useState('');

  const debounce = useDebouncedCallback(() => {
      const filteredPersons = persons.filter(p => 
        `${p.secondName} ${p.firstName} ${p.fatherName}`.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase()) ||
        p.phoneNumber.toLowerCase().includes(search.toLowerCase())
      );
      setPersonsState(filteredPersons);
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
      </div>
      <BaseGrid columns={productColumns} data={personsState} />
    </div>
  );
};

export default PersonsTable;