'use client'
import React from 'react';
import styles from "./createProduct.module.css";
import Input from '@/components/UI/Input/Input';
import Textarea from '@/components/UI/Textarea/Textarea';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { postProduct } from './action';
import { ProductScheme } from './models';
import InputFile from '@/components/UI/InputFile/InputFile';


const CreateProduct = () => {
  const { register, handleSubmit, getValues } = useForm<ProductScheme>();

  const onSubmit = async (data: ProductScheme) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('characteristics', data.characteristics);
    formData.append('price', data.price);
    formData.append('rate', '0');
    formData.append('commentsCount', '0');
    formData.append('file', data.file[0]);
    console.log(getValues('file')[0].name)
    await postProduct(formData);
  }

  // useEffect(() => {
  //   if (getValues('file') && getValues('file').length != 0) {
  //     setFileName(getValues('file')[0].name);
  //   }
  // }, [getValues, register]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.block}>
        <Input
          label='Название'
          sizeInput='large'
          inputProps={{
            placeholder: '',
            id: 'create-product-title',
            autoComplete: 'new-passport',
            ...register('title')
          }}
        />
        <Textarea
          label='Описание'
          inputProps={{
            placeholder: "",
            id: 'create-product-description',
            autoComplete: 'new-passport',
            ...register('description')
          }}
        />
        <Textarea
          label='Характеристики'
          inputProps={{
            placeholder: "",
            id: 'create-product-characteristics',
            autoComplete: 'new-passport',
            ...register('characteristics')
          }}
        />
        <div className={styles.inputs}>
          <Input
            label='Цена'
            sizeInput='small'
            inputProps={{
              placeholder: '',
              id: 'create-product-price',
              autoComplete: 'new-passport',
              ...register('price')
            }}
          />
          {/* Пока не реализовано на сервере */}
          <Input
            label='В наличии'
            sizeInput='small'
            inputProps={{
              placeholder: '',
              id: 'create-product-have',
              autoComplete: 'new-passport',
              disabled: true
            }}
          />
        </div>
        <InputFile
          inputProps={{
            id: 'load-image',
            ...register('file')
          }}
        />
        <div className={styles.buttons}>
          <Button type="submit" size='large' variant='contained'>Создать</Button>
          <Button size='large' variant='outlined'>Удалить</Button>
        </div>
      </div>
    </form>
  );
};

export default CreateProduct;