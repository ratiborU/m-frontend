'use server'

import { revalidateTag } from "next/cache";

export type State =
  | {
    status: "success";
    message: string;
  }
  | null;

export const postPerson = async (data) => {
  console.log(JSON.stringify(data));
  await fetch(`http://localhost:5000/api/persons`, {
    method: "PUT",
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