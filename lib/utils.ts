import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  FetchJsonExtractParams,
  JsonExtractSchemaRequestPayload,
} from "@/lib/types";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
};

export async function fetchJsonExtract({
  text,
  schema,
  refine,
}: FetchJsonExtractParams) {

  const body: JsonExtractSchemaRequestPayload = {
    model: {
      apiKey: process.env.OPENAI_API_KEY!,
      name: "gpt-3.5-turbo",
    },
    jsonSchema: JSON.stringify(schema),
    text,
  };

  if (refine !== undefined) body.refine = refine;

  const res = await fetch(
    `${process.env.STANDALONE_API}/organized-data/json/schema`,
    {
      method: "POST",
      headers: {
        "X-API-Key": process.env.X_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  if (res.status === 442 && !body.refine) {
    return fetchJsonExtract({ text, schema, refine: true });
  };

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed: ${res.status} - ${text}`);
  }

  return res.json();
}
