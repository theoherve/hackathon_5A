import { NextResponse } from "next/server";
import { prisma } from "../../../../services/prisma";

export async function GET(request: Request) {
  const users = await prisma.message.findMany({
    where: {
      fromUser: true,
    },
  });

  return NextResponse.json(users);
}
