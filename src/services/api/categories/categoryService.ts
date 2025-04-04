'use server'
import { api } from "../api";
// import { TPerson, TPersonCreate } from "./personType";
import { TCategory, TCategoryCreate } from "./categoryType";
import { TPagination } from "../../types/paginationType";

export const createCategory = async (data: TCategoryCreate): Promise<TCategory> => {
  const response = await api('categories', {
    type: 'POST',
    data: JSON.stringify(data)
  });
  return response;
}

export const getAllCategories = async (): Promise<TPagination<TCategory>> => {
  // добавить пагинацию
  const response = await api('categories');
  return response;
}

export const getOneCategory = async (id: number | string): Promise<TCategory> => {
  const response = await api(`categories/${id}`);
  return response;
}

export const updateCategory = async (data: TCategory): Promise<TCategory> => {
  const response = await api('categories', {
    type: 'PUT',
    data: JSON.stringify(data)
  });
  return response;
}

export const deleteCategory = async (id: number | string) => {
  await api(`categories/${id}`, {
    type: 'DELETE'
  });
}