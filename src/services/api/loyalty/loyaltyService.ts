'use server'
import { api } from "../api";
// import { TComment, TCommentCreate } from "./commentType";
import { cookies } from "next/headers";
import { TLoyalty } from "./loyaltyType";


export const getLoyalty = async (): Promise<TLoyalty> => {
  // добавить пагинацию
  const id = cookies().get('personId')?.value;
  const response = await api(`loyals/byPersonId/${id}`);
  console.log(response);
  return response;
}
