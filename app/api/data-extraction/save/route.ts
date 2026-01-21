import { NextResponse } from "next/server";
import { getUser } from "../../lib/user";
import { prisma } from "@/lib/db";
import { Status } from "@/lib/generated/prisma/client";

export async function PUT(req: Request) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { uuid, json, category } = await req.json();

  if (!uuid || !json || !category) {
    return NextResponse.json(
      { error: "No UUID nor json or category provided" },
      { status: 400 },
    );
  }

  switch (category) {
    case "receipts":
      break;
    case "invoices":
      break;
    case "credit card statements":
      break;
    default:
      return NextResponse.json(
        { error: "Invalid category provided" },
        { status: 400 },
      );
  }

  const updatedExtraction = await prisma.extraction.updateMany({
    where: {
      id: uuid,
      userId: user.id,
      status: Status.TO_EXTRACT,
    },
    data: {
      json,
      category,
      status: Status.TO_VERIFY,
    },
  });

  if (!updatedExtraction.count) {
    return NextResponse.json(
      { error: "Extraction not found or not updated" },
      { status: 404 },
    );
  }

  return NextResponse.json({ mesage: "Extraction updated" }, { status: 201 });
}
