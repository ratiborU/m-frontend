import React from 'react';
import ProductWidget from '@/widjets/Product/Product';
import { TPagination } from '@/services/types/paginationType';
import { TProduct } from '@/services/api/products/productType';
import { getAllProducts, getOneProduct } from '@/services/api/products/productService';
import { getImagesByProductId } from '@/services/api/images/imageService';
import { getCommentsByProductId, getOneComment, getOneCommentByPersonAndProductId } from '@/services/api/comments/commentService';
import { cookies } from 'next/headers';

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

  const product = await getOneProduct(productId);
  const images = await getImagesByProductId(productId);
  const simularProducts = await getAllProducts();
  const comments = await getCommentsByProductId(productId);
  const comment = await getOneCommentByPersonAndProductId(String(cookies().get('personId')?.value), product.id);

  console.log(images);
  // console.log(comments);

  return (
    <>
      <ProductWidget
        product={product}
        images={images}
        simularProducts={simularProducts.rows.slice(0, 4)}
        comments={comments.rows}
        comment={comment}
      />
    </>
  );
};

export default page;