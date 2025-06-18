"use client";

import ToursClient from "@/components/tours/ToursClient";
import { generateBreadcrumbSchema } from "@/lib/seo";

export default function ToursPage() {
  // Generate breadcrumb structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tours", url: "/tours" },
  ]);

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
      <ToursClient />
    </>
  );
}
