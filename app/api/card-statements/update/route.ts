import { NextResponse } from "next/server";
import { getUser } from "../../lib/user";
import { CardStatementRequestSchema } from "@/lib/validations";
import { z } from "zod";
import { prisma } from "@/lib/db";


export async function PUT(req: Request) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = CardStatementRequestSchema.safeParse(await req.json());
  
    if(!parsed.success){
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: z.treeifyError(parsed.error),
        },
        { status: 400 }
      );
    };
  
     const data = parsed.data;

  try {
    await prisma.$transaction(async (tx) => {
      await tx.cardStatement.update({
        where: {
          id_userId: {
            id: data.id,
            userId: user.id,
          },
        },
        data: {
          creditCardName: data.creditCardName ?? null,
          creditCardHolder: data.creditCardHolder ?? null,
          creditCardNumber: data.creditCardNumber,
          issuerName: data.issuerName,
          issuerAddress: data.issuerAddress ?? null,
          recipientName: data.recipientName ?? null,
          recipientAddress: data.recipientAddress ?? null,
          date: new Date(data.date),
          currency: data.currency ?? null,
          totalAmountDue:
           data.totalAmountDue !== null && data.totalAmountDue !== undefined
              ? data.totalAmountDue
              : null,
        },
      });

      await tx.cardTransaction.deleteMany({
        where: {
          cardStatementId: data.id,
        },
      });

      if  (data.transactions?.length) {
        await tx.cardTransaction.createMany({
          data: data.transactions.map((item) => ({
            cardStatementId: data.id,
            description: item.description ?? null,
            category: item.category,
            amount:
              item.amount !== null && item.amount !== undefined
                ? item.amount
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
