'use client'
import React, { useState } from 'react';
import styles from "./cartButton.module.css";
import { TProduct } from '@/services/api/products/productType';
import plus from '../../../../public/plus.svg'
import minus from '../../../../public/minus.svg'
import Image from 'next/image';
import { useDebouncedCallback } from "use-debounce";
import { useCreateBasketProductMutation } from '@/hooks/basketProducts/useCreateBasketProductMutation';
import { useUpdateBasketProductMutation } from '@/hooks/basketProducts/useUpdateBasketProductMutation';
import { useDeleteBasketProductMutation } from '@/hooks/basketProducts/useDeleteBasketProductMutation';
import { usePersonContext } from '@/providers/PersonProvider/hooks/usePersonContext';

type CartButtonProps = {
  className?: string,
  text: string;
  size: 'l' | 'm' | 's',
  type?: 'filled' | 'outlined',
  // innerCount?: number,
  product: TProduct,
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const CartButton = (props: CartButtonProps) => {
  const {
    text,
    className = '',
    size = 'l',
    type = 'filled',
    // onClick = () => { },
    // innerCount = 0,
    product
  } = props;

  const person = usePersonContext()

  const [count, setCount] = useState(Number(product.basketProduct?.count) || 0);

  const { createBasketProduct } = useCreateBasketProductMutation({});
  const { updateBasketProduct } = useUpdateBasketProductMutation({});
  const { deleteBasketProduct } = useDeleteBasketProductMutation({});

  const debounced = useDebouncedCallback(async (value: number) => {
    if (Number(product.basketProduct?.count || 0) == 0 && value > 0) {
      await createBasketProduct({
        productId: product.id,
        personId: person.id,
        count: String(value)
      })
    } else if (Number(product.basketProduct?.count || 0) > 0 && value > 0 && product.basketProduct) {
      await updateBasketProduct({
        ...product.basketProduct,
        count: String(value)
      })
    } else if (Number(product.basketProduct?.count || 0) > 0 && value == 0 && product.basketProduct) {
      await deleteBasketProduct(product.basketProduct.id)
    }
  }, 500);

  const onAddToCartClick = () => {
    setCount((previous) => previous + 1);
    debounced(count + 1);
  }

  const onRemoveToCartClick = () => {
    setCount((previous) => previous - 1);
    debounced(count - 1);
  }

  if (count == 0) {
    return (
      <button
        className={`${styles.button} ${className} ${styles[size]} ${styles[type]}`}
        onClick={onAddToCartClick}
      >
        {text}
      </button>
    )
  }


  return (
    <>
      {/* <div> */}
      <div
        className={`${styles.plusMinusButton} ${className} ${styles[size]} ${styles[type]}`}
      // onClick={onClick}
      >
        <button
          className={styles.iconButton}
          onClick={onRemoveToCartClick}
        >
          <Image src={minus} alt={''} />
        </button>
        {/* Сделать инпут */}
        {count}
        <button
          className={styles.iconButton}
          onClick={onAddToCartClick}
        >
          <Image src={plus} alt={''} />
        </button>

      </div>
      {/* </div> */}
    </>
  );
};

export default CartButton;

