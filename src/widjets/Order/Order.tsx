'use client'
// import React, { useEffect, useState } from 'react';
import styles from './order.module.css';
import Input from '@/components/UI/Input/Input';
import Textarea from '@/components/UI/Textarea/Textarea';
import { TBasketProduct } from '@/services/api/basketProducts/basketProductType';
import { TPerson } from '@/services/api/persons/personType';
// import BasketToOrderCard from '@/components/BasketToOrderCard/BasketToOrderCard';
import Title from '@/components/Title/Tile';
import OrderMap from '@/components/OrderMap/OrderMap';
import CheckBox from '@/components/UI/CheckBox/CheckBox';
import RadioButton from '@/components/UI/RadioButton/RadioButton';
import { cdekOffices } from '@/services/mock/mockTrueCdekOfficesInformation';
// import { useOrderContext } from '@/providers/OrderProvider/hooks/useOrderContext';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import OrderCard from '@/components/OrderCard/OrderCard';
import { useCreateOrderMutation } from '@/hooks/orders/useCreateOrderMutation';
import { usePersonContext } from '@/providers/PersonProvider/hooks/usePersonContext';
import { useUpdatePersonMutation } from '@/hooks/persons/useUpdatePersonMutation';
import { usePersonSetterContext } from '@/providers/PersonProvider/hooks/usePersonSetterContext';
import { LocalStorageService } from '@/lib/helpers/localStorageService';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
// import { TCoupon } from '@/services/api/coupons/couponType';
// import { checkOneCoupon } from '@/services/api/coupons/couponService';
import { useGetCheckOneCouponQuery } from '@/hooks/coupons/useGetCheckCouponQuery';
import { useQueryClient } from '@tanstack/react-query';
// import { revalidateTag } from 'next/cache';
import { useOrderContext } from '@/providers/OrderProvider/hooks/useOrderContext';

const createPersonSchema = z.object({
  fio: z.string().min(1, 'мало'),
  phone: z.string().min(1, 'мало'),
  email: z.string().min(1, 'мало'),
  comment: z.string(),
  address: z.string(),
  agreement: z.boolean(),
  coupon: z.string(),
  // delivery: z.string(),
})

type TCreatePersonSchema = z.infer<typeof createPersonSchema>;

type OrderProps = {
  person: TPerson,
  products: TBasketProduct[],
}

const Order = (props: OrderProps) => {
  const { products } = props;
  const router = useRouter();
  // const order = useOrderContext();
  const person = usePersonContext();
  const setPerson = usePersonSetterContext();
  const finalPrice = products.reduce((acc, cur) => acc + Number(cur.count) * (Number(cur.product.price) - Number(cur.product.discount)), 0)
  const client = useQueryClient();
  const order = useOrderContext();
  const [isCoupon, setIsCoupon] = useState(false);
  // const [coupon, setCoupon] = useState<TCoupon | null>(null);
  // const sort = useCatalogSortContext();

  const debounce = useDebouncedCallback(async () => {
    // setSort.setSort(sortState);
    // alert(isCoupon);
    // const isValid = await checkOneCoupon(getValues('coupon'))
    // console.log(couponData);
    client.invalidateQueries({
      queryKey: ['coupons'],
    });
    // revalidateTag('check');
    // const { data: couponData } = useGetCheckOneCouponQuery(getValues('coupon'));
    console.log(couponData);
  }, 500)

  const { register, handleSubmit, getValues } = useForm<TCreatePersonSchema>({ resolver: zodResolver(createPersonSchema) });

  const onSuccess = () => {
    router.push('order/completed');
  }

  const { createOrder } = useCreateOrderMutation({ onSuccess });
  const { updatePerson } = useUpdatePersonMutation({})
  const { data: couponData } = useGetCheckOneCouponQuery(getValues('coupon'));
  // const { updatePerson } = useUpdatePersonMutation({})
  // обновить person?

  const onSubmit = async (data: TCreatePersonSchema) => {
    // const price = String(finalPrice);
    const totalWithDiscount = !couponData
      ? finalPrice
      : couponData.discount.at(-1) !== '%'
        ? finalPrice - Number(couponData.discount)
        : finalPrice * (1 - Number(couponData.discount.slice(0, couponData.discount.length - 1)) / 100);
    const totalWithProductsDiscount = totalWithDiscount - order.discountPerPackage * order.productsCartCount;
    const status = 'В обработке';
    const deliveryDays = '7';
    const delivery = 'cdek';

    const fio = data.fio.split(' ');

    console.log(totalWithProductsDiscount);

    console.log(data);

    if (!person.id) {
      setPerson.setFio(data.fio);
      setPerson.setPhone(data.phone);
      setPerson.setEmail(data.email);
      setPerson.setAddress(data.address);

      LocalStorageService.save('fio', data.fio);
      LocalStorageService.save('phone', data.phone);
      LocalStorageService.save('email', data.email);
      LocalStorageService.save('address', data.address);

      await updatePerson({
        id: '0',
        firstName: fio[1],
        secondName: fio[0],
        fatherName: fio[2],
        email: data.email,
        phoneNumber: data.phone,
      })
    }

    await createOrder({
      ...data,
      price: String(totalWithProductsDiscount),
      status,
      delivery,
      deliveryDays,
      personId: person.id,
      couponId: couponData?.id,
      address: data.address || order.address
    });
  }

  return (
    <div className={styles.wrapper}>
      <Title className={styles.title} text={'Оформление заказа'} margin={false} />
      <form onSubmit={handleSubmit(onSubmit)}>


        <div className={styles.block}>
          <div className={styles.block1}>
            <div className={styles.blockInputs}>
              <div className={styles.information}>
                <Input
                  inputProps={{
                    placeholder: '',
                    id: 'order-input-fio',
                    ...register('fio'),
                    defaultValue: person.fio
                  }}
                  label={'ФИО'}
                />
                {/* phone mask? */}
                <Input
                  inputProps={{
                    placeholder: '',
                    id: 'order-input-phone',
                    ...register('phone'),
                    defaultValue: person.phone
                  }}
                  label={'Номер телефона'}
                />
                <Input
                  inputProps={{
                    placeholder: '',
                    id: 'order-input-email',
                    ...register('email'),
                    defaultValue: person.email
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
                  defaultValue: person.address,
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
            {/* пока заккоментировал так как при большом количестве обновлений ломается */}
            <OrderMap delivery='sdek' offices={cdekOffices} />
          </div>
          <div className={styles.block2}>
            <OrderCard products={products} coupon={couponData} />
            <div className={styles.checkboxesUnderTheCard}>
              {isCoupon && <Input
                inputProps={{
                  placeholder: '',
                  id: 'order-input-email',
                  ...register('coupon'),
                }}
                label={'Купон'}
                onChange={() => {
                  debounce()
                }}
              />}
              {!isCoupon && <input {...register('coupon')} type='text' style={{
                display: 'none'
              }} />}
              <CheckBox
                inputProps={{
                  id: 'order-checkbox-discount',
                  checked: isCoupon,
                  onChange: (e) => setIsCoupon(e.target.checked)
                }}
                label='Использовать купон'
              />

              <CheckBox
                inputProps={{
                  id: 'order-checkbox-agreement',
                  ...register('agreement'),
                  defaultChecked: true
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