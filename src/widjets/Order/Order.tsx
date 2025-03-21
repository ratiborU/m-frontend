'use client'
import React, { useEffect, useState } from 'react';
import styles from './order.module.css';
import Input from '@/components/UI/Input/Input';
import Textarea from '@/components/UI/Textarea/Textarea';
import { TBasketProduct } from '@/services/api/basketProducts/basketProductType';
import { TPerson } from '@/services/api/persons/personType';
import BasketToOrderCard from '@/components/BasketToOrderCard/BasketToOrderCard';
import Title from '@/components/Title/Tile';
import OrderMap from '@/components/OrderMap/OrderMap';
import CheckBox from '@/components/UI/CheckBox/CheckBox';
import RadioButton from '@/components/UI/RadioButton/RadioButton';
import { cdekOffices } from '@/services/mock/mockTrueCdekOfficesInformation';
import { useOrderContext } from '@/providers/OrderProvider/hooks/useOrderContext';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import OrderCard from '@/components/OrderCard/OrderCard';
import { useCreateOrderMutation } from '@/hooks/orders/useCreateOrderMutation';
import { usePersonContext } from '@/providers/PersonProvider/hooks/usePersonContext';
import { useUpdatePersonMutation } from '@/hooks/persons/useUpdatePersonMutation';

const createPersonSchema = z.object({
  fio: z.string().min(1, 'мало'),
  phone: z.string().min(1, 'мало'),
  email: z.string().min(1, 'мало'),
  comment: z.string(),
  address: z.string().min(1, 'мало'),
  agreement: z.boolean(),
  // delivery: z.string(),
})

type TCreatePersonSchema = z.infer<typeof createPersonSchema>;

type OrderProps = {
  person: TPerson,
  products: TBasketProduct[],
}

const Order = (props: OrderProps) => {
  const { products } = props;
  const order = useOrderContext();
  const person = usePersonContext()

  const { register, handleSubmit, formState: { errors } } = useForm<TCreatePersonSchema>({ resolver: zodResolver(createPersonSchema) });

  const onSuccess = () => {
    alert('заказ успешно принят');
  }

  const { createOrder } = useCreateOrderMutation({ onSuccess });
  // const { updatePerson } = useUpdatePersonMutation({})
  // обновить person?

  const onSubmit = async (data: TCreatePersonSchema) => {
    // await createOrder(data);
    // price: string,
    // address: string,
    // delivery: string,
    // deliveryDays: string,
    // comment: string,
    // status: string,
    // personId: string,
    const price = '0';
    const status = 'pending';
    const deliveryDays = '7';
    const delivery = 'cdek'

    console.log({ ...data, price, status, deliveryDays, personId: person.id });
    await createOrder({ ...data, price, status, delivery, deliveryDays, personId: person.id });
  }

  return (
    <div className={styles.wrapper}>
      <Title className={styles.title} text={'Оформление заказа'} />
      <form onSubmit={handleSubmit(onSubmit)}>


        <div className={styles.block}>
          <div className={styles.block1}>
            <div className={styles.blockInputs}>
              <div className={styles.information}>
                <Input
                  inputProps={{
                    placeholder: '',
                    id: 'order-input-fio',
                    ...register('fio')
                  }}
                  label={'ФИО'}
                />
                {/* phone mask? */}
                <Input
                  inputProps={{
                    placeholder: '',
                    id: 'order-input-phone',
                    ...register('phone')
                  }}
                  label={'Номер телефона'}
                />
                <Input
                  inputProps={{
                    placeholder: '',
                    id: 'order-input-email',
                    ...register('email')
                  }}
                  label={'Email'}
                />
                <Input
                  inputProps={{
                    placeholder: '',
                    id: 'order-input-comment',
                    ...register('comment')
                  }}
                  label={'Комментарий к заказу'}
                />
              </div>
              <div className={styles.address}>
                <Textarea inputProps={{
                  placeholder: 'г. Екатерибург, ул. Ленина, д. 1',
                  id: 'order-input-address',
                  ...register('address'),
                  style: {
                    height: 86,
                  },
                }}
                  label={'Адрес доставки'}
                />
                <div className={styles.checkBoxes}>
                  <RadioButton
                    inputProps={{
                      id: 'order-checkbox-sdek',
                      name: 'order-checkbox-delivery-type',
                      defaultChecked: true
                    }}
                    label='Доставка СДЕК'
                  />
                  <RadioButton
                    inputProps={{
                      id: 'order-checkbox-from-store',
                      name: 'order-checkbox-delivery-type'
                    }}
                    label='Самовывоз г. Екатеринбург, ул. Ленина, д. 99'
                  />
                </div>
              </div>
            </div>
            {/* <OrderMap delivery='sdek' offices={cdekOffices} /> */}
          </div>
          <div className={styles.block2}>
            <OrderCard products={products} />
            <div className={styles.checkboxesUnderTheCard}>
              <CheckBox
                inputProps={{
                  id: 'order-checkbox-discount',
                }}
                label='Использовать купон'
              />
              <CheckBox
                inputProps={{
                  id: 'order-checkbox-agreement',
                  ...register('agreement'),
                }}
                label={<>Я принимаю условия оферты а так же соглашаюсь с условиями обработки персональных данных</>}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Order;