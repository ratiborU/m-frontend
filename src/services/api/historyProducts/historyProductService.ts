'use server'
import { api } from "../api";
import { THistoryProduct, THistoryProductCreate } from "./historyProductType";
import { TPagination } from "../../types/paginationType";

export const createHistoryProduct = async (data: THistoryProductCreate): Promise<THistoryProduct> => {
  const response = await api('productsHistory', {
    type: 'POST',
    data: JSON.stringify(data)
  });
  return response;
}

export const getAllHistoryProducts = async (): Promise<TPagination<THistoryProduct>> => {
  // добавить пагинацию
  const response = await api('productsHistory');
  return response;
}

export const getHistoryProductsByPersonId = async (id: number | string): Promise<THistoryProduct[]> => {
  // добавить пагинацию
  const response = await api(`productsHistory/byPersonId/${id}`);
  return response;
}

export const getOneHistoryProduct = async (id: number | string): Promise<THistoryProduct> => {
  const response = await api(`productsHistory/${id}`);
  return response;
}

export const updateHistoryProduct = async (data: THistoryProduct): Promise<THistoryProduct> => {
  const response = await api('productsHistory', {
    type: 'PUT',
    data: JSON.stringify(data)
  });
  return response;
}

export const deleteHistoryProduct = async (id: number | string) => {
  await api(`productsHistory/${id}`, {
    type: 'DELETE'
  });
}