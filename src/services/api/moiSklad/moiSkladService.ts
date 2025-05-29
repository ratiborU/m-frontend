'use server'
import { api } from "../api";

export const createProductsFromApi = async (): Promise<object> => {
  const response = await api('sklad', {
    type: 'POST'
  });
  return response;
}