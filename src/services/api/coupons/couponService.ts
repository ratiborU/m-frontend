'use server'
import { api } from "../api";
import { TCoupon, TCouponCreate } from "./couponType";
import { TPagination } from "../../types/paginationType";

export const createCoupon = async (data: TCouponCreate): Promise<TCoupon> => {
  const response = await api('coupons', {
    type: 'POST',
    data: JSON.stringify(data)
  });
  return response;
}

export const getAllCoupons = async (): Promise<TPagination<TCoupon>> => {
  // добавить пагинацию
  const response = await api('coupons');
  return response;
}

export const getCouponsByPersonId = async (id: number | string): Promise<TPagination<TCoupon>> => {
  // добавить пагинацию
  const response = await api(`coupons/byPersonIdId/${id}`);
  return response;
}

export const getOneCoupon = async (id: number | string): Promise<TCoupon> => {
  const response = await api(`coupons/${id}`);
  return response;
}

export const checkOneCoupon = async (value: string): Promise<TCoupon> => {
  const response = await api(`coupons/check/?value=${value}`, {
    cache: 'no-cache'
  });
  return response;
}

export const updateCoupon = async (data: TCoupon): Promise<TCoupon> => {
  const response = await api('coupons', {
    type: 'PUT',
    data: JSON.stringify(data)
  });
  return response;
}

export const deleteCoupon = async (id: number | string) => {
  await api(`coupons/${id}`, {
    type: 'DELETE'
  });
}