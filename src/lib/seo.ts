import { Metadata } from "next";

// SEO Constants
export const SEO_CONFIG = {
  siteName: "Tumaini Fitness",
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://tumainifitness.co.ke",
  defaultTitle:
    "Tumaini Fitness | Premier Hiking Tours & Adventure Experiences in Kenya",
  defaultDescription:
    "Join Tumaini Fitness for expert-led hiking tours, summit adventures, and scenic trail explorations across Kenya. Professional guides, safety-first approach, and unforgettable outdoor experiences for all fitness levels.",
  defaultKeywords: [
    "hiking tours Kenya",
    "Mt Kenya hiking",
    "Aberdares hiking",
    "adventure tours Kenya",
    "hiking guides Kenya",
    "outdoor adventures",
    "summit expeditions",
    "nature tours",
    "fitness hiking",
    "Kenya tourism",
    "mountain climbing",
    "trail hiking",
    "eco-tourism Kenya",
    "adventure fitness",
    "hiking experiences",
  ],
  author: "Tumaini Fitness",
  twitterHandle: "@TumainiFitness",
  facebookPage: "TumainiFitness",
  instagramHandle: "@tumainifitness",
  defaultImage: "/images/og-default.jpg",
  logo: "/images/tumaini-logo.png",
};

// Generate structured data for organization
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.logo}`,
    description: SEO_CONFIG.defaultDescription,
    address: {
      "@type": "PostalAddress",
      addressCountry: "KE",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+254-XXX-XXXXXX",
      contactType: "customer service",
      availableLanguage: ["English", "Swahili"],
    },
    sameAs: [
      `https://facebook.com/${SEO_CONFIG.facebookPage}`,
      `https://instagram.com/${SEO_CONFIG.instagramHandle}`,
      `https://twitter.com/${SEO_CONFIG.twitterHandle}`,
    ],
    serviceArea: {
      "@type": "Country",
      name: "Kenya",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Hiking Tours",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "Mt Kenya Hiking Tours",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "Aberdares Hiking Tours",
          },
        },
      ],
    },
  };
}

// Generate structured data for tour
export function generateTourSchema(tour: {
  id: string;
  tourName: string;
  description: string;
  price: number;
  location: string;
  date: string;
  rating: number;
  images: string[];
  difficulty: string;
  duration?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.tourName,
    description: tour.description,
    url: `${SEO_CONFIG.siteUrl}/tour-details/${tour.id}`,
    image: tour.images.map((img) =>
      img.startsWith("http") ? img : `${SEO_CONFIG.siteUrl}${img}`
    ),
    offers: {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: "KES",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString(),
      seller: {
        "@type": "Organization",
        name: SEO_CONFIG.siteName,
      },
    },
    provider: {
      "@type": "Organization",
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
    },
    location: {
      "@type": "Place",
      name: tour.location,
      addressCountry: "KE",
    },
    startDate: tour.date,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tour.rating,
      bestRating: 5,
      worstRating: 1,
      ratingCount: Math.floor(Math.random() * 50) + 10, // Placeholder
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Difficulty Level",
        value: tour.difficulty,
      },
    ],
  };
}

// Generate breadcrumb structured data
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${SEO_CONFIG.siteUrl}${item.url}`,
    })),
  };
}

// Generate FAQ structured data
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Generate metadata for pages
export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = "website",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}): Metadata {
  const fullTitle = title
    ? `${title} | ${SEO_CONFIG.siteName}`
    : SEO_CONFIG.defaultTitle;

  const fullDescription = description || SEO_CONFIG.defaultDescription;
  const fullKeywords = [...SEO_CONFIG.defaultKeywords, ...keywords];
  const fullImage = image || SEO_CONFIG.defaultImage;
  const fullUrl = url ? `${SEO_CONFIG.siteUrl}${url}` : SEO_CONFIG.siteUrl;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: fullKeywords,
    authors: [{ name: SEO_CONFIG.author }],
    creator: SEO_CONFIG.author,
    publisher: SEO_CONFIG.siteName,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type,
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: fullImage.startsWith("http")
            ? fullImage
            : `${SEO_CONFIG.siteUrl}${fullImage}`,
          width: 1200,
          height: 630,
          alt: title || SEO_CONFIG.siteName,
        },
      ],
      locale: "en_KE",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [
        fullImage.startsWith("http")
          ? fullImage
          : `${SEO_CONFIG.siteUrl}${fullImage}`,
      ],
      creator: SEO_CONFIG.twitterHandle,
      site: SEO_CONFIG.twitterHandle,
    },
    alternates: {
      canonical: fullUrl,
    },
    other: {
      "geo.region": "KE",
      "geo.placename": "Kenya",
      "geo.position": "-1.286389;36.817223", // Nairobi coordinates
    },
  };
}

// Generate tour-specific metadata
export function generateTourMetadata(tour: {
  tourName: string;
  description: string;
  location: string;
  price: number;
  images: string[];
  difficulty: string;
  id: string;
}) {
  const title = `${tour.tourName} - ${tour.location} Hiking Tour`;
  const description = `${tour.description.substring(0, 150)}... Book this ${tour.difficulty.toLowerCase()} hiking tour in ${tour.location} starting from KES ${tour.price.toLocaleString()}.`;
  const keywords = [
    tour.tourName.toLowerCase(),
    `${tour.location.toLowerCase()} hiking`,
    `${tour.difficulty.toLowerCase()} hike`,
    `hiking tour ${tour.location.toLowerCase()}`,
    `${tour.location.toLowerCase()} adventure`,
  ];

  return generateMetadata({
    title,
    description,
    keywords,
    image: tour.images[0],
    url: `/tour-details/${tour.id}`,
    type: "article",
  });
}

// SEO-friendly URL slug generator
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim();
}
