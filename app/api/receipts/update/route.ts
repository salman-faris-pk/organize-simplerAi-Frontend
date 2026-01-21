import { NextResponse } from "next/server";
import { getUser } from "../../lib/user";
import { prisma } from "@/lib/db";
import { ReceiptRequestSchema } from "@/lib/validations/bodyschemas";
import { z } from "zod";

export async function PUT(req: Request) {
  const session = await getUser();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let data;

  try {
    data = ReceiptRequestSchema.parse(await req.json());
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

  if (!data?.id) {
    return NextResponse.json({ error: "Missing receipt id" }, { status: 400 });
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.receipt.update({   //Update the main receipt
        where: {
          id_userId: {
            id: data.id,
            userId: session.id,
          },
        },
        data: {
          number: data.number ?? null,
          category: data.category,
          date: new Date(data.date),
          time: data.time ?? null,
          from: data.from,
          subtotal: data.subtotal != null ? Number(data.subtotal) : null,
          tax: data.tax != null ? Number(data.tax) : null,
          tip: data.tip != null ? Number(data.tip) : null,
          total: Number(data.total),
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
            quantity: Number(item.quantity),
            amount: Number(item.amount),
          })),
        });
      }
    });

    
  } catch {
    return NextResponse.json(
      { error: "Failed to update receipt" },
      { status: 400 },
    );
  };

  return NextResponse.json(
      { message: "Receipt updated successfully" },
      { status: 200 },
    );
}
