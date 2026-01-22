import { NextResponse } from "next/server";
import { getUser } from "../lib/user";
import { prisma } from "@/lib/db";
import {
  CardStatementRequestSchema,
  InvoiceRequestSchema,
  ReceiptRequestSchema,
} from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userUUID = user.id;
    const { uuid, json } = await req.json();

    if (!uuid || !json) {
      return NextResponse.json(
        { error: "No UUID or JSON provided" },
        { status: 400 },
      );
    }

    let jsonObj;
    try {
      jsonObj = JSON.parse(json);
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const extraction = await prisma.extraction.findUnique({
      where: { id: uuid },
    });
    if (!extraction) {
      return NextResponse.json(
        { error: "Extraction not found" },
        { status: 404 },
      );
    }

    let data;

    switch (extraction.category) {
      case "receipts": {
        const validated = ReceiptRequestSchema.parse(jsonObj);
        data = await prisma.receipt.create({
          data: {
            extractionId: uuid,
            userId: userUUID,
            objectPath: extraction.objectPath,
            number: validated.number ?? null,
            category: validated.category,
            date: new Date(validated.date).toISOString(),
            time: validated.time ?? null,
            from: validated.from,
            subtotal: validated.subtotal ?? null,
            tax: validated.tax ?? null,
            tip: validated.tip ?? null,
            total: validated.total,
            items: validated.items
              ? {
                  create: validated.items.map((item) => ({
                    description: item.description,
                    quantity: item.quantity,
                    amount: item.amount,
                  })),
                }
              : undefined,
          },
        });

        break;
      };






    }
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
