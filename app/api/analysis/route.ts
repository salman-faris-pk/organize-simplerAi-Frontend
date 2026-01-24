import { NextResponse } from "next/server";
import { getUser } from "../lib/user";
import {
  cardStatementsSchema,
  invoicesSchema,
  receiptsSchema,
} from "@/lib/llm";

export async function POST(req: Request) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { text, category, json } = await req.json();

  if (!text || !category || !json) {
    return NextResponse.json(
      { error: "No text, category, or json provided" },
      { status: 400 },
    );
  }

  let schema;

  switch (category) {
    case "receipts":
      schema = receiptsSchema;
      break;
    case "invoices":
      schema = invoicesSchema;
      break;
    case "credit card statements":
      schema = cardStatementsSchema;
      break;
    default:
      return NextResponse.json(
        { error: "Invalid category provided" },
        { status: 400 },
      );
  }

  const res = await fetch(
    `${process.env.STANDALONE_API}/organized-data/json/analysis`,
    {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.X_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: {
          apiKey: process.env.OPENAI_API_KEY!,
          name: "gpt-3.5-turbo",
        },
        jsonSchema: JSON.stringify(schema),
        originalText: text,
        jsonOutput: JSON.stringify(json),
      }),
    },
  );

  if (!res.ok) {
    return NextResponse.json({ error: res.statusText }, { status: res.status });
  }
  const { analysis } = await res.json();

  return NextResponse.json(analysis, { status: 200 });
}
