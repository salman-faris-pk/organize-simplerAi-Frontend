import { NextResponse } from "next/server";
import { getUser } from "../../lib/user";
import { CardStatementRequestSchema } from "@/lib/validations/bodyschemas";
import { z } from "zod";
import { prisma } from "@/lib/db";

export async function PUT(req: Request) {
  const session = await getUser();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;

  try {
    body = CardStatementRequestSchema.parse(await req.json());
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: z.treeifyError(err) },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  if (!body.id) {
    return NextResponse.json({ error: "Missing receipt id" }, { status: 400 });
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.cardStatement.update({
        where: {
          id_userId: {
            id: body.id,
            userId: session.id,
          },
        },
        data: {
          creditCardName: body.creditCardName ?? null,
          creditCardHolder: body.creditCardHolder ?? null,
          creditCardNumber: body.creditCardNumber,
          issuerName: body.issuerName,
          issuerAddress: body.issuerAddress ?? null,
          recipientName: body.recipientName ?? null,
          recipientAddress: body.recipientAddress ?? null,
          date: new Date(body.date),
          currency: body.currency ?? null,
          totalAmountDue:
            body.totalAmountDue !== null && body.totalAmountDue !== undefined
              ? Number(body.totalAmountDue)
              : null,
        },
      });

      await tx.cardTransaction.deleteMany({
        where: {
          cardStatementId: body.id,
        },
      });

      if (body.transactions?.length) {
        await tx.cardTransaction.createMany({
          data: body.transactions.map((item) => ({
            cardStatementId: body.id,
            description: item.description ?? null,
            category: item.category,
            amount:
              item.amount !== null && item.amount !== undefined
                ? Number(item.amount)
                : null,
          })),
        });
      }
    });

  } catch {
    return NextResponse.json(
      { error: "Failed to update card statement" },
      { status: 400 },
    );
  };

  return NextResponse.json(
      { message: "Card statement updated successfully" },
      { status: 200 },
    );
}
