import { NextResponse } from "next/server";
import { getUser } from "../../lib/user";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { InvoiceRequestSchema } from "@/lib/validations"

export async function PUT(req:Request) {
    const user= await getUser();

    if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  };

  const parsed = InvoiceRequestSchema.safeParse(await req.json());
    
      if(!parsed.success){
        return NextResponse.json(
          {
            error: "Validation failed",
            issues: z.treeifyError(parsed.error),
          },
          { status: 400 }
        );
      };
    
       const jsonData = parsed.data;


  try {
    await prisma.$transaction(async (tx) => {
         await tx.invoice.update({
           where: {
            id_userId: {
              id: jsonData.id,
              userId: user.id
            }
           },
           data: {
            invoiceNumber: jsonData.invoiceNumber ?? null,
            category: jsonData.category,
            date: new Date(jsonData.date),
            fromName: jsonData.fromName ?? null,
            fromAddress: jsonData.fromAddress ?? null,
            toName: jsonData.toName ?? null,
            toAddress: jsonData.toAddress ?? null,
            currency: jsonData.currency ?? null,
            totalAmountDue: jsonData.totalAmountDue ?? null,
           }
         });

         await tx.invoiceItem.deleteMany({
           where: {
          invoiceId: jsonData.id,
        },
      });

      if (jsonData.items?.length) {
        await tx.invoiceItem.createMany({
          data: jsonData.items.map((item) => ({
            invoiceId: jsonData.id,
            description: item.description ?? null,
            amount: item.amount ?? null,
          })),
        });
      }


    });
    
  } catch {
    return NextResponse.json(
      { error: "Failed to update invoice" },
      { status: 400 }
    );
  };

   return NextResponse.json(
    { message: "Invoice updated successfully" },
    { status: 200 }
  );
}