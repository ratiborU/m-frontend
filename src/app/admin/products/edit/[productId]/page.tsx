import React from 'react';
import EditProduct from '@/widjets/products/EditProduct/EditProduct';
import { TProduct } from '@/services/types/productType';

const page = async ({ params }: { params: { productId: string } }) => {
  const { productId } = params;
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