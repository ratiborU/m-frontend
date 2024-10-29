'use client'
import React from 'react';
import styles from "./editProduct.module.css";
import Input from '@/components/UI/Input/Input';
import Textarea from '@/components/UI/Textarea/Textarea';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { putProduct, postImage, deleteImage } from './action';
import Image from 'next/image';
import EditImage from '@/components/EditImage/EditImage';
import { ProductScheme, MainImageScheme, ImageScheme, EditProductProps } from './models';
import InputFile from '@/components/UI/InputFile/InputFile';

// раскидать все по 3 разным файлам
const EditProduct = (props: EditProductProps) => {
  const {
    id,
    title,
    description,
    characteristics,
    price,
    rate,
    commentsCount,
    mainImage,
    images
    // createdAt,
    // updatedAt
  } = props;

  const { register, handleSubmit } = useForm<ProductScheme>();
  const { register: registerMainImage, handleSubmit: handleSubmitMainImage } = useForm<MainImageScheme>();
  const { register: registerImage, handleSubmit: handleSubmitImage } = useForm<ImageScheme>();

  const onSubmitData = async (data: ProductScheme) => {
    const formData = new FormData();
    formData.append('id', String(id));
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('characteristics', data.characteristics);
    formData.append('price', data.price);
    formData.append('rate', '0');
    formData.append('commentsCount', '0');
    await putProduct(formData);
  }

  const onSubmitMainImage = async (data: MainImageScheme) => {
    const formData = new FormData();
    formData.append('id', String(id));
    formData.append('file', data.file[0]);
    await putProduct(formData);
  }

  const onSubmitImage = async (data: ImageScheme) => {
    const formData = new FormData();
    formData.append('productId', String(id));
    formData.append('img', data.img[0]);
    await postImage(formData);
  }

  return (
    <div className={styles.flex}>
      <form onSubmit={handleSubmit(onSubmitData)}>
        <div className={styles.block}>
          <Input
            label='Название'
            sizeInput='large'
            inputProps={{
              placeholder: '',
              id: 'edit-product-title',
              autoComplete: 'new-passport',
              defaultValue: title,
              ...register('title'),
            }}
          />
          <Textarea
            label='Описание'
            inputProps={{
              placeholder: "",
              id: 'create-product-description',
              autoComplete: 'new-passport',
              defaultValue: description,
              ...register('description')
            }}
          />
          <Textarea
            label='Характеристики'
            inputProps={{
              placeholder: "",
              id: 'create-product-characteristics',
              autoComplete: 'new-passport',
              defaultValue: characteristics,
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
                defaultValue: price,
                ...register('price')
              }}
            />
            {/* Пока не реализовано на сервере */}
            <Input
              label='В наличии x'
              sizeInput='small'
              inputProps={{
                placeholder: '',
                id: 'create-product-have',
                autoComplete: 'new-passport',
                defaultValue: '',
                // ...register('have')
              }}
            />
          </div>
          <div className={styles.inputs}>
            <Input
              label='Оценка'
              sizeInput='small'
              inputProps={{
                placeholder: '',
                id: 'create-product-rate',
                autoComplete: 'new-passport',
                defaultValue: rate,
                ...register('rate'),
                disabled: true
              }}
            />
            <Input
              label='Комментариев'
              sizeInput='small'
              inputProps={{
                placeholder: '',
                id: 'create-product-comments',
                autoComplete: 'new-passport',
                defaultValue: commentsCount,
                ...register('commentsCount'),
                disabled: true
              }}
            />
          </div>
          <div className={styles.buttons}>
            <Button type="submit" size='large' variant='contained'>Сохранить</Button>
            <Button size='large' variant='outlined'>Удалить</Button>
          </div>
        </div>
      </form>

      <div className={styles.imageBlock}>
        <Image
          src={`http://localhost:5000/${mainImage}`}
          alt={''}
          width={400}
          height={400}
        />

        <form className={styles.formImageButtons} onSubmit={handleSubmitMainImage(onSubmitMainImage)}>
          <InputFile
            inputProps={{
              ...registerMainImage('file')
            }}
          />
          {/* <input
            className={styles.addImage}
            type="file"
            {...registerMainImage('file')}
          /> */}
          <Button type='submit' variant='contained'>Сохранить картинку</Button>
        </form>

        <div className={styles.images}>
          {...images?.map((x) =>
            <EditImage
              key={x.id}
              src={`http://localhost:5000/${x.path}`}
              alt=''
              width={90}
              height={90}
              onClick={() => deleteImage(String(x.id))}
            />
          )}
        </div>

        <form className={styles.formImageButtons} onSubmit={handleSubmitImage(onSubmitImage)}>
          <InputFile
            inputProps={{
              ...registerImage('img')
            }}
          />
          <Button type='submit' variant='contained'>Добавить картинку</Button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;