'use server'
import { TProduct } from "./productType";
import { TPagination } from "../../types/paginationType";
// import { revalidateTag } from "next/cache";
import { api } from "../api";

export const createProduct = async (data: FormData): Promise<TProduct> => {
  const response = await api(`products`, {
    type: 'POST',
    data: data,
    contentType: 'multipart/form-data'
  });
  return response;
}

export const getAllProducts = async (): Promise<TPagination<TProduct>> => {
  // добавить пагинацию
  // const response = await api(`products?limit=100&page=1`);
  const response = await api(`products`);
  return response;
}

export const getOneProduct = async (id: number | string): Promise<TProduct> => {
  const response = await api(`products/${id}`);
  return response;
}

export const updateProduct = async (data: FormData): Promise<TProduct> => {
  // const response = await fetch(`http://localhost:5000/api/products/${93}`, {
  //   method: 'PUT',
  //   body: data,
  //   cache: "no-cache",
  // },

  // ).then((response) => {
  //   return response.json();
  // });
  const response = await api(`products/${data.get('id')}`, {
    type: 'PUT',
    data: data,
    contentType: 'multipart/form-data'
  });
  return response;
}

export const deleteProduct = async (id: number | string) => {
  const response = await api(`products/${id}`, {
    type: 'DELETE',
  });
  return response;
}