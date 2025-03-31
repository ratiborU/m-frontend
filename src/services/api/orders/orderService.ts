'use server'
import { api } from "../api";
import { TOrder, TOrderCreate } from "./orderType";
import { TPagination } from "../../types/paginationType";
import { cookies } from "next/headers";

export const createOrder = async (data: TOrderCreate): Promise<TOrder> => {
  const response = await api('orders', {
    type: 'POST',
    data: JSON.stringify({
      ...data,
      personId: cookies().get('personId')?.value || 0
    })
  });
  return response;
}

export const getAllOrders = async (): Promise<TPagination<TOrder>> => {
  // добавить пагинацию
  const response = await api('orders');
  return response;
}

export const getAllOrdersByPersonId = async (id: number | string): Promise<TOrder[]> => {
  // добавить пагинацию
  const response = await api(`orders/byPersonId/${cookies().get('personId')?.value || 0}`);
  return response;
}

export const getOneOrder = async (id: number | string): Promise<TOrder> => {
  const response = await api(`orders/${id}`);
  return response;
}

export const updateOrder = async (data: TOrder): Promise<TOrder> => {
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