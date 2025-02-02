'use server'
import { cookies } from "next/headers";
import { PersonScheme } from "./models";
import { revalidateTag } from "next/cache";

export const postPerson = async (data: PersonScheme) => {
  console.log(cookies().get('access')?.value)
  await fetch(`http://localhost:5000/api/persons`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
  revalidateTag('persons')
  return;
}