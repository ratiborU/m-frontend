'use server'
import { cookies } from 'next/headers'
import { LoginScheme } from "./models";


export const login = async (data: LoginScheme) => {
  await fetch(`http://localhost:5000/api/persons/login`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(async (data) => {
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 дней
      cookies().set("access", data.tokens.accessToken, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
      });
      cookies().set("refresh", data.tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
      });
      return data;
      // console.log(cookies().get('access')?.value);
    })
    .catch(err => console.log(err));
  // // revalidateTag('persons')
  return;
}