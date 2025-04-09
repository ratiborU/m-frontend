import React from 'react';
import ProductWidget from '@/widjets/Product/Product';
import { TPagination } from '@/services/types/paginationType';
import { TProduct } from '@/services/api/products/productType';
import { getAllProducts, getOneProduct } from '@/services/api/products/productService';
import { getImagesByProductId } from '@/services/api/images/imageService';
import { getCommentsByProductId, getOneCommentByPersonAndProductId } from '@/services/api/comments/commentService';
import { cookies } from 'next/headers';
import { Metadata } from 'next';

type Props = {
  params: {
    productId: string
  }
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const product: TProduct = await fetch(`${process.env.BACKEND_URL}/products/${params.productId}`, {
    cache: 'no-cache'
  })
    .then(data => data.json())

  return {
    title: product.seoTitle,
    description: product.seoDescription,
    openGraph: {
      images: [
        {
          url: `${process.env.BACKEND_URL_IMAGE}/${product.mainImage}`
        }
      ]
    }
  }
}

export async function generateStaticParams() {
  const products: TPagination<TProduct> = await fetch(`${process.env.BACKEND_URL}/products`, {
    cache: 'no-cache'
  })
    .then(response => response.json());
  return products.rows.map((product: TProduct) => ({
    productId: String(product.id)
  }));
}

// const page = async ({ params }: { params: Promise<{ productId: string }> }) => {
//   const { productId } = await params;

const page = async ({ params }: Props) => {
  const { productId } = params;

  const product = await getOneProduct(productId);
  const images = await getImagesByProductId(productId);
  const simularProducts = await getAllProducts();
  const comments = await getCommentsByProductId(productId);
  const comment = await getOneCommentByPersonAndProductId(String(cookies().get('personId')?.value), product.id);

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