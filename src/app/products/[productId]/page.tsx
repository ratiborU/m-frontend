import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

type ProductPageProps = {
  params: { productId: string }
}

// пререндерид данные всех продуктов
// какая-то имба получается
// имба
export async function generateStaticParams() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const products = await response.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return products.map((product: { id: any; }) => product.id);
}

export async function generateMetadata({ params: { productId } }: ProductPageProps): Promise<Metadata> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${productId}`);
  const product = await response.json();
  // пока что mock data
  return {
    title: product.title,
    description: `продукт ${productId} ${product.body}`,
    openGraph: {
      images: [
        {
          url: 'https://i.pinimg.com/originals/7b/de/e7/7bdee7dbd974b6c8669d9bf19889ebbe.jpg'
        }
      ]
    },
    robots: {
      index: true,
      follow: true
    }
  }
}

const Product = async ({ params }: ProductPageProps) => {
  const { productId } = params;
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${productId}`);
  const product = await response.json();

  if (response.status == 404) {
    notFound();
  }

  return (
    <div>
      продукт {productId} {product.title}
    </div>
  );
};

export default Product;