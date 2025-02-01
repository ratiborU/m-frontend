'use server'
import { AnswerPost, PersonScheme } from "./models";
import { revalidateTag } from "next/cache";


export const postPerson = async (data: PersonScheme) => {
  await fetch(`http://localhost:5000/api/comments`, {
    method: "PUT",
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

export const postAnswer = async (data: AnswerPost) => {
  await fetch(`http://localhost:5000/api/answers`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
  revalidateTag('answers')
  return;
}

export const putAnswer = async (data: AnswerPost) => {
  await fetch(`http://localhost:5000/api/answers`, {
    method: "PUT",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
  revalidateTag('answers')
  return;
}