'use server'
import { api } from "./api";

export const loginApi = async (data) => {
  const response = await api('persons/login', {
    type: "POST",
    data: data,
    onSuccess: (data) => {
      console.log('login');
      // setCookies(data.tokens);
    },
  });
  return response;
}

export const createProduct = async (data) => {
  // console.log(cookies().get('access')?.value)
  const response = await api(`products`, {
    type: 'POST',
    data: data
  });
  return response;
}