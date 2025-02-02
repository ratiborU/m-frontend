'use server'
// import { PersonScheme } from "./models";
// import { revalidateTag } from "next/cache";
import { cookies } from 'next/headers'
import { LoginScheme } from "./models";
// import { signIn } from '@/auth';
import { signIn } from "../../../auth";
import { AuthError } from 'next-auth';


export const login = async (data: LoginScheme) => {
  // console.log(data);
  // const formData = new FormData();
  // formData.append('email', '1');
  // formData.append('password', '1234')

  // await signIn('credentials', {
  //   'email': '1',
  //   'password': '1234'
  // });
  await fetch(`http://localhost:5000/api/persons/login`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(async (data) => {
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
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
      console.log(cookies().get('access')?.value);
    })
    .catch(err => console.log(err));
  // // revalidateTag('persons')
  return;
}