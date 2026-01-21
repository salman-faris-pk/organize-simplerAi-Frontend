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

  const invoice = await prisma.invoice.findFirst({
    where: { id: receiptId, userId: user.id },
    include: { items: true },
  });

  if (!invoice) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  return NextResponse.json(invoice, { status: 200 });
}
