import { z } from "zod";

const CardTransactionSchema = z.object({
  description: z.string().nullable().optional(),
  category: z.string().min(1),
  amount: z.coerce.number().nullable().optional(),
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
  date: z.string().refine((v) => !isNaN(Date.parse(v)), "Invalid date"),
  currency: z.string().nullable().optional(),
  totalAmountDue: z.coerce.number().nullable().optional(),
  transactions: z.array(CardTransactionSchema).optional(),
});

export type CardStatementRequest = z.infer<typeof CardStatementRequestSchema>;
