'use server'
import { api } from "../api";
// import { TComment, TCommentCreate } from "./commentType";
import { TProduct } from "../products/productType";
import { TPagination } from "../../types/paginationType";
import { cookies } from "next/headers";
import { TLoyalty } from "./loyaltyType";


export const getLoyalty = async (): Promise<TLoyalty> => {
  // добавить пагинацию
  const id = cookies().get('personId')?.value;
  const response = await api(`loyals/${id}`);
  console.log(response);
  return response;
}
