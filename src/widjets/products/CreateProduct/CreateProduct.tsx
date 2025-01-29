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
  // добавить валидацию по zod
  const { register, handleSubmit, getValues } = useForm<ProductScheme>();

  const onSubmit = async (data: ProductScheme) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('seoTitle', data.seoTitle);
    formData.append('seoDescription', data.seoDescription);
    formData.append('characteristics', data.characteristics);
    formData.append('price', data.price);
    formData.append('discount', data.discount);
    formData.append('rate', '0');
    formData.append('commentsCount', '0');
    formData.append('productsCount', data.productsCount);
    formData.append('categoryId', data.categoryId);
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
            ...register('name')
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
        <Input
          label='Seo Title'
          sizeInput='large'
          inputProps={{
            placeholder: '',
            id: 'create-product-seo-title',
            autoComplete: 'new-passport',
            ...register('seoTitle')
          }}
        />
        <Textarea
          label='Seo Description'
          inputProps={{
            placeholder: "",
            id: 'create-product-seo-description',
            autoComplete: 'new-passport',
            ...register('seoDescription')
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
          <Input
            label='Скидка'
            sizeInput='small'
            inputProps={{
              placeholder: '',
              id: 'create-product-discount',
              autoComplete: 'new-passport',
              ...register('discount')
            }}
          />
        </div>
        <div className={styles.inputs}>
          <Input
            label='В наличии'
            sizeInput='small'
            inputProps={{
              placeholder: '',
              id: 'create-product-have',
              autoComplete: 'new-passport',
              ...register('productsCount')
              // disabled: true
            }}
          />
          <Input
            label='Категория'
            sizeInput='small'
            inputProps={{
              placeholder: '',
              id: 'create-product-categoryId',
              autoComplete: 'new-passport',
              ...register('categoryId')
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