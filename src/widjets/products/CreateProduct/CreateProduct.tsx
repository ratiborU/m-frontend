'use client'
import React from 'react';
import styles from "./createProduct.module.css";
import Input from '@/components/UI/Input/Input';
import Textarea from '@/components/UI/Textarea/Textarea';
// import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
// import { postProduct } from './action';
// import { ProductScheme } from './models';
import InputFile from '@/components/UI/InputFile/InputFile';
import { useCreateProductMutation } from '@/hooks/products/useCreateProductMutation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const createProductSchema = z.object({
  name: z.string().min(1, 'мало'),
  description: z.string(),
  seoTitle: z.string(),
  seoDescription: z.string(),
  characteristics: z.string(),
  price: z.string(),
  discount: z.string(),
  // rate: z.string(),
  categoryId: z.string(),
  productsCount: z.string(),
  file: z.instanceof(FileList),
})
type TCreateProductSchema = z.infer<typeof createProductSchema>;

const CreateProduct = () => {
  const notify = () => toast.success("Товар успешно создан");
  const notifyError = (text: string) => toast.error(`Произошла ошибка! ${text}`);
  // добавить валидацию по zod
  const { register, handleSubmit, formState: { errors } } = useForm<TCreateProductSchema>({ resolver: zodResolver(createProductSchema) });

  const onSuccess = () => {
    notify();
  }

  const onError = (error: Error) => {
    notifyError(error.message);
  }

  const { createProduct, isPending } = useCreateProductMutation({ onSuccess, onError });

  const onSubmit = async (data: TCreateProductSchema) => {
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
    await createProduct(formData);
  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.block}>
          <Input
            label='Название'
            sizeInput='large'
            error={errors.name?.message}
            inputProps={{
              placeholder: '',
              id: 'create-product-title',
              autoComplete: 'new-passport',
              ...register('name')
            }}
          />
          {/* {errors.name && <p className='error-form-message'>{`${errors.name.message}`}</p>} */}
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
          <LoadingButton
            loading={isPending}
            type="submit"
            size='large'
            variant='contained'
          >
            Создать
          </LoadingButton>
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

export default CreateProduct;