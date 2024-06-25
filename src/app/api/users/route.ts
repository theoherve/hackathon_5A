import { NextResponse } from 'next/server'
import { prisma } from '../../../../services/prisma'

export async function GET(request: Request) {
  const users = (await prisma.user.findMany({
    include: {
      messages: true,
    },
  }));

  return NextResponse.json(users)
}