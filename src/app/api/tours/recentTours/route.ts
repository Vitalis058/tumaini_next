import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tours = await prisma.tour.findMany({
      take: 3,
      orderBy: {
        date: "asc",
      },
    });
    return NextResponse.json(tours);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
