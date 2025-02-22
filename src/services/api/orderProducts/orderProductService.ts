'use server'
import { api } from "../api";
import { TOrderProduct, TOrderProductCreate } from "./orderProductType";
import { TPagination } from "../../types/paginationType";

export const createOrderProduct = async (data: TOrderProductCreate): Promise<TOrderProduct> => {
  const response = await api('orderProducts', {
    type: 'POST',
    data: JSON.stringify(data)
  });
  return response;
}

export const getAllOrderProducts = async (): Promise<TPagination<TOrderProduct>> => {
  // добавить пагинацию
  const response = await api('orderProducts');
  return response;
}

export const getOneOrderProduct = async (id: number | string): Promise<TOrderProduct> => {
  const response = await api(`orderProducts/${id}`);
  return response;
}

export const updateOrderProduct = async (data: TOrderProduct): Promise<TOrderProduct> => {
  const response = await api('orderProducts', {
    type: 'PUT',
    data: JSON.stringify(data)
  });
  return response;
}

export const deleteOrderProduct = async (id: number | string) => {
  await api(`orderProducts/${id}`, {
    type: 'DELETE'
  });
}