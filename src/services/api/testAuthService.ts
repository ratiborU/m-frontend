'use server'
import { api } from "./api";

export const loginApi = async (data) => {
  const response = await api('persons/login', {
    type: "POST",
    data: data,
    onSuccess: (data) => {
      // setCookies(data.tokens);
    },
  });
  return response;
}

export const createProduct = async (data) => {
  const response = await api(`products`, {
    type: 'POST',
    data: data
  });
  return response;
}