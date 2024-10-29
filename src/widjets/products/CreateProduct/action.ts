'use server'
import { revalidateTag } from "next/cache";

export const postProduct = async (formData: FormData) => {
  console.log(formData);

  await fetch(`http://localhost:5000/api/products`, {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
  revalidateTag('products')
  return;
}