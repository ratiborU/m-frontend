'use server'
import { api } from "./api";
import { TPerson, TPersonCreate } from "../types/personType";
import { TPagination } from "../types/paginationType";

export const createPerson = async (data: TPersonCreate): Promise<TPerson> => {
  const response = await api('persons', {
    type: 'POST',
    data: JSON.stringify(data)
  });
  return response;
}

export const getAllPersons = async (): Promise<TPagination<TPerson>> => {
  // добавить пагинацию
  const response = await api('persons');
  return response;
}

export const getOnePerson = async (id: number | string): Promise<TPerson> => {
  const response = await api(`persons/${id}`);
  return response;
}

export const updatePerson = async (data: TPerson): Promise<TPerson> => {
  const response = await api('persons', {
    type: 'PUT',
    data: JSON.stringify(data)
  });
  return response;
}

export const deletePerson = async (id: number | string) => {
  await api(`persons/${id}`, {
    type: 'DELETE'
  });
}