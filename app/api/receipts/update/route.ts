import { NextResponse } from "next/server";
import { getUser } from "../../lib/user";
import { prisma } from "@/lib/db";
import { ReceiptRequestSchema } from "@/lib/validations";
import { z } from "zod";

export async function PUT(req: Request) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = ReceiptRequestSchema.safeParse(await req.json());

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        issues: z.treeifyError(parsed.error),
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  try {
    await prisma.$transaction(async (tx) => {
      await tx.receipt.update({ //Update the main receipt
        where: {
          id_userId: {
            id: data.id,
            userId: user.id,
          },
        },
        data: {
          number: data.number ?? null,
          category: data.category,
          date: new Date(data.date),
          time: data.time ?? null,
          from: data.from,
          subtotal: data.subtotal != null ? data.subtotal : null,
          tax: data.tax != null ? data.tax : null,
          tip: data.tip != null ? data.tip : null,
          total: data.total,
        },
      });

      await tx.receiptItem.deleteMany({  //Delete all existing receipt items for this receipt
        where: {
          receiptId: data.id,
        },
      });

      if (data.items?.length) {
        await tx.receiptItem.createMany({  //Insert the new set of receipt items
          data: data.items.map((item) => ({
            receiptId: data.id,
            description: item.description,
            quantity: item.quantity,
            amount: item.amount,
          })),
        });
      }
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to update receipt" },
      { status: 400 },
    );
  }

  return NextResponse.json(
    { message: "Receipt updated successfully" },
    { status: 200 },
  );
}
