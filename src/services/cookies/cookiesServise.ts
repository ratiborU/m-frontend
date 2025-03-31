import { cookies } from "next/headers";

export const clearCookies = async () => {
  await cookies().delete('access');
  await cookies().delete('refresh');
  await cookies().delete('personId');
}