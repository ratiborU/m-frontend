export const getAllProducts = async () => {
  const response = await fetch(`http://localhost:5000/api/products?limit=100&page=1`, {
    next: {
      revalidate: 3600, // обновлять каждый час
      tags: ['products']
    }
  });
  const products = await response.json();
  return products;
}

