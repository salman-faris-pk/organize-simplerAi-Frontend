
export const cardStatementsSchema = {
  $schema: "https://json-schema.org/draft-07/schema#",
  title: "Credit Card Statement",
  type: "object",
  additionalProperties: false,

  properties: {
    issuer: {
      type: "object",
      description: "Issuer of the credit card statement.",
      additionalProperties: false,
      properties: {
        name: { type: "string", description: "Name of the credit card issuer. REQUIRED." },
        address: { type: "string", description: "Full address of the issuer. OPTIONAL." },
      },
      required: ["name"],
    },

    recipient: {
      type: "object",
      description: "Recipient of the credit card statement.",
      additionalProperties: false,
      properties: {
        name: { type: "string", description: "Name of the recipient. REQUIRED." },
        address: { type: "string", description: "Full address of the recipient. OPTIONAL." },
      },
      required: ["name"],
    },

    date: {
      type: "string",
      format: "date",
      description: "Date of the statement (YYYY-MM-DD). REQUIRED.",
    },

    credit_card: {
      type: "object",
      description: "Credit card information for the statement.",
      additionalProperties: false,
      properties: {
        name: { type: "string", description: "Name of the credit card. OPTIONAL." },
        holder: { type: "string", description: "Name of the credit card holder. OPTIONAL." },
        number: {
          type: "string",
          pattern: "^[X*]{4} [X*]{4} [X*]{4} \\d{4}$",
          description: "Masked credit card number (XXXX XXXX XXXX 1234). REQUIRED.",
        },
      },
      required: [ "number"],
    },

    transactions: {
      type: "array",
      minItems: 1,
      description: "List of credit card transactions",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          description: { type: "string", description: "Transaction description. OPTIONAL" },
          category: {
            type: "string",
            enum: [
              "food",
              "travel",
              "hobbies",
              "services",
              "shopping",
              "entertainment",
              "other",
            ],
            description: "Transaction category. REQUIRED. Use 'other' if unsure.",
          },
          amount: { type: "number", minimum: 0, description: "Transaction amount. REQUIRED." },
          date: { type: "string", format: "date", description: "Transaction date. OPTIONAL." },
          merchant: { type: "string", description: "Merchant or store. OPTIONAL." },
        },
        required: [ "category", "amount"],
      },
    },

    currency: {
      type: "string",
      pattern: "^[A-Z]{3}$",
      description: "ISO 4217 currency code. REQUIRED.",
    },

    total_amount_due: {
      type: "number",
      minimum: 0,
      description: "Total amount due. REQUIRED.",
    },

    extraction_confidence: {
      type: "number",
      minimum: 0,
      maximum: 1,
      description:
        "Confidence score (0–1) representing how reliable the extraction is. OPTIONAL.",
    },

    extraction_notes: {
      type: "string",
      description:
        "Notes about ambiguities, missing fields, or low-quality OCR areas. OPTIONAL.",
    },
  },

  required: [
    "issuer",
    "recipient",
    "date",
    "credit_card",
    "transactions",
    "currency",
    "total_amount_due",
  ],
};
