import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const limit = req.nextUrl.searchParams.get("limit") || undefined;
  try {
    const tours = await prisma.tour.findMany({
      take: limit ? parseInt(limit) : undefined,
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
