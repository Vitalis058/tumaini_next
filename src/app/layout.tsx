import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/NavBar/Navbar";
import { cn } from "@/lib/utils";
import QueryProvider from "@/components/QueryProvider";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tumaini Fitness | Premier Hiking Tours and Adventure Experiences",
  description:
    "Explore the best of hiking with Tumaini Fitness. Join our expert-led hiking tours across stunning landscapes, including summit hikes and scenic trails. Perfect for adventurers of all levels, Tumaini Fitness provides safe, memorable outdoor experiences that connect you with nature and elevate your fitness journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="./favicon.ico" sizes="any" />
      </Head>
      <body
        className={cn(
          "mx-auto max-w-full px-3 md:max-w-[95%] lg:max-w-[1250px]",
          inter.className
        )}
      >
        <QueryProvider>
          <Navbar />
          <main className="mt-3">{children}</main>
          <Footer />
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
