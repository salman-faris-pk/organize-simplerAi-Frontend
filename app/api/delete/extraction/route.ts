import { NextResponse } from "next/server";
import { getUser } from "../../lib/user";
import { prisma } from "@/lib/db";
import { s3 } from "../../lib/s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function DELETE(req: Request) {
  const session = await getUser();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const extractionId = searchParams.get("uuid");
  const userUUID = session?.id;

  if (!extractionId) {
    return NextResponse.json(
      { error: "No UUID of data provided" },
      { status: 400 },
    );
  }

  const extraction = await prisma.extraction.findFirst({
    where: {
      id: extractionId,
      userId: userUUID,
    },
  });

  if (!extraction) {
    return NextResponse.json(
      { error: "Extraction not found" },
      { status: 404 },
    );
  }

  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: extraction.objectPath,
      }),
    );

    await prisma.extraction.delete({
      where: { id: extraction.id },
    });

    return NextResponse.json(
      { message: "Extraction deleted successfully" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
