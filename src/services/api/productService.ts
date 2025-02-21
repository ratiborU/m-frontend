'use server'
import { TProduct } from "../types/productType";
import { TPagination } from "../types/paginationType";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { api } from "./api";

export const createProduct = async (data: FormData): Promise<TProduct> => {
  console.log(cookies().get('access')?.value)
  const response = await api(`products`, {
    type: 'POST',
    data: data,
    contentType: 'multipart/form-data'
  });
  return response;
}

export const getAllProducts = async (): Promise<TPagination<TProduct[]>> => {
  // добавить пагинацию
  const response = await api(`products`);
  return response;
}

export const getOneProduct = async (id: number | string): Promise<TProduct> => {
  const response = await api(`products/${id}`);
  return response;
}

export const updateProduct = async (data: FormData): Promise<TProduct> => {
  const response = await api(`products`, {
    type: 'PUT',
    data: data
  });
  return response;
}

export const deleteProduct = async (id: number | string) => {
  const response = await api(`products`, {
    type: 'DELETE',
  });
  return response;
}