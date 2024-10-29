import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const products = await response.json();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const productsEntries = products.map((x: { id: any; }) => ({
    url: `${process.env.FRONTEND_URL}/products/${x.id}`,
    // lastModified: new Date(),
    // changeFrequency: '',
    // priority: 1 // не используется
  }))

  return [
    {
      url: `${process.env.FRONTEND_URL}/authorization/login`,
      lastModified: new Date()
    },
    ...productsEntries
  ]
}