import { z } from "zod";


const InvoiceItemSchema = z.object({
  description: z.string().nullable().optional(),
  amount: z.union([z.number(), z.string()]).nullable().optional(),
});


export const InvoiceRequestSchema = z.object({
  id: z.uuid(),
  invoiceNumber: z.string().nullable().optional(),
  category: z.string().min(1),

  date: z.string().refine(
    (v) => !isNaN(Date.parse(v)),
    "Invalid date"
  ),
  fromName: z.string().nullable().optional(),
  fromAddress: z.string().nullable().optional(),
  toName: z.string().nullable().optional(),
  toAddress: z.string().nullable().optional(),
  currency: z.string().nullable().optional(),
  totalAmountDue: z.union([z.number(), z.string()]).nullable().optional(),
  items: z.array(InvoiceItemSchema).optional(),
});


export type InvoiceRequest = z.infer<typeof InvoiceRequestSchema>;