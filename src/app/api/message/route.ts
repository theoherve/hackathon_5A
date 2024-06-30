import { NextResponse } from "next/server";
import { prisma } from "../../../../services/prisma";

export async function GET(request: Request) {
  const messages = await prisma.message.findMany({
    where: {
      fromUser: true,
      statisticId: null,
    },
  });

  return NextResponse.json(messages);
}
