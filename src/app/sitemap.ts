import prisma from "@/lib/prisma";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://tumainifitness.co.ke";

  try {
    // Fetch all tours for dynamic routes
    const tours = await prisma.tour.findMany({
      select: {
        id: true,
        updatedAt: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Generate tour entries
    const tourEntries: MetadataRoute.Sitemap = tours.map((tour) => ({
      url: `${baseUrl}/tour-details/${tour.id}`,
      lastModified: tour.updatedAt || tour.createdAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // Static pages with SEO priorities
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: `${baseUrl}/tours`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      },
      {
        url: `${baseUrl}/gallery`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.5,
      },
      {
        url: `${baseUrl}/hike-preparation`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      },
      {
        url: `${baseUrl}/event-cancellation`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.3,
      },
    ];

    return [...staticPages, ...tourEntries];
  } catch (error) {
    console.error("Error generating sitemap:", error);

    // Fallback sitemap with static pages only
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: `${baseUrl}/tours`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      },
    ];
  }
}
