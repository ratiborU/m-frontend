export const getAllProducts = async () => {
  const response = await fetch(`http://localhost:5000/api/comments?limit=100&page=1`, {
    next: {
      revalidate: 60, // обновлять каждый час
      tags: ['comments']
    }
  });
  const products = await response.json();
  return products;
}

