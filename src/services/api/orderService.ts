'use server'
import { TPagination } from "../types/paginationType";
import { revalidateTag } from "next/cache";
import { TOrder, TOrderCreate } from "../types/orderType";

export const createOrder = async (data: TOrderCreate): Promise<TOrder> => {
  const response = await fetch(`${process.env.BACKEND_URL}/orders`, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err));
  revalidateTag('orders')
  return response;
}

export const getAllOrders = async (): Promise<TPagination<TOrder[]>> => {
  // добавить пагинацию
  const response = await fetch(`${process.env.BACKEND_URL}/orders?limit=100&page=1`)
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err));
  return response;
}

export const getOneOrder = async (id: number | string): Promise<TOrder> => {
  const response = await fetch(`${process.env.BACKEND_URL}/orders/${id}`)
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err));
  return response;
}

export const updateOrder = async (data: TOrder): Promise<TOrder> => {
  const response = await fetch(`${process.env.BACKEND_URL}/orders`, {
    method: "PUT",
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err));
  revalidateTag('orders')
  return response;
}

export const deleteOrder = async (id: number | string) => {
  const response = await fetch(`${process.env.BACKEND_URL}/orders/${id}`, {
    method: "DELETE",
  })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err));
  revalidateTag('orders')
  return response;
}