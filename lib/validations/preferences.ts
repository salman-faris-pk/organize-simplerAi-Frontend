import { z } from "zod"


export const preferencesSchema = z.object({
    classificationModel: z.string().min(1,"Please select a model"),
    extractionModel: z.string().min(1, "Please select a model"),
    analysisModel: z.string().min(1, "Please select a model"),

    enableReceiptsOneShot: z.boolean(),
    enableInvoicesOneShot: z.boolean(),
    enableCardStatementsOneShot: z.boolean(),

    receiptExampleExtractionId: z.uuid().nullish(),
    invoiceExampleExtractionId: z.uuid().nullish(),
    cardStatementExampleExtractionId: z.uuid().nullish(),
}).superRefine((data, ctx) => {
    if(data.enableReceiptsOneShot && !data.receiptExampleExtractionId){
        ctx.addIssue({
            path: ["receiptExampleExtractionId"],
            message: "Please select an extraction of receipts.",
            code: "custom",
        })
    };

    if(data.enableInvoicesOneShot && !data.invoiceExampleExtractionId){
        ctx.addIssue({
        path: ["invoiceExampleExtractionId"],
        message: "Please select an extraction of invoices.",
        code: "custom",
      });
    };

    if (data.enableCardStatementsOneShot && !data.cardStatementExampleExtractionId) {
        ctx.addIssue({
        path: ["cardStatementExampleExtractionId"],
        message: "Please select an extraction of card statements.",
        code: "custom",
      });
    }
});

export type InvoiceRequest = z.infer<typeof preferencesSchema>;
