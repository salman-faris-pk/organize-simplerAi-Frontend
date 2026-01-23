import { NextResponse } from "next/server";
import { getUser } from "../lib/user";
import { prisma } from "@/lib/db";
import {
  CardStatementRequestSchema,
  InvoiceRequestSchema,
  ReceiptRequestSchema,
} from "@/lib/validations";
import { Status } from "@/lib/generated/prisma/client";

export async function POST(req: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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

    await prisma.$transaction(async (tx) => {
      const extraction = await tx.extraction.findFirst({
        where: {
          id: uuid,
          userId: user.id,
          status: Status.TO_VERIFY,
        },
      });

      if (!extraction) {
        throw new Error("EXTRACTION_NOT_FOUND");
      }

      switch (extraction.category) {
        case "receipts": {
          const v = ReceiptRequestSchema.parse(jsonObj);

          await tx.receipt.create({
            data: {
              extractionId: uuid,
              userId: user.id,
              objectPath: extraction.objectPath,
              number: v.number ?? null,
              category: v.category,
              date: new Date(v.date),
              time: v.time ?? null,
              from: v.from,
              subtotal: v.subtotal ?? null,
              tax: v.tax ?? null,
              tip: v.tip ?? null,
              total: v.total,
              items: v.items
                ? {
                    create: v.items.map((item) => ({
                      description: item.description,
                      quantity: item.quantity,
                      amount: item.amount,
                    })),
                  }
                : undefined,
            },
          });
          break;
        }

        case "invoices": {
          const v = InvoiceRequestSchema.parse(jsonObj);

          await tx.invoice.create({
            data: {
              extractionId: uuid,
              userId: user.id,
              objectPath: extraction.objectPath,
              invoiceNumber: v.invoiceNumber ?? null,
              date: new Date(v.date),
              category: v.category,
              fromName: v.fromName ?? null,
              fromAddress: v.fromAddress ?? null,
              toName: v.toName ?? null,
              toAddress: v.toAddress ?? null,
              currency: v.currency ?? null,
              totalAmountDue: v.totalAmountDue ?? null,
              items: v.items
                ? {
                    create: v.items.map((item) => ({
                      description: item.description ?? null,
                      amount: item.amount ?? null,
                    })),
                  }
                : undefined,
            },
          });
          break;
        }

        case "credit card statements": {
          const v = CardStatementRequestSchema.parse(jsonObj);

          await tx.cardStatement.create({
            data: {
              extractionId: uuid,
              userId: user.id,
              objectPath: extraction.objectPath,
              issuerName: v.issuerName,
              issuerAddress: v.issuerAddress ?? null,
              recipientName: v.recipientName ?? null,
              recipientAddress: v.recipientAddress ?? null,
              creditCardName: v.creditCardName ?? null,
              creditCardHolder: v.creditCardHolder ?? null,
              creditCardNumber: v.creditCardNumber,
              date: new Date(v.date),
              currency: v.currency ?? null,
              totalAmountDue: v.totalAmountDue ?? null,
              transactions: v.transactions
                ? {
                    create: v.transactions.map((t) => ({
                      description: t.description ?? null,
                      category: t.category,
                      amount: t.amount ?? null,
                    })),
                  }
                : undefined,
            },
          });
          break;
        }

        default:
          throw new Error("INVALID_CATEGORY");
      }

      await tx.extraction.update({
        where: { id: uuid },
        data: {
          json,
          status: Status.PROCESSED,
        },
      });
    });

    return NextResponse.json({ message: "Process finished" }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.message === "EXTRACTION_NOT_FOUND") {
        return NextResponse.json(
          { error: "Extraction not found or invalid status" },
          { status: 404 },
        );
      }

      if (err.message === "INVALID_CATEGORY") {
        return NextResponse.json(
          { error: "Invalid category provided" },
          { status: 400 },
        );
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
