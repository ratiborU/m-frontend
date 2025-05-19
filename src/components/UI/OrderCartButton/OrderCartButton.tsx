'use client'
import React, { useState } from 'react';
import styles from './orderCartButton.module.css'
import { TBasketProduct } from '@/services/api/basketProducts/basketProductType';
import minus from '../../../../public/minus.svg'
import plus from '../../../../public/plus.svg'
import cross from '../../../../public/cross.svg'
import Image from 'next/image';
import { useCreateBasketProductMutation } from '@/hooks/basketProducts/useCreateBasketProductMutation';
import { useDeleteBasketProductMutation } from '@/hooks/basketProducts/useDeleteBasketProductMutation';
import { useUpdateBasketProductMutation } from '@/hooks/basketProducts/useUpdateBasketProductMutation';
import { useDebouncedCallback } from 'use-debounce';
import { usePersonContext } from '@/providers/PersonProvider/hooks/usePersonContext';
import { useOrderContext } from '@/providers/OrderProvider/hooks/useOrderContext';

// нужно сделать прогрессивную скидку
const OrderCartButton = (props: TBasketProduct) => {
  const { id, count, product } = props;

  const [countState, setCountState] = useState(Number(count));
  const person = usePersonContext()
  const order = useOrderContext()

  const { createBasketProduct } = useCreateBasketProductMutation({});
  const { updateBasketProduct } = useUpdateBasketProductMutation({});
  const { deleteBasketProduct } = useDeleteBasketProductMutation({});

  const debounce = useDebouncedCallback(async (value: number) => {
    if (Number(count) == 0 && value > 0) {
      await createBasketProduct({
        productId: product.id,
        personId: person.id,
        count: String(value)
      })
    } else if (Number(count) > 0 && value > 0) {
      await updateBasketProduct({
        ...props,
        count: String(value)
      })
    } else if (Number(count) > 0 && value == 0) {
      await deleteBasketProduct(id)
    }
  }, 200)

  const onAdd = () => {
    setCountState(Math.min(Number(product.productsCount), countState + 1));
    debounce(Math.min(Number(product.productsCount), countState + 1));
  }

  const onRemove = () => {
    setCountState(Math.max(0, countState - 1));
    debounce(Math.max(0, countState - 1));
  }

  const onDelete = () => {
    setCountState(0);
    debounce(0);
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountState(Number(e.target.value))
    debounce(Number(e.target.value));
  }

  return (
    <>
      <div className={styles.block}>
        <div className={styles.countBlock}>
          <button
            className={styles.button}
            onClick={onRemove}
          >
            <Image src={minus} alt={''} width={20} height={20} />
          </button>
          <input
            className={styles.inputAmount}
            type="text"
            value={countState}
            onChange={onChange}
          />
          {/* <p className={styles.amount}>{countState}</p> */}
          <button
            className={styles.button}
            onClick={onAdd}
          >
            <Image src={plus} alt={''} width={20} height={20} />
          </button>
        </div>
        <div className={styles.deleteProduct}>
          <button
            className={styles.button}
            onClick={onDelete}
          >
            <Image src={cross} alt={''} width={20} height={20} />
          </button>
        </div>
        <div className={styles.price}>{(Number(product?.price) - Number(product?.discount) - order.discountPerPackage) * countState} ₽</div>
      </div>
    </>
  );
};

export default OrderCartButton;