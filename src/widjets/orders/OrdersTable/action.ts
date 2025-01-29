export const getAllProducts = async () => {
  const response = await fetch(`http://localhost:5000/api/orders?limit=100&page=1`, {
    next: {
      revalidate: 60, // обновляет каждую минуту
      tags: ['orders']
    }
  });
  const products = await response.json();
  return products;
}

