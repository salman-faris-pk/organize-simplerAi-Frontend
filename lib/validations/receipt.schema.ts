import { z } from "zod";


export const ReceiptRequestSchema = z.object({
  id: z.uuid(),
  number: z.string().nullable().optional(),
  category: z.string().min(1),
  date: z.string(),
  time: z.string().nullable().optional(),
  from: z.string().min(1),
  subtotal: z.coerce.number().nullable().optional(),
  tax: z.coerce.number().nullable().optional(),
  tip: z.coerce.number().nullable().optional(),
  total: z.coerce.number(),
  items: z.array(
    z.object({
      description: z.string().min(1),
      quantity: z.coerce.number(),
      amount: z.coerce.number(),
    })
  ).optional(),
});


export type ReceiptRequest = z.infer<typeof ReceiptRequestSchema>;
