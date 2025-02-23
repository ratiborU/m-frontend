'use client'
import React from 'react';
import styles from "./editProduct.module.css";
import Input from '@/components/UI/Input/Input';
import Textarea from '@/components/UI/Textarea/Textarea';
import { useForm } from 'react-hook-form';
import { putProduct, postImage, deleteImage } from './action';
import Image from 'next/image';
import EditImage from '@/components/EditImage/EditImage';
import { MainImageScheme, ImageScheme, EditProductProps } from './models';
import InputFile from '@/components/UI/InputFile/InputFile';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUpdateProductMutation } from '@/hooks/products/useUpdateProductMutation';
import { Button } from '@mui/material'
import { useDeleteProductMutation } from '@/hooks/products/useDeleteProductMutation';


const editProductSchema = z.object({
  name: z.string().min(1, 'мало'),
  description: z.string().min(1, 'мало'),
  seoTitle: z.string().min(1, 'мало'),
  seoDescription: z.string().min(1, 'мало'),
  characteristics: z.string().min(1, 'мало'),
  price: z.string().min(1, 'мало'),
  discount: z.string().min(1, 'мало'),
  categoryId: z.string().min(1, 'мало'),
  productsCount: z.string().min(1, 'мало'),
})

type TEditProductSchema = z.infer<typeof editProductSchema>;


const EditProduct = (props: EditProductProps) => {
  const {
    id,
    name,
    description,
    seoTitle,
    seoDescription,
    characteristics,
    price,
    discount,
    rate,
    commentsCount,
    productsCount,
    categoryId,
    mainImage,
    images
    // createdAt,
    // updatedAt
  } = props;

  const notify = () => toast.success("Товар успешно изменен!");
  const notifyDelete = () => toast.success("Товар успешно удален!");
  const notifyError = (text: string) => toast.error(`Произошла ошибка! ${text}`);

  // добавить мутации для загрузки изображений
  const { register, handleSubmit, formState: { errors } } = useForm<TEditProductSchema>({ resolver: zodResolver(editProductSchema) });
  const { register: registerMainImage, handleSubmit: handleSubmitMainImage } = useForm<MainImageScheme>();
  const { register: registerImage, handleSubmit: handleSubmitImage } = useForm<ImageScheme>();

  const onSuccess = () => {
    notify();
  }

  const onError = (error: Error) => {
    notifyError(error.message);
  }

  const { updateProduct, isPending } = useUpdateProductMutation({ onSuccess, onError });

  const onSuccessDelete = () => {
    notifyDelete();
  }

  const onErrorDelete = (error: Error) => {
    notifyError(error.message);
  }

  const { deleteProduct, isPending: isPendingDelete } = useDeleteProductMutation({ onSuccess: onSuccessDelete, onError: onErrorDelete });

  const onSubmitData = async (data: TEditProductSchema) => {
    const formData = new FormData();
    formData.append('id', String(id));
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
    await updateProduct(formData);
  }

  const onDelete = async () => {
    await deleteProduct(id);
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
    <>
      <div className={styles.flex}>
        <form onSubmit={handleSubmit(onSubmitData)}>
          <div className={styles.block}>
            <Input
              label='Название'
              sizeInput='large'
              error={errors.name?.message}
              inputProps={{
                placeholder: '',
                id: 'edit-product-title',
                autoComplete: 'new-passport',
                defaultValue: name,
                ...register('name'),
              }}
            />
            <Textarea
              label='Описание'
              error={errors.description?.message}
              inputProps={{
                placeholder: "",
                id: 'create-product-description',
                autoComplete: 'new-passport',
                defaultValue: description,
                ...register('description')
              }}
            />
            <Input
              label='Название'
              sizeInput='large'
              error={errors.seoTitle?.message}
              inputProps={{
                placeholder: '',
                id: 'edit-product-seo-title',
                autoComplete: 'new-passport',
                defaultValue: seoTitle,
                ...register('seoTitle'),
              }}
            />
            <Textarea
              label='Описание'
              error={errors.seoDescription?.message}
              inputProps={{
                placeholder: "",
                id: 'create-product-seo-description',
                autoComplete: 'new-passport',
                defaultValue: seoDescription,
                ...register('seoDescription')
              }}
            />
            <Textarea
              label='Характеристики'
              error={errors.characteristics?.message}
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
                error={errors.price?.message}
                inputProps={{
                  placeholder: '',
                  id: 'create-product-price',
                  autoComplete: 'new-passport',
                  defaultValue: price,
                  ...register('price')
                }}
              />
              <Input
                label='Скидка'
                sizeInput='small'
                error={errors.discount?.message}
                inputProps={{
                  placeholder: '',
                  id: 'create-product-discount',
                  autoComplete: 'new-passport',
                  defaultValue: discount,
                  ...register('discount')
                }}
              />
            </div>
            <div className={styles.inputs}>
              {/* Пока не реализовано на сервере */}
              <Input
                label='В наличии x'
                sizeInput='small'
                error={errors.productsCount?.message}
                inputProps={{
                  placeholder: '',
                  id: 'create-product-have',
                  autoComplete: 'new-passport',
                  defaultValue: productsCount,
                  ...register('productsCount')
                }}
              />
              <Input
                label='Категория'
                sizeInput='small'
                error={errors.categoryId?.message}
                inputProps={{
                  placeholder: '',
                  id: 'create-product-category',
                  autoComplete: 'new-passport',
                  defaultValue: categoryId,
                  ...register('categoryId')
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
                  // ...register('rate'),
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
                  // ...register('commentsCount'),
                  disabled: true
                }}
              />
            </div>
            <div className={styles.buttons}>
              <Button
                loading={isPending}
                type="submit"
                size='large'
                variant='contained'
              >
                Сохранить
              </Button>
              <Button
                loading={isPendingDelete}
                size='large'
                variant='outlined'
                onClick={onDelete}
              >
                Удалить
              </Button>
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
            <Button
              // loading={isPending}
              type='submit'
              variant='contained'
            >
              Сохранить картинку
            </Button>
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
            <Button
              type='submit'
              variant='contained'
            >
              Добавить картинку
            </Button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        limit={4}
      />
    </>

  );
};

export default EditProduct;