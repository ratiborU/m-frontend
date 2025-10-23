'use client'
import React, { useEffect, useState } from 'react';
import styles from "./editProduct.module.css";
import Input from '@/components/UI/Input/Input';
import Textarea from '@/components/UI/Textarea/Textarea';
import { useForm } from 'react-hook-form';
// import { putProduct, postImage, deleteImage } from './action';
import Image from 'next/image';
import EditImage from '@/components/EditImage/EditImage';
import { MainImageScheme, ImageScheme, EditProductProps } from './models';
import InputFile from '@/components/UI/InputFile/InputFile';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUpdateProductMutation } from '@/hooks/products/useUpdateProductMutation';
import { Button } from '@mui/material'
import { useDeleteProductMutation } from '@/hooks/products/useDeleteProductMutation';
import { editProductSchema, TEditProductSchema } from './models';
import { useGetCategoryOptionsQuery } from '@/hooks/categories/useGetCategoryOptions';
import SelectInput from '@/components/UI/SelectInput/SelectInput';
import { createImage, deleteImage } from '@/services/api/images/imageService';
import { useGetCategoriesQuery } from '@/hooks/categories/useGetAllCategoriesQuery';
// import { stoneOptions, sizeOptions, fasteningTypeOptions, materialOptions, amountOptions } from '@/services/api/products/productOtherOptions';


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
    images,
    categoryCharacteristics
    // stone,
    // size,
    // material,
    // fasteningType,
    // amount
    // createdAt,
    // updatedAt
  } = props;

  const notify = () => toast.success("Товар успешно изменен!");
  const notifyDelete = () => toast.success("Товар успешно удален!");
  const notifyError = (text: string) => toast.error(`Произошла ошибка! ${text}`);
  const [categoryIdState, setCategoryIdState] = useState(categoryId);
  const [categoryParameters, setCategoryParameters] = useState({});
  const [categoryParametersToSend, setCategoryParametersToSend] = useState({});


  const { data: categoryOptions } = useGetCategoryOptionsQuery();
  const { data: categories } = useGetCategoriesQuery();

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
    formData.append('rate', rate);
    formData.append('commentsCount', commentsCount);
    formData.append('productsCount', data.productsCount);
    formData.append('categoryId', data.categoryId);
    formData.append('categoryCharacteristics', JSON.stringify(categoryParametersToSend));
    // formData.append('stone', data.stone);
    // formData.append('size', data.size);
    // formData.append('material', data.material);
    // formData.append('fasteningType', data.fasteningType);
    // formData.append('amount', data.amount);
    await updateProduct(formData);
  }

  const onDelete = async () => {
    await deleteProduct(id);
  }

  const onSubmitMainImage = async (data: MainImageScheme) => {
    const formData = new FormData();
    formData.append('id', String(id));
    formData.append('file', data.file[0]);
    await updateProduct(formData);
  }

  const onSubmitImage = async (data: ImageScheme) => {
    const formData = new FormData();
    formData.append('productId', String(id));
    formData.append('img', data.img[0]);
    await createImage(formData);
  }

  useEffect(() => {
    if (categoryIdState && categories) {
      const parameters = categories?.rows.find(x => x.id == categoryIdState)?.parameters;
      setCategoryParameters(parameters as object);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setCategoryParametersToSend(Object.entries(parameters as object).reduce((acc: any, cur) => {
        acc[cur[0]] = cur[1][0];
        return acc
      }, {}));
    }
  }, [categories, categories?.rows, categoryIdState])

  return (
    <>
      <div className={styles.flex}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmitData)}>
          {/* <div className={styles.block}> */}
          <div className={styles.block1}>
            <Textarea
              label='Название'
              // sizeInput='large'
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
            <Textarea
              label='SEO title'
              // sizeInput='large'
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
              label='SEO description'
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
                  ...register('price'),
                  defaultValue: price
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
                  ...register('discount'),
                  defaultValue: discount
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

          <div className={styles.block2}>
            <div className={styles.inputs}>
              <SelectInput
                label='Категория'
                sizeInput='small'
                error={errors.categoryId?.message}
                selectProps={{
                  ...register('categoryId'),
                  defaultValue: categoryId,
                }}
                onChange={(e) => {
                  setCategoryIdState(String(e?.target.value))
                }}
                options={categoryOptions || []}
              />
              <Input
                label='На складе'
                sizeInput='small'
                error={errors.productsCount?.message}
                inputProps={{
                  placeholder: '',
                  id: 'create-product-have',
                  autoComplete: 'new-passport',
                  ...register('productsCount'),
                  defaultValue: productsCount
                  // disabled: true
                }}
              />
            </div>
            <div className={styles.inputs}>
              {Object.keys(categoryParameters).map(x => (
                <SelectInput
                  key={`category input option: ${x}`}
                  label={x}
                  sizeInput='small'
                  error={errors.categoryId?.message}
                  selectProps={{
                    defaultValue: categoryCharacteristics ? categoryCharacteristics[x as keyof typeof categoryCharacteristics] || categoryParameters[x as keyof typeof categoryParameters][0] : ''
                  }}
                  // selectProps={{
                  //   ...register('categoryId'),
                  // }}
                  onChange={(e) => {
                    // setCategoryId(String(e?.target.value))
                    const result: typeof categoryParametersToSend = { ...categoryParametersToSend };
                    result[x as keyof typeof categoryParametersToSend] = e?.target.value;
                    setCategoryParametersToSend({ ...result });
                  }}
                  optionsAr={categoryParameters[x as keyof typeof categoryParameters] || []}

                />
              ))}
            </div>
          </div>
        </form>

        <div className={styles.imageBlock}>
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE}/${mainImage}`}
            alt={''}
            className={styles.image}
            width={400}
            height={400}
          />

          <form className={styles.formImageButtons} onSubmit={handleSubmitMainImage(onSubmitMainImage)}>
            <InputFile
              inputProps={{
                ...registerMainImage('file')
              }}
            />
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
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE}/${x.path}`}
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