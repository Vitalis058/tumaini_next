import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Create a new tour using Prisma
    const tour = await prisma.tour.findMany();

    // Return the created tour as a response
    return NextResponse.json(tour, { status: 201 });
  } catch (error) {
    console.error("Error in processing the request", error);

    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
