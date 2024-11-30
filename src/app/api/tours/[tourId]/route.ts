import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Props = Promise<{
  tourId: string;
}>;

export async function GET(req: NextRequest, props: { params: Props }) {
  const { tourId } = await props.params;
  try {
    // Create a new tour using Prisma
    const tour = await prisma.tour.findUnique({
      where: {
        id: tourId,
      },
    });

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
