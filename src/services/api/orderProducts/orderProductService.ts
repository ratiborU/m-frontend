'use server'
import { TPagination } from "../types/paginationType";
import { revalidateTag } from "next/cache";
import { TOrderProduct, TOrderProductCreate } from "../types/orderProductType";

export const createOrder = async (data: TOrderProductCreate): Promise<TOrderProduct> => {
  const response = await fetch(`${process.env.BACKEND_URL}/orderProducts`, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err));
  revalidateTag('orderProducts')
  return response;
}

export const getAllOrders = async (): Promise<TPagination<TOrderProduct[]>> => {
  // добавить пагинацию
  const response = await fetch(`${process.env.BACKEND_URL}/orderProducts`)
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err));
  return response;
}

export const getOneOrder = async (id: number | string): Promise<TOrderProduct> => {
  const response = await fetch(`${process.env.BACKEND_URL}/orderProducts/${id}`)
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err));
  return response;
}

export const updateOrder = async (data: TOrderProduct): Promise<TOrderProduct> => {
  const response = await fetch(`${process.env.BACKEND_URL}/orderProducts`, {
    method: "PUT",
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err));
  revalidateTag('orderProducts')
  return response;
}

export const deleteOrder = async (id: number | string) => {
  const response = await fetch(`${process.env.BACKEND_URL}/orderProducts/${id}`, {
    method: "DELETE",
  })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err));
  revalidateTag('orderProducts')
  return response;
}