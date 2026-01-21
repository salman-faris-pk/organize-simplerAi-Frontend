import { NextResponse } from "next/server";
import { getUser } from "../lib/user";
import { preferencesSchema } from "@/lib/validations";
import { z } from "zod";
import { prisma } from "@/lib/db";

export async function PUT(req: Request) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const parsed = preferencesSchema.safeParse(await req.json());
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
    const updatedPreferences = await prisma.preferences.update({
      where: {
        userId: user.id,
      },
      data: {
        classificationModel: data.classificationModel,
        extractionModel: data.extractionModel,
        analysisModel: data.analysisModel,
        receiptExampleExtrationId: data.enableReceiptsOneShot
          ? data.receiptExampleExtractionId
          : null,
        invoiceExampleExtractionId: data.enableInvoicesOneShot
          ? data.invoiceExampleExtractionId
          : null,
        cardStatementExampleExtractionId: data.enableCardStatementsOneShot
          ? data.cardStatementExampleExtractionId
          : null,
      },
    });

    return NextResponse.json(
      { message: "Preferences Updated", id: updatedPreferences.id },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: "Preferences could not be updated" },
      { status: 500 },
    );
  }
}


