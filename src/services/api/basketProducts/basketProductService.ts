'use server'
import { api } from "../api";
import { TBasketProduct, TBasketProductCreate } from "./basketProductType";
import { TPagination } from "../../types/paginationType";
import { revalidateTag } from "next/cache";

export const createBasketProduct = async (data: TBasketProductCreate): Promise<TBasketProduct> => {
  const response = await api('basketProducts', {
    type: 'POST',
    data: JSON.stringify(data)
  });
  revalidateTag('products');
  return response;
}

export const getAllBasketProducts = async (): Promise<TPagination<TBasketProduct>> => {
  // добавить пагинацию
  const response = await api('basketProducts');
  return response;
}

export const getOneBasketProduct = async (id: number | string): Promise<TBasketProduct> => {
  const response = await api(`basketProducts/${id}`);
  return response;
}

export const updateBasketProduct = async (data: TBasketProduct): Promise<TBasketProduct> => {
  const response = await api('basketProducts', {
    type: 'PUT',
    data: JSON.stringify(data)
  });
  revalidateTag('products');
  return response;
}

export const deleteBasketProduct = async (id: number | string) => {
  await api(`basketProducts/${id}`, {
    type: 'DELETE'
  });
  revalidateTag('products');
}