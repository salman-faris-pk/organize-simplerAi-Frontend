import * as z from "zod";


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



const CardTransactionSchema = z.object({
  description: z.string().nullable().optional(),
  category: z.string().min(1),
  amount: z.union([z.number(), z.string()]).nullable().optional(),
});

export const CardStatementRequestSchema = z.object({
  id: z.uuid(),
  creditCardName: z.string().nullable().optional(),
  creditCardHolder: z.string().nullable().optional(),
  creditCardNumber: z.string().min(1),
  issuerName: z.string().min(1),
  issuerAddress: z.string().nullable().optional(),
  recipientName: z.string().nullable().optional(),
  recipientAddress: z.string().nullable().optional(),
  date: z.string().refine(
    (v) => !isNaN(Date.parse(v)),
    "Invalid date"
  ),
  currency: z.string().nullable().optional(),
  totalAmountDue: z.union([z.number(), z.string()]).nullable().optional(),
  transactions: z.array(CardTransactionSchema).optional(),
});


export type ReceiptRequest = z.infer<typeof ReceiptRequestSchema>;

export type CardStatementRequest = z.infer<
  typeof CardStatementRequestSchema
>;