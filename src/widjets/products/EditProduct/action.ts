'use server'
import { revalidateTag } from "next/cache";

export const putProduct = async (formData: FormData) => {
  await fetch(`http://localhost:5000/api/products`, {
    method: "PUT",
    body: formData
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
  revalidateTag('products')
  return;
}

export const postImage = async (formData: FormData) => {
  await fetch(`http://localhost:5000/api/images`, {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
  revalidateTag('images')
  return;
}

export const deleteImage = async (id: string) => {
  await fetch(`http://localhost:5000/api/images/${id}`, {
    method: "DELETE"
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
  revalidateTag('images')
  return;
}