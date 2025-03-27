import React from 'react';
import EditProduct from '@/widjets/products/EditProduct/EditProduct';
import { TProduct } from '@/services/api/products/productType';
import { TPagination } from '@/services/types/paginationType';
import { getOneProduct } from '@/services/api/products/productService';
import { getImagesByProductId } from '@/services/api/images/imageService';

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

const page = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = await params;

  const product = await getOneProduct(productId)
  const images = await getImagesByProductId(productId);

  return (
    <div>
      <EditProduct {...product} images={images} />
    </div>
  );
};

export default page;