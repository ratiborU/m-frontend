'use server'
import { api } from "../api";
// import { TComment, TCommentCreate } from "./commentType";
import { TProduct } from "../products/productType";
import { TPagination } from "../../types/paginationType";
import { cookies } from "next/headers";

// export const createComment = async (data: TCommentCreate): Promise<TComment> => {
//   const response = await api('comments', {
//     type: 'POST',
//     data: JSON.stringify(data)
//   });
//   return response;
// }

export const getAllSimularsByProductId = async (id: number | string): Promise<TProduct[]> => {
  // добавить пагинацию
  const response = await api(`recomendations/${id}`);
  return response;
}

export const getAllRecommendations = async (): Promise<TProduct[]> => {
  // добавить пагинацию
  const id = cookies().get('personId')?.value;
  const response = await api(`recomendations/recomendationsByPersonId/${id}`);
  return response;
}

// export const getCommentsByProductId = async (id: number | string): Promise<TPagination<TComment>> => {
//   // добавить пагинацию
//   const response = await api(`comments/byProductId/${id}`);
//   return response;
// }

// export const getCommentsByPersonId = async (id: number | string): Promise<TComment[]> => {
//   // добавить пагинацию
//   const response = await api(`comments/byPersonId/${id}`);
//   return response;
// }

// // byPersonAndProductId
// export const getOneCommentByPersonAndProductId = async (personId: number | string, productId: number | string): Promise<TComment> => {
//   // добавить пагинацию
//   const response = await api(`comments/byPersonAndProductId/0?personId=${personId}&productId=${productId}`);
//   return response;
// }

// export const getOneComment = async (id: number | string): Promise<TComment> => {
//   const response = await api(`comments/${id}`);
//   return response;
// }

// export const updateComment = async (data: TComment): Promise<TComment> => {
//   const response = await api('comments', {
//     type: 'PUT',
//     data: JSON.stringify(data)
//   });
//   return response;
// }

// export const deleteComment = async (id: number | string) => {
//   await api(`comments/${id}`, {
//     type: 'DELETE'
//   });
// }