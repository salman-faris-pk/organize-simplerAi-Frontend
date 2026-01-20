import { NextResponse } from "next/server";
import { getUser } from "../../lib/user";
import { prisma } from "@/lib/db";
import { UpdateReceiptPayload } from "@/lib/types";


export async function PUT(req: Request) {
  const session = await getUser();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let jsonObj: UpdateReceiptPayload;

  try {
    jsonObj = (await req.json()) as UpdateReceiptPayload;

  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  };

  if (!jsonObj?.id) {
    return NextResponse.json(
      { error: "Missing receipt id" },
      { status: 400 }
    );
  };

  try {
    await prisma.$transaction([
      prisma.receipt.updateMany({   //Update the main receipt
        where: {
          id: jsonObj.id,
          userId: session.id,
        },
        data: {
          number: jsonObj.number ?? null,
          category: jsonObj.category,
          date: new Date(jsonObj.date),
          time: jsonObj.time ?? null,
          from: jsonObj.from,
          subtotal:
            jsonObj.subtotal !== null && jsonObj.subtotal !== undefined
              ? Number(jsonObj.subtotal)
              : null,
          tax:
            jsonObj.tax !== null && jsonObj.tax !== undefined
              ? Number(jsonObj.tax)
              : null,
          tip:
            jsonObj.tip !== null && jsonObj.tip !== undefined
              ? Number(jsonObj.tip)
              : null,
          total: Number(jsonObj.total),
        },
      }),

      prisma.receiptItem.deleteMany({   //Delete all existing receipt items for this receipt
        where: {
          receiptId: jsonObj.id,
        },
      }),

      prisma.receiptItem.createMany({   //Insert the new set of receipt items
        data:
          jsonObj.items?.map((item) => ({
            receiptId: jsonObj.id,
            description: item.description,
            quantity: Number(item.quantity),
            amount: Number(item.amount),
          })) ?? [],
      }),
    ]);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update receipt" },
      { status: 400 }
    );
  };

   return NextResponse.json(
    { message: "Receipt updated successfully" },
    { status: 200 }
  );

}
