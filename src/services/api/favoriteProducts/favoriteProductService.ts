'use server'
import { api } from "../api";
import { TFavoriteProduct, TFavoriteProductCreate } from "./favoriteProductType";
import { TPagination } from "../../types/paginationType";

export const createFavoriteProduct = async (data: TFavoriteProductCreate): Promise<TFavoriteProduct> => {
  const response = await api('favoriteProducts', {
    type: 'POST',
    data: JSON.stringify(data)
  });
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
  return response;
}

export const deleteFavoriteProduct = async (id: number | string) => {
  await api(`favoriteProducts/${id}`, {
    type: 'DELETE'
  });
}