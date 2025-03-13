'use server'
import { api } from "../api";
import { TFavoriteProduct, TFavoriteProductCreate } from "./favoriteProductType";
import { TPagination } from "../../types/paginationType";
import { revalidateTag } from "next/cache";

export const createFavoriteProduct = async (data: TFavoriteProductCreate): Promise<TFavoriteProduct> => {
  const response = await api('favoriteProducts', {
    type: 'POST',
    data: JSON.stringify(data)
  });
  revalidateTag('products');
  return response;
}

export const createFavoriteProductNoRevalidate = async (data: TFavoriteProductCreate): Promise<TFavoriteProduct> => {
  const response = await api('favoriteProducts', {
    type: 'POST',
    data: JSON.stringify(data),
    revalidate: null,
  });
  revalidateTag('products');
  return response;
}

export const getAllFavoriteProducts = async (): Promise<TPagination<TFavoriteProduct>> => {
  // добавить пагинацию
  const response = await api('favoriteProducts', {
    // cache: 'default'
  });
  return response;
}

export const getAllFavoriteProductsByPersonId = async (id: number | string): Promise<TPagination<TFavoriteProduct>> => {
  const response = await api(`favoriteProducts/byPersonId/${id}`, {
    cache: 'no-cache'
  });
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
    type: 'DELETE',
    revalidate: null
  });
  revalidateTag('products');
}

export const deleteFavoriteProductNoRevalidate = async (id: number | string) => {
  await api(`favoriteProducts/${id}`, {
    type: 'DELETE',
    revalidate: null
  });
  // какого-то шпека не работает
  // ошибка у next js возможно стоит его 
  // позже обновить до более новой версии
  revalidateTag('products');
}

export const deleteFavoriteProductByIds = async (data: TFavoriteProductCreate) => {
  await api(`favoriteProducts/byPersonAndProductId`, {
    type: 'POST',
    data: JSON.stringify(data),
    revalidate: null
  });
  revalidateTag('products');
}