import { NextResponse } from "next/server";
import { prisma } from "../../../../services/prisma";

export async function GET(request: Request) {
  const services = await prisma.categorie.findMany();

  return NextResponse.json(services);
}

export async function POST(request: Request) {
  const body = await request.json();
  const services = await prisma.categorie.create({
    data: {
      name: body.name,
      isActive: body.isActive,
    },
  });

  return NextResponse.json(services);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const services = await prisma.categorie.update({
    where: {
      name: body.name,
    },
    data: {
      isActive: body.isActive,
    },
  });

  return NextResponse.json(services);
}
