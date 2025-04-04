'use server'
import { api } from "../api";
import { TAnswer, TAnswerCreate } from "./answerType";
import { TPagination } from "../../types/paginationType";

export const createAnswer = async (data: TAnswerCreate): Promise<TAnswer> => {
  const response = await api('answers', {
    type: 'POST',
    data: JSON.stringify(data)
  });
  return response;
}

export const getAllAnswers = async (): Promise<TPagination<TAnswer>> => {
  // добавить пагинацию
  const response = await api('answers');
  return response;
}

export const getAllAnswersByCommentId = async (id: number | string): Promise<TAnswer[]> => {
  // добавить пагинацию
  const response = await api(`answers/byCommentId/${id}`);
  return response;
}

export const getOneAnswer = async (id: number | string): Promise<TAnswer> => {
  const response = await api(`answers/${id}`);
  return response;
}

export const updateAnswer = async (data: TAnswer): Promise<TAnswer> => {
  const response = await api('answers', {
    type: 'PUT',
    data: JSON.stringify(data)
  });
  return response;
}

export const deleteAnswer = async (id: number | string) => {
  await api(`answers/${id}`, {
    type: 'DELETE'
  });
}