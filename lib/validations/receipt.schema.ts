import { z } from "zod";


export const ReceiptRequestSchema = z.object({
  id: z.uuid(),
  number: z.string().nullable().optional(),
  category: z.string().min(1),
  date: z.string().refine(
    (v) => !isNaN(Date.parse(v)),
    "Invalid date"
  ),
  time: z.string().nullable().optional(),
  from: z.string().min(1),
  subtotal: z.union([z.number(), z.string()]).nullable().optional(),
  tax: z.union([z.number(), z.string()]).nullable().optional(),
  tip: z.union([z.number(), z.string()]).nullable().optional(),
  total: z.union([z.number(), z.string()]),
  items: z.array(
    z.object({
      description: z.string().min(1),
      quantity: z.union([z.number(), z.string()]),
      amount: z.union([z.number(), z.string()]),
    })
  ).optional(),
});


export type ReceiptRequest = z.infer<typeof ReceiptRequestSchema>;
