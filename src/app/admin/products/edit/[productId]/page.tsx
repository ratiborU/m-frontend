import React from 'react';
import EditProduct from '@/widjets/products/EditProduct/EditProduct';
import { TProduct } from '@/services/api/products/productType';
import { TPagination } from '@/services/types/paginationType';

export async function generateStaticParams() {
  const products: TPagination<TProduct> = await fetch(`http://localhost:5000/api/products`, {
    next: { tags: ['products'] }
  }).then(response => response.json());
  // при загрузке все равно отправляется запрос по id на бек
  // наверное так и должно быть
  return products.rows.map((product: TProduct) => ({
    productId: String(product.id)
  }));
}

const page = async ({ params }: { params: Promise<{ category: string; productId: string }> }) => {
  const { productId } = await params;
  const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
    next: {
      tags: ['products', productId]
    },
    cache: 'no-cache'
  });
  const product: TProduct = await response.json();

  const responseImages = await fetch(`http://localhost:5000/api/images/getAllByProductId/${productId}`, {
    next: {
      tags: ['images', productId]
    },
    cache: 'no-cache'
  });
  const images = await responseImages.json();

  return (
    <div>
      <EditProduct {...product} images={images} />
    </div>
  );
};

export default page;