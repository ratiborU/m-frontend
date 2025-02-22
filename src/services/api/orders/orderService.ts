'use server'
import { api } from "../api";
import { TPerson, TPersonCreate } from "../persons/personType";
import { TPagination } from "../../types/paginationType";

export const createOrder = async (data: TPersonCreate): Promise<TPerson> => {
  const response = await api('orders', {
    type: 'POST',
    data: JSON.stringify(data)
  });
  return response;
}

export const getAllOrders = async (): Promise<TPagination<TPerson>> => {
  // добавить пагинацию
  const response = await api('orders');
  return response;
}

export const getOneOrder = async (id: number | string): Promise<TPerson> => {
  const response = await api(`orders/${id}`);
  return response;
}

export const updateOrder = async (data: TPerson): Promise<TPerson> => {
  const response = await api('orders', {
    type: 'PUT',
    data: JSON.stringify(data)
  });
  return response;
}

export const deleteOrder = async (id: number | string) => {
  await api(`orders/${id}`, {
    type: 'DELETE'
  });
}