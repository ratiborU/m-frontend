'use client'
import React, { useEffect, useState } from 'react';
import styles from "./createProduct.module.css";
import Input from '@/components/UI/Input/Input';
import Textarea from '@/components/UI/Textarea/Textarea';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import InputFile from '@/components/UI/InputFile/InputFile';
import { useCreateProductMutation } from '@/hooks/products/useCreateProductMutation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { zodResolver } from '@hookform/resolvers/zod';
// import { createProductSchema, TCreateProductSchema } from './models';
import SelectInput from '@/components/UI/SelectInput/SelectInput';
import { useGetCategoryOptionsQuery } from '@/hooks/categories/useGetCategoryOptions';
// import { stoneOptions, sizeOptions, fasteningTypeOptions, materialOptions, amountOptions } from '@/services/api/products/productOtherOptions';
import { z } from "zod";
import { useGetCategoriesQuery } from '@/hooks/categories/useGetAllCategoriesQuery';

export const createProductSchema = z.object({
  name: z.string().min(1, 'Это поле обязательно"'),
  description: z.string().min(1, 'Это поле обязательно"'),
  seoTitle: z.string().min(1, 'Это поле обязательно"'),
  seoDescription: z.string().min(1, 'Это поле обязательно"'),
  characteristics: z.string().min(1, 'Это поле обязательно"'),
  price: z.string().min(1, 'Это поле обязательно"'),
  discount: z.string().min(1, 'Это поле обязательно"'),
  categoryId: z.string().min(1, 'Это поле обязательно"'),
  productsCount: z.string().min(1, 'Это поле обязательно"'),
  // stone: z.string().min(1, 'Это поле обязательно"'),
  // size: z.string().min(1, 'Это поле обязательно"'),
  // material: z.string().min(1, 'Это поле обязательно"'),
  // fasteningType: z.string().min(1, 'Это поле обязательно"'),
  // amount: z.string().min(1, 'Это поле обязательно"'),
  // file: z
  //   .instanceof(File, { message: 'Please upload a file.' })
  //   .refine((f) => f.size < 100_000, 'Max 100Kb upload size.')
  //   .array(),
  // file: z.instanceof(FileList, { message: 'Please upload a file.' }),
  file: z.unknown().transform(value => {
    return value as FileList
  })
})

export type TCreateProductSchema = z.infer<typeof createProductSchema>;

