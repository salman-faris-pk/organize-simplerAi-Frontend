export const receiptsSchema = {
  $schema: "https://json-schema.org/draft-07/schema#",
  title: "Receipt Extraction Schema",
  type: "object",
  additionalProperties: false,
  properties: {
    from: {
      type: "string",
      minLength: 1,
      description:
        "Merchant or issuer name EXACTLY as written on the receipt.",
    },

    date: {
      type: "string",
      format: "date",
      description:
        "Receipt date in YYYY-MM-DD format. Use ONLY if explicitly present or clearly inferable.",
    },

    category: {
      type: "string",
      enum: ["retail", "groceries", "restaurant", "cafe", "other"],
      description:
        'Receipt category. Use "other" if no category clearly applies.',
    },

    total: {
      type: "number",
      minimum: 0,
      description:
        "Final total amount paid. MUST be present and must match the receipt total.",
    },

    items: {
      type: "array",
      minItems: 1,
      description:
        "Line items listed on the receipt. Must contain at least one item.",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          description: {
            type: "string",
            minLength: 1,
            description:
              "Item description ONLY. Do NOT include quantity, price, or currency.",
          },
          quantity: {
            type: "number",
            minimum: 0,
            description:
              "Quantity of the item. Use 1 if not explicitly mentioned.",
          },
          amount: {
            type: "number",
            minimum: 0,
            description:
              "Total amount for this item (quantity × unit price if applicable).",
          },
        },
        required: ["description", "quantity", "amount"],
      },
    },

    subtotal: {
      type: "number",
      minimum: 0,
      description:
        "Subtotal before tax and tip. ONLY include if explicitly present.",
    },

    tax: {
      type: "number",
      minimum: 0,
      description:
        "Tax amount. ONLY include if explicitly stated on the receipt.",
    },

    tip: {
      type: "number",
      minimum: 0,
      description:
        "Tip or service charge. ONLY include if explicitly stated.",
    },

    number: {
      type: "string",
      description:
        "Receipt or invoice number. ONLY include if explicitly present.",
    },

    time: {
      type: "string",
      format: "time",
      description:
        "Receipt time (HH:MM:SS). ONLY include if explicitly present.",
    },

    currency: {
      type: "string",
      minLength: 3,
      maxLength: 3,
      description:
        "ISO 4217 currency code (e.g., USD, INR, EUR). Include ONLY if present or clearly inferable.",
    },

    payment_method: {
      type: "string",
      enum: ["cash", "card", "upi", "wallet", "bank_transfer", "other"],
      description:
        'Payment method used. Use "other" if unclear.',
    },

    extraction_confidence: {
      type: "number",
      minimum: 0,
      maximum: 1,
      description:
        "Confidence score (0–1) representing how reliable the extraction is.",
    },

    extraction_notes: {
      type: "string",
      description:
        "Notes about ambiguities, missing fields, or low-quality OCR areas.",
    },
  },

  required: [
    "from",
    "date",
    "category",
    "items",
    "total",
  ],
};
