import { TCoupon } from "@/services/api/coupons/couponType";
import { z } from "zod";

export const editCouponSchema = z.object({
  value: z.string().min(1, 'мало'),
  text: z.string().min(1, 'мало'),
  discount: z.string().min(1, 'мало'),
  personId: z.string(),
})

export type TEditCouponSchema = z.infer<typeof editCouponSchema>;

export type TEditCouponProps = {
  coupon: TCoupon;
}