const CreateProduct = () => {
  const notify = () => toast.success("Товар успешно создан");
  const notifyError = (text: string) => toast.error(`Произошла ошибка! ${text}`);
  const { register, handleSubmit, formState: { errors } } = useForm<TCreateProductSchema>({ resolver: zodResolver(createProductSchema) });
  const [categoryId, setCategoryId] = useState('');
  const [categoryParameters, setCategoryParameters] = useState({});
  const [categoryParametersToSend, setCategoryParametersToSend] = useState({});

  const { data: categoryOptions } = useGetCategoryOptionsQuery();
  const { data: categories } = useGetCategoriesQuery();

  const onSuccess = () => {
    notify();
  }

  const onError = (error: Error) => {
    notifyError(error.message);
  }

  const { createProduct, isPending } = useCreateProductMutation({ onSuccess, onError });


  const onSubmit = async (data: TCreateProductSchema) => {
    const formData = new FormData();
    console.log(categoryParametersToSend);
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
    // formData.append('stone', data.stone);
    // formData.append('size', data.size);
    // formData.append('material', data.material);
    // formData.append('fasteningType', data.fasteningType);
    // formData.append('amount', data.amount);
    formData.append('categoryCharacteristics', JSON.stringify(categoryParametersToSend));
    formData.append('file', data.file[0]);
    // console.log(formData);
    await createProduct(formData);
  }

  useEffect(() => {
    if (categoryId) {
      const parameters = categories?.rows.find(x => x.id == categoryId)?.parameters;
      setCategoryParameters(parameters as object);
      // console.log(Object.entries(parameters as object).reduce((acc, cur) => {
      //   acc[cur[0]] = cur[1][0];
      //   return acc
      // }, {}));
      setCategoryParametersToSend(Object.entries(parameters as object).reduce((acc, cur) => {
        acc[cur[0]] = cur[1][0];
        return acc
      }, {}));
    }

    // console.log(categories?.rows);
  }, [categories?.rows, categoryId])


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.block}>
          <div className={styles.block1}>
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
              error={errors.description?.message}
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
              error={errors.seoTitle?.message}
              inputProps={{
                placeholder: '',
                id: 'create-product-seo-title',
                autoComplete: 'new-passport',
                ...register('seoTitle')
              }}
            />
            <Textarea
              label='Seo Description'
              error={errors.seoDescription?.message}
              inputProps={{
                placeholder: "",
                id: 'create-product-seo-description',
                autoComplete: 'new-passport',
                ...register('seoDescription')
              }}
            />
            <Textarea
              label='Характеристики'
              error={errors.characteristics?.message}
              inputProps={{
                placeholder: "характеристика:  значение  enter",
                id: 'create-product-characteristics',
                autoComplete: 'new-passport',
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
                  ...register('discount'),
                  defaultValue: '0',
                }}
              />
            </div>

            <LoadingButton
              loading={isPending}
              type="submit"
              size='large'
              variant='contained'
              style={{
                minWidth: 180
              }}
            >
              Создать
            </LoadingButton>
          </div>


          <div className={styles.block2}>
            <div className={styles.inputs}>
              <SelectInput
                label='Категория'
                sizeInput='small'
                error={errors.categoryId?.message}
                selectProps={{
                  ...register('categoryId'),
                }}
                onChange={(e) => {
                  setCategoryId(String(e?.target.value))
                }}
                options={categoryOptions || []}
              />
              <Input
                label='Количество'
                sizeInput='small'
                error={errors.productsCount?.message}
                inputProps={{
                  placeholder: '',
                  id: 'create-product-have',
                  autoComplete: 'new-passport',
                  ...register('productsCount')
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
                    defaultValue: categoryParameters[x as keyof typeof categoryParameters][0]
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
            <InputFile
              inputProps={{
                id: 'load-image',
                ...register('file'),
              }}
              buttonProps={{
                style: {
                  minWidth: 180
                }
              }}
            />
          </div>


          {/* <div className={styles.inputs}>
            <SelectInput
              label='Категория'
              sizeInput='xsmall'
              error={errors.categoryId?.message}
              selectProps={{
                ...register('categoryId'),
              }}
              options={categoryOptions || []}
            />

            <SelectInput
              label='Камень'
              sizeInput='xsmall'
              error={errors.stone?.message}
              selectProps={{
                id: 'create-product-stone',
                ...register('stone'),
                defaultValue: 'Crystal',
              }}

              options={stoneOptions}
            />
            <SelectInput
              label='Размер'
              sizeInput='xsmall'
              error={errors.size?.message}
              selectProps={{
                id: 'create-product-size',
                ...register('size'),
                defaultValue: 'Medium',
              }}
              options={sizeOptions}
            />
          </div> */}

          {/* <div className={styles.inputs}>
            <SelectInput
              label='Материал'
              sizeInput='xsmall'
              error={errors.material?.message}
              selectProps={{
                id: 'create-product-material',
                ...register('material'),
                defaultValue: 'Gold',
              }}
              options={materialOptions}
            />
            <SelectInput
              label='Крепление'
              sizeInput='xsmall'
              error={errors.fasteningType?.message}
              selectProps={{
                id: 'create-product-fastening-type',
                defaultValue: 'Rolled',
                ...register('fasteningType')
              }}
              options={fasteningTypeOptions}
            />
            <SelectInput
              label='В упаковке'
              sizeInput='xsmall'
              error={errors.amount?.message}
              selectProps={{
                id: 'create-product-amount',
                ...register('amount'),
                defaultValue: 12
              }}
              options={amountOptions}
            />
          </div> */}
          {/* <InputFile
            inputProps={{
              id: 'load-image',
              ...register('file'),
            }}
            buttonProps={{
              style: {
                minWidth: 180
              }
            }}
          /> */}
          {/* <div className={styles.buttons}>

            <LoadingButton
              loading={isPending}
              type="submit"
              size='large'
              variant='contained'
              style={{
                minWidth: 180
              }}
            >
              Создать
            </LoadingButton>
          </div> */}

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