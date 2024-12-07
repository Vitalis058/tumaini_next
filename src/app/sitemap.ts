import prisma from "@/lib/prisma";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await prisma.tour.findMany();

  const postEntries: MetadataRoute.Sitemap = response.map(({ id }) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/tour-details/${id}`,
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/gallery`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
      lastModified: new Date(),
    },
    ...postEntries,
  ];
}
