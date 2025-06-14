import ToursClient from "@/components/tours/ToursClient";
import prisma from "@/lib/prisma";
import {
  generateBreadcrumbSchema,
  generateMetadata as generateSEOMetadata,
} from "@/lib/seo";
import { Tour } from "@prisma/client";
import { Metadata } from "next";

// Force dynamic rendering and revalidate every 60 seconds
export const revalidate = 60;
export const dynamic = "force-dynamic";

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  try {
    const tourCount = await prisma.tour.count();

    return generateSEOMetadata({
      title: "Hiking Tours in Kenya | Browse All Adventures",
      description: `Discover ${tourCount}+ hiking tours across Kenya. From Mt Kenya to Aberdares, find the perfect adventure for your skill level. Professional guides, safety equipment included.`,
      keywords: [
        "hiking tours Kenya",
        "Mt Kenya tours",
        "Aberdares hiking",
        "adventure tours",
        "mountain climbing Kenya",
        "guided hikes",
        "Kenya tourism",
        "outdoor adventures",
      ],
      url: "/tours",
    });
  } catch (error) {
    console.error("Error generating tours metadata:", error);
    return generateSEOMetadata({
      title: "Hiking Tours in Kenya",
      description:
        "Discover amazing hiking tours across Kenya with professional guides.",
      url: "/tours",
    });
  }
}

export default async function ToursPage() {
  // Generate breadcrumb structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tours", url: "/tours" },
  ]);

  let initialTours: Tour[] = [];
  try {
    initialTours = await prisma.tour.findMany({
      orderBy: { createdAt: "desc" },
      take: 20, // Load first 20 tours for better performance
    });
  } catch (error) {
    console.error("Error fetching initial tours:", error);
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li>
            <a href="/" className="hover:text-primary transition-colors">
              Home
            </a>
          </li>
          <li>/</li>
          <li className="text-foreground font-medium" aria-current="page">
            Tours
          </li>
        </ol>
      </nav>

      {/* Client Component for Interactive Features */}
      <ToursClient initialTours={initialTours} />
    </>
  );
}
