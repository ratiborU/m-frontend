'use server'
import { TImage } from "./imageType";
import { TPagination } from "../../types/paginationType";
// import { revalidateTag } from "next/cache";
import { api } from "../api";

export const createImage = async (data: FormData): Promise<TImage> => {
  const response = await api(`images`, {
    type: 'POST',
    data: data,
    contentType: 'multipart/form-data'
  });
  return response;
}

export const getAllImages = async (): Promise<TPagination<TImage>> => {
  // добавить пагинацию
  // const response = await api(`products?limit=100&page=1`);
  const response = await api(`images`);
  return response;
}

export const getOneImage = async (id: number | string): Promise<TImage> => {
  const response = await api(`images/${id}`);
  return response;
}

export const updateImage = async (data: FormData): Promise<TImage> => {
  const response = await api(`images`, {
    type: 'PUT',
    data: data,
    contentType: 'multipart/form-data'
  });
  return response;
}

export const deleteImage = async (id: number | string) => {
  const response = await api(`images/${id}`, {
    type: 'DELETE',
  });
  return response;
}