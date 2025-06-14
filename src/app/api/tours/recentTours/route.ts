import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

    const tours = await prisma.tour.findMany({
      where: {
        date: {
          gte: currentDate, // Get tours with dates greater than or equal to today
        },
      },
      take: 3,
      orderBy: {
        date: "asc", // Order by date ascending to get the soonest upcoming tours first
      },
    });

    const response = NextResponse.json(tours);

    // Add cache control headers to ensure fresh data
    response.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
