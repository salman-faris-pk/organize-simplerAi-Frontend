import { NextResponse } from "next/server";
import { getUser } from "../lib/user";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const receiptId = searchParams.get("uuid");

  if (!receiptId) {
    return NextResponse.json({ error: "No UUID provided" }, { status: 400 });
  }

  const receipt = await prisma.receipt.findFirst({
    where: {
      id: receiptId,
      userId: user.id,
    },
    include: { items: true },
  });

  if (!receipt) {
    return NextResponse.json({ error: "Receipt not found" }, { status: 404 });
  }

  return NextResponse.json(receipt, { status: 200 });
}
