import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/NavBar/Navbar";
import { cn } from "@/lib/utils";
import QueryProvider from "@/components/QueryProvider";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tumaini Fitness | Premier Hiking Tours and Adventure Experiences",
  description:
    "Join Tumaini Fitness for expert-led hiking tours, summit adventures, and scenic trail explorations. Ideal for all fitness levels, we create memorable outdoor experiences that connect you with nature.",
  keywords: [
    "Tumaini Fitness",
    "hiking tours",
    "summit hikes",
    "scenic trails",
    "adventure fitness",
    "nature tours",
    "outdoor experiences",
    "hiking",
    "hikes",
    "mt kenya",
    "kenya",
    "aberdares",
    "7 ponds",
  ],
  openGraph: {
    title: "Tumaini Fitness | Hiking Tours & Adventure Experiences",
    description:
      "Discover the best hiking tours and adventure experiences with Tumaini Fitness. Safe and memorable outdoor journeys for all levels.",
    url: "https://tumainifitness.co.ke",
    siteName: "Tumaini Fitness",
    images: [
      {
        url: "/public/image/tumainiFitnessChooseUs.jpg", // Replace with an actual image
        width: 1200,
        height: 630,
        alt: "Tumaini Fitness - Hiking and Adventure",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tumaini Fitness | Hiking Tours & Adventures",
    description:
      "Join Tumaini Fitness for safe and exciting hiking tours across scenic trails and summits.",
    images: ["/public/image/tumaini hikers bg-01.png"], // Replace with an actual image
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Tumaini Fitness | Premier Hiking Tours"
        />
        <meta
          property="og:description"
          content="Join Tumaini Fitness for expert-led hiking tours and scenic trail explorations. Perfect for adventurers of all levels."
        />
        <meta property="og:url" content="https://tumainifitness.co.ke" />
        <meta
          property="og:image"
          content="/public/image/tumaini hikers bg-01.png"
        />
      </head>
      <body className={cn(inter.className)}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main
              className="mx-auto w-full px-3 md:max-w-[95%] lg:max-w-[1200px]"
              role="main"
            >
              {children}
            </main>
            <Footer />
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
