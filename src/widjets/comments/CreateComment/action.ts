'use server'
import { CommentScheme } from "./models";
import { revalidateTag } from "next/cache";

export const postPerson = async (data: CommentScheme) => {
  await fetch(`http://localhost:5000/api/comments`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
  revalidateTag('comments')
  return;
}