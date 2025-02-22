'use server'
import { api } from "../api";
import { TBasketProduct, TBasketProductCreate } from "./basketProductType";
import { TPagination } from "../../types/paginationType";

export const createBasketProduct = async (data: TBasketProductCreate): Promise<TBasketProduct> => {
  const response = await api('busketProducts', {
    type: 'POST',
    data: JSON.stringify(data)
  });
  return response;
}

export const getAllBasketProducts = async (): Promise<TPagination<TBasketProduct>> => {
  // добавить пагинацию
  const response = await api('busketProducts');
  return response;
}

export const getOneBasketProduct = async (id: number | string): Promise<TBasketProduct> => {
  const response = await api(`busketProducts/${id}`);
  return response;
}

export const updateBasketProduct = async (data: TBasketProduct): Promise<TBasketProduct> => {
  const response = await api('busketProducts', {
    type: 'PUT',
    data: JSON.stringify(data)
  });
  return response;
}

export const deleteBasketProduct = async (id: number | string) => {
  await api(`busketProducts/${id}`, {
    type: 'DELETE'
  });
}