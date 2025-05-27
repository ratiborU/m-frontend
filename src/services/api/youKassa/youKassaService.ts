'use server'
import { api } from "../api";
// import { TProduct } from "../products/productType";
// import { cookies } from "next/headers";
import { youKassaSend } from "./youKassaType";

export const createPayment = async (data: youKassaSend): Promise<unknown> => {
  const response = await api(`youkassa`, {
    type: 'POST',
    data: JSON.stringify(data),
  });
  return response;
}

// export const getAllRecommendations = async (): Promise<TProduct[]> => {
//   const id = cookies().get('personId')?.value;
//   const response = await api(`recomendations/recomendationsByPersonId/${id}`);
//   return response;
// }
