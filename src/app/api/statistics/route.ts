import { NextResponse } from "next/server";
import { prisma } from "../../../../services/prisma";

export async function GET(request: Request) {
  const statistics = await prisma.statistic.findMany();

  return NextResponse.json(statistics);
}

export async function POST(request: Request) {
  const body = await request.json();

  const statistic = await prisma.statistic.create({
    data: {
      statistics: JSON.stringify(body.statistics),
      messages: {
        connect: body.messages.map((id: number) => ({ id })),
      },
    },
  });

  return NextResponse.json(statistic);
}
