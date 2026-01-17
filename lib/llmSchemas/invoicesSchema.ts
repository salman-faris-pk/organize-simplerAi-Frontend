

export const invoicesSchema = {
  $schema: "https://json-schema.org/draft-07/schema#",
  title: "Invoice schema",
  type: "object",
  additionalProperties: false,
  properties: {
    invoice_number: {
      type: "string",
      pattern: "^[A-Za-z0-9\\- ]+$",
      description: "Number of the invoice. It can contain dashes and spaces",
    },

    category: {
      type: "string",
      description:
        'Category of the invoice. Some precision: b2b = business to business.  If the category is not listed, use "other".',
      enum: ["hobbies", "services", "b2b", "other"],
    },

    date: {
      type: "string",
      format: "date",
       description: "Date of the invoice. Must be in the format YYYY-MM-DD."
    },

    from: {
      type: "object",
      description: "Sender of the invoice.",
      additionalProperties: false,
      properties: {
        name: { type: "string",description: "Name of the sender."},
        address: { type: "string",description:
            "Full address of the sender. If there is a newline, make the separation with a comma. It could be empty.", },
      },
      required: ["name"],
    },

    to: {
      type: "object",
      description: "Recipient of the invoice.",
      additionalProperties: false,
      properties: {
        name: { type: "string",description: "Name of the recipient." },
        address: { type: "string",description:
            "Full address of the recipient. If there is a newline, make the separation with a comma. It could be empty." },
      },
      required: ["name"],
    },

    items: {
      type: "array",
      description: "List of items of the invoice.",
      minItems: 1,
      items: {
        type: "object",
        description: "An item of the invoice.",
        additionalProperties: false,
        properties: {
          description: { type: "string",description: "Description of the item." },
          amount: { type: "number", minimum: 0,description: "Amount of the item." },
        },
        required: ["description", "amount"],
      },
    },

    currency: {
      type: "string",
      pattern: "^[A-Z]{3}$",
      description: "ISO 4217 currency code",
    },

    total_amount_due: {
      type: "number",
      minimum: 0,
      description: "Total amount due of the invoice."
    },
  },

  required: [
    "invoice_number",
    "category",
    "date",
    "from",
    "to",
    "items",
    "currency",
    "total_amount_due",
  ],
};
