'use server'
import { api } from "../api";
import { TFavoriteProduct, TFavoriteProductCreate } from "./favoriteProductType";
import { TPagination } from "../../types/paginationType";
import { revalidateTag } from "next/cache";

export const createFavoriteProduct = async (data: TFavoriteProductCreate): Promise<TFavoriteProduct> => {
  console.log(data);
  const response = await api('favoriteProducts', {
    type: 'POST',
    data: JSON.stringify(data)
  });
  revalidateTag('products');
  return response;
}

export const getAllFavoriteProducts = async (): Promise<TPagination<TFavoriteProduct>> => {
  // добавить пагинацию
  const response = await api('favoriteProducts');
  return response;
}

export const getOneFavoriteProduct = async (id: number | string): Promise<TFavoriteProduct> => {
  const response = await api(`favoriteProducts/${id}`);
  return response;
}

export const updateFavoriteProduct = async (data: TFavoriteProduct): Promise<TFavoriteProduct> => {
  const response = await api('favoriteProducts', {
    type: 'PUT',
    data: JSON.stringify(data)
  });
  revalidateTag('products');
  return response;
}

export const deleteFavoriteProduct = async (id: number | string) => {
  await api(`favoriteProducts/${id}`, {
    type: 'DELETE'
  });
  revalidateTag('products');
}

export const deleteFavoriteProductByIds = async (data: TFavoriteProductCreate) => {
  console.log(data);
  await api(`favoriteProducts/byPersonAndProductId`, {
    type: 'POST',
    data: JSON.stringify(data)
  });
  revalidateTag('products');
}