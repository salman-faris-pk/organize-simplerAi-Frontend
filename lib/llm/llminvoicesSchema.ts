
export const invoicesSchema = {
  $schema: "https://json-schema.org/draft-07/schema#",
  title: "Invoice Extraction Schema",
  type: "object",
  additionalProperties: false,
  properties: {
    invoice_number: {
      type: "string",
      pattern: "^[A-Za-z0-9\\- ]+$",
      description:
        "Invoice number. REQUIRED. Can contain letters, numbers, dashes, spaces.",
    },

    category: {
      type: "string",
      enum: ["hobbies", "services", "b2b", "other"],
      description:
        "Category of the invoice. Use 'other' if unclear.",
    },

    date: {
      type: "string",
      format: "date",
      description:
        "Invoice date (YYYY-MM-DD). REQUIRED for accounting purposes.",
    },

    from: {
      type: "object",
      description: "Sender of the invoice. REQUIRED.",
      additionalProperties: false,
      properties: {
        name: { type: "string", description: "Sender name. REQUIRED." },
        address: {
          type: "string",
          description:
            "Sender address. OPTIONAL. Use comma for newlines if present.",
        },
      },
      required: ["name"],
    },

    to: {
      type: "object",
      description: "Recipient of the invoice. REQUIRED.",
      additionalProperties: false,
      properties: {
        name: { type: "string", description: "Recipient name. REQUIRED." },
        address: {
          type: "string",
          description:
            "Recipient address. OPTIONAL. Use comma for newlines if present.",
        },
      },
      required: ["name"],
    },

    items: {
      type: "array",
      description: "List of items. OPTIONAL.",
      minItems: 1,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          description: {
            type: "string",
            description: "Item description. OPTIONAL.",
          },
          amount: {
            type: "number",
            minimum: 0,
            description: "Item amount. OPTIONAL.",
          },
        },
      },
    },

    currency: {
      type: "string",
      pattern: "^[A-Z]{3}$",
      description:
        "ISO 4217 currency code. REQUIRED if multiple currencies supported.",
    },

    total_amount_due: {
      type: "number",
      minimum: 0,
      description: "Total amount due. REQUIRED.",
    },

    from_vat_number: {
      type: "string",
      description: "VAT / tax ID of sender. OPTIONAL.",
    },

    to_vat_number: {
      type: "string",
      description: "VAT / tax ID of recipient. OPTIONAL.",
    },

    payment_terms: {
      type: "string",
      description: "Payment terms or due date. OPTIONAL.",
    },

    extraction_confidence: {
      type: "number",
      minimum: 0,
      maximum: 1,
      description:
        "Confidence score (0–1) representing reliability of extraction. OPTIONAL.",
    },

    extraction_notes: {
      type: "string",
      description:
        "Notes about ambiguities, missing fields, OCR errors, or low confidence. OPTIONAL.",
    },
  },

  required: [
    "invoice_number",
    "from",
    "to",
    "date",
    "items",
    "category",
    "currency",
    "total_amount_due",
  ],
};
