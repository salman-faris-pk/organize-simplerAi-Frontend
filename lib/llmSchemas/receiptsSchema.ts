
export const receiptsSchema = {
  $schema: "https://json-schema.org/draft-07/schema#",
  title: "receipts schema",
  type: "object",
  additionalProperties: false,
  properties: {
    number: {
      type: "string",
      description: "Number of the receipt. Use empty string if not present.",
    },

    category: {
      type: "string",
      description:
        'Category of the receipt. If the category is not listed, ,use "other".',
      enum: ["retail", "groceries", "restaurant", "cafe", "other"],
    },

    date: {
      type: "string",
      format: "date",
      description: "Date of the receipt (YYYY-MM-DD)",
    },

    time: {
      type: "string",
      format: "time",
      description: "Time of the receipt (HH:MM:SS). Use 00:00:00 if unknown.",
    },

    from: {
      type: "string",
      description: "Issuer of the receipt",
    },

    items: {
      type: "array",
      minItems: 1,
      description: "List of items of the receipt",
      items: {
        type: "object",
        description: "An item of the receipt",
        additionalProperties: false,
        properties: {
          description: { type: "string",description:
              "Description of the item. It should not contain the qunatity or the amount." },
          quantity: { type: "number", minimum: 0,description: "Quantity of the item." },
          amount: { type: "number", minimum: 0, description: "Amount of the item" },
        },
        required: ["description", "quantity", "amount"],
      },
    },

    subtotal: {
      type: "number",
      minimum: 0,
      description:"Subtotal of the receipt"
    },

    tax: {
      type: "number",
      minimum: 0,
      description:"Tax of the receipt"

    },

    tip: {
      type: "number",
      minimum: 0,
      description: "Tip of the receipt. If there is no tip, just put 0.",
    },

    total: {
      type: "number",
      minimum: 0,
      description: "Total amount of the receipt.",
    },
  },

  required: [
    "number",
    "category",
    "date",
    "time",
    "from",
    "items",
    "subtotal",
    "tax",
    "total",
  ],
};
