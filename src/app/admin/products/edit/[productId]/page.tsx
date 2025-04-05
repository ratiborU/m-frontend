import React from 'react';
import EditProduct from '@/widjets/products/EditProduct/EditProduct';
import { getOneProduct } from '@/services/api/products/productService';
import { getImagesByProductId } from '@/services/api/images/imageService';

const page = async ({ params }: { params: { productId: string } }) => {
  const { productId } = params;

  const product = await getOneProduct(productId)
  const images = await getImagesByProductId(productId);

  return (
    <div>
      <EditProduct {...product} images={images} />
    </div>
  );
};

export default page;