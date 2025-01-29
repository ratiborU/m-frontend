'use server'
import { PersonScheme } from "./models";
import { revalidateTag } from "next/cache";


export const putOrder = async (data: PersonScheme) => {
  await fetch(`http://localhost:5000/api/orders`, {
    method: "PUT",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
  revalidateTag('orders')
  return;
}


export const getAllOrderProducts = async (id: string) => {
  const response = await fetch(`http://localhost:5000/api/orderProducts/byOrderId/${id}?limit=100&page=1`, {
    next: {
      revalidate: 60, // обновляет каждую минуту
      tags: ['orders']
    }
  });
  const products = await response.json();
  return products;
}
