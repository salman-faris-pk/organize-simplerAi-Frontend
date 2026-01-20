import { NextResponse } from "next/server";
import { getUser } from "../lib/user";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const session = await getUser();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const cardStatementId = searchParams.get("uuid");

  if (!cardStatementId) {
    return NextResponse.json({ error: "No UUID provided" }, { status: 400 });
  }

  const cardStatement = await prisma.cardStatement.findFirst({
    where: {
      id: cardStatementId,
      userId: session.id,
    },
    include: { transactions: true },
  });

  if (!cardStatement) {
    return NextResponse.json(
      { error: "CardStatement not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(cardStatement, { status: 200 });
}